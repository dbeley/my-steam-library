from string import Template
from datetime import datetime
import pandas as pd


def read_template(file: str) -> Template:
    with open(file, "r") as f:
        content = f.read()
    return Template(content)


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
    "<th>appid</th>"
    "<th>Release Year</th>"
    "<th>Reviews</th>"
    "<th>Percentage Positive Reviews</th>"
    "<th>Playtime</th>"
    "<th>URL</th>"
)

table_data = ""
table_data += "<tbody>\n"
for index, row in df.iterrows():
    if row["total_reviews"] and row["total_reviews"] != 0:
        percentage = (
            str(round(row["total_positive"] / row["total_reviews"] * 100, 2)) + "%"
        )
    else:
        percentage = ""

    release_year = ""
    if release_date := row["release_date"]:
        if len(release_date) >= 4 and release_date[-4:].isdigit():
            release_year = int(release_date[-4:])

    table_data += (
        "<tr>\n"
        f"<td>{row['name']}</td>"
        "\n"
        f"<td>{row['appid']}</td>"
        "\n"
        f"<td>{release_year}</td>"
        "\n"
        f"<td>{row['total_reviews']}</td>"
        "\n"
        f"<td>{percentage}</td>"
        "\n"
        f"<td>{row['playtime']}</td>"
        "\n"
        f"<td><a href='{row['url']}'>{row['url']}</a></td>"
        "\n"
        "</tr>\n"
    )
table_data += "</tbody>\n"

date_update = datetime.today().strftime("%Y-%m-%d")

formatted_message = read_template("template.html").safe_substitute(
    {"date_update": date_update, "header": header, "table_data": table_data}
)
with open("docs/index.html", "w") as f:
    f.write(formatted_message)
