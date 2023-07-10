# my-steam-library

This is a simple website to display my Steam library. The data is automatically updated weekly thanks to a Github action.

The data can also be downloaded in various format (csv, xlsx, pdf).

See also [steam_stats](https://github.com/dbeley/steam_stats) which is the utility used to extract the data from Steam.

## Create your own

If you want to create your own, follow those instructions:

- Fork this repository
- Create new secrets in your repository (Repository Settings > Secrets and Variables > Actions > New repository secret)
    - `STEAM_API_KEY` with your Steam API key (Create one [here](https://steamcommunity.com/dev/apikey))
    - `STEAM_USERID` with your Steam user ID (Find it in your [Steam account page](https://store.steampowered.com/account/))
- Run the Github Action `refresh-data` (Tab "Actions")
- Use Github Pages to deploy the `docs` folder (Repository Settings > Pages > Deploy from a branch > Select main branch > docs folder > Save)

## Credits

<a target="_blank" href="https://icons8.com/icon/rY0tVPCr9Fer/steam">Steam Logo</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
