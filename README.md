# my-steam-library

This is a simple website to display my Steam library. The data is automatically updated weekly thanks to a Github action.

The data can also be downloaded in various format (csv, xlsx, pdf).

## Create your own

If you want to create your own, it's quite simple:

- Fork this repository
- Fill up secrets in the repository (Repository Settings > Secrets and Variables > Actions > New repository secret)
    - `STEAM_API_KEY` with your Steam API key (Create one [here](https://steamcommunity.com/dev/apikey))
    - `STEAM_USERID` with your Steam user ID (Find it in your [Steam account page](https://store.steampowered.com/account/))
- Run the Github Action "refresh-data"
- Use Github Pages to deploy the `docs` folder (Repository Settings > Pages > Deploy from a branch > main > Save)

## Credits

<a target="_blank" href="https://icons8.com/icon/rY0tVPCr9Fer/steam">Steam Logo</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
