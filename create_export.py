from string import Template
from datetime import datetime
import pandas as pd


def read_template(file: str) -> Template:
    with open(file, "r") as f:
        content = f.read()
    return Template(content)


def format_playtime(playtime: int) -> str:
    return str(round(playtime / 60, 1)) + " hours"


df_game_info = pd.read_csv("game_info.csv", sep="\t")
df_playtime = pd.read_csv("playtime.csv", sep="\t")
df = pd.merge(df_game_info, df_playtime, how="left", on=["appid"])

df = df.fillna(
    {
        "release_date": "",
    }
)

header = (
    "<th>Name</th>"
    "<th>Release Year</th>"
    "<th>Reviews</th>"
    "<th>Percentage Positive Reviews</th>"
    "<th>Playtime</th>"
    "<th>Percentage Linux Playtime</th>"
    "<th>Developers</th>"
    "<th>Publishers</th>"
    "<th>appid</th>"
)

df["percentage_positive_reviews"] = df["total_positive"] / df["total_reviews"]
df["percentage_playtime_linux"] = df["playtime linux"] / df["playtime"]

sum_playtime = format_playtime(df["playtime"].sum())
quality_index = str(
    round(
        (df["percentage_positive_reviews"] * df["playtime"]).sum()
        / df["playtime"].sum(),
        2,
    )
)

table_data = ""
table_data += "<tbody>\n"
for index, row in df.iterrows():
    percentage_positive_reviews = ""
    if not pd.isnull(row["percentage_positive_reviews"]):
        percentage_positive_reviews = (
            str(round(row["percentage_positive_reviews"] * 100, 2)) + "%"
        )

    release_year = ""
    if release_date := row["release_date"]:
        if len(release_date) >= 4 and release_date[-4:].isdigit():
            release_year = int(release_date[-4:])

    percentage_playtime_linux = ""
    if not pd.isnull(row["percentage_playtime_linux"]):
        percentage_playtime_linux = (
            str(round(row["percentage_playtime_linux"] * 100, 2)) + "%"
        )

    table_data += (
        "<tr>\n"
        f"<td><a href='{row['url']}'>{row['name']}</a></td>"
        "\n"
        f"<td>{release_year}</td>"
        "\n"
        f"<td>{row['total_reviews']}</td>"
        "\n"
        f"<td>{percentage_positive_reviews}</td>"
        "\n"
        f"<td>{row['playtime']}</td>"
        "\n"
        f"<td>{percentage_playtime_linux}</td>"
        "\n"
        f"<td>{row['developers']}</td>"
        "\n"
        f"<td>{row['publishers']}</td>"
        "\n"
        f"<td>{row['appid']}</td>"
        "\n"
        "</tr>\n"
    )
table_data += "</tbody>\n"

date_update = datetime.today().strftime("%Y-%m-%d")

formatted_message = read_template("template.html").safe_substitute(
    {
        "date_update": date_update,
        "header": header,
        "table_data": table_data,
        "sum_playtime": sum_playtime,
        "quality_index": quality_index,
    }
)
with open("docs/index.html", "w") as f:
    f.write(formatted_message)
