Living Dex Tracker Starter

Open index.html in a browser to test locally, or upload the folder contents to GitHub Pages.

Sprite sheets expected in assets/sprites:

kanto_shiny_home.webp   #0001-#0151
johto_shiny_home.webp   #0152-#0251
hoenn_shiny_home.webp   #0252-#0386
sinnoh_shiny_home.webp  #0387-#0493
unova_shiny_home.webp   #0494-#0649
kalos_shiny_home.webp   #0650-#0721
alola_shiny_home.webp   #0722-#0809
galar_shiny_home.webp   #0810-#0905
paldea_shiny_home.webp  #0906-#1025

The small box sprites use your local regional WebP sprite sheets.
The right preview panel uses PokéAPI's high resolution shiny HOME artwork so it does not look pixelated.

Click behavior:
1. Click a Pokémon once to select it.
2. Click the selected Pokémon again to toggle caught/uncaught.
3. Click outside a Pokémon and outside the side panel to deselect.

The site fetches the Pokémon list from PokéAPI on first load and caches it in localStorage.
Caught status and encounter data are also saved in localStorage.

Note: PokéAPI's encounter endpoint only provides encounter/location data. Evolution, trades, events, raids, DLC, and HOME transfer information may not be available from that endpoint.
