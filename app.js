const SPRITE_SIZE = 64;
const SPRITE_COLUMNS = 16;
const BOX_SIZE = 30;
const MAX_POKEMON_ID = 1025;

const STORAGE_KEY = "livingDexCaught";
const ENCOUNTER_CACHE_KEY = "livingDexEncounterCache";
const POKEMON_CACHE_KEY = "livingDexPokemonList";
const CLOUD_SAVE_TABLE = "dex_saves";

const REGIONS = [
  { key: "kanto", name: "Kanto", start: 1, end: 151 },
  { key: "johto", name: "Johto", start: 152, end: 251 },
  { key: "hoenn", name: "Hoenn", start: 252, end: 386 },
  { key: "sinnoh", name: "Sinnoh", start: 387, end: 493 },
  { key: "unova", name: "Unova", start: 494, end: 649 },
  { key: "kalos", name: "Kalos", start: 650, end: 721 },
  { key: "alola", name: "Alola", start: 722, end: 809 },
  { key: "galar", name: "Galar", start: 810, end: 905 },
  { key: "paldea", name: "Paldea", start: 906, end: 1025 }
];

const FALLBACK_KANTO = [
  { id: 1, name: "Bulbasaur" }, { id: 2, name: "Ivysaur" }, { id: 3, name: "Venusaur" },
  { id: 4, name: "Charmander" }, { id: 5, name: "Charmeleon" }, { id: 6, name: "Charizard" },
  { id: 7, name: "Squirtle" }, { id: 8, name: "Wartortle" }, { id: 9, name: "Blastoise" },
  { id: 10, name: "Caterpie" }, { id: 11, name: "Metapod" }, { id: 12, name: "Butterfree" },
  { id: 13, name: "Weedle" }, { id: 14, name: "Kakuna" }, { id: 15, name: "Beedrill" },
  { id: 16, name: "Pidgey" }, { id: 17, name: "Pidgeotto" }, { id: 18, name: "Pidgeot" },
  { id: 19, name: "Rattata" }, { id: 20, name: "Raticate" }, { id: 21, name: "Spearow" },
  { id: 22, name: "Fearow" }, { id: 23, name: "Ekans" }, { id: 24, name: "Arbok" },
  { id: 25, name: "Pikachu" }, { id: 26, name: "Raichu" }, { id: 27, name: "Sandshrew" },
  { id: 28, name: "Sandslash" }, { id: 29, name: "Nidoran♀" }, { id: 30, name: "Nidorina" },
  { id: 31, name: "Nidoqueen" }, { id: 32, name: "Nidoran♂" }, { id: 33, name: "Nidorino" },
  { id: 34, name: "Nidoking" }, { id: 35, name: "Clefairy" }, { id: 36, name: "Clefable" },
  { id: 37, name: "Vulpix" }, { id: 38, name: "Ninetales" }, { id: 39, name: "Jigglypuff" },
  { id: 40, name: "Wigglytuff" }, { id: 41, name: "Zubat" }, { id: 42, name: "Golbat" },
  { id: 43, name: "Oddish" }, { id: 44, name: "Gloom" }, { id: 45, name: "Vileplume" },
  { id: 46, name: "Paras" }, { id: 47, name: "Parasect" }, { id: 48, name: "Venonat" },
  { id: 49, name: "Venomoth" }, { id: 50, name: "Diglett" }, { id: 51, name: "Dugtrio" },
  { id: 52, name: "Meowth" }, { id: 53, name: "Persian" }, { id: 54, name: "Psyduck" },
  { id: 55, name: "Golduck" }, { id: 56, name: "Mankey" }, { id: 57, name: "Primeape" },
  { id: 58, name: "Growlithe" }, { id: 59, name: "Arcanine" }, { id: 60, name: "Poliwag" },
  { id: 61, name: "Poliwhirl" }, { id: 62, name: "Poliwrath" }, { id: 63, name: "Abra" },
  { id: 64, name: "Kadabra" }, { id: 65, name: "Alakazam" }, { id: 66, name: "Machop" },
  { id: 67, name: "Machoke" }, { id: 68, name: "Machamp" }, { id: 69, name: "Bellsprout" },
  { id: 70, name: "Weepinbell" }, { id: 71, name: "Victreebel" }, { id: 72, name: "Tentacool" },
  { id: 73, name: "Tentacruel" }, { id: 74, name: "Geodude" }, { id: 75, name: "Graveler" },
  { id: 76, name: "Golem" }, { id: 77, name: "Ponyta" }, { id: 78, name: "Rapidash" },
  { id: 79, name: "Slowpoke" }, { id: 80, name: "Slowbro" }, { id: 81, name: "Magnemite" },
  { id: 82, name: "Magneton" }, { id: 83, name: "Farfetch’d" }, { id: 84, name: "Doduo" },
  { id: 85, name: "Dodrio" }, { id: 86, name: "Seel" }, { id: 87, name: "Dewgong" },
  { id: 88, name: "Grimer" }, { id: 89, name: "Muk" }, { id: 90, name: "Shellder" },
  { id: 91, name: "Cloyster" }, { id: 92, name: "Gastly" }, { id: 93, name: "Haunter" },
  { id: 94, name: "Gengar" }, { id: 95, name: "Onix" }, { id: 96, name: "Drowzee" },
  { id: 97, name: "Hypno" }, { id: 98, name: "Krabby" }, { id: 99, name: "Kingler" },
  { id: 100, name: "Voltorb" }, { id: 101, name: "Electrode" }, { id: 102, name: "Exeggcute" },
  { id: 103, name: "Exeggutor" }, { id: 104, name: "Cubone" }, { id: 105, name: "Marowak" },
  { id: 106, name: "Hitmonlee" }, { id: 107, name: "Hitmonchan" }, { id: 108, name: "Lickitung" },
  { id: 109, name: "Koffing" }, { id: 110, name: "Weezing" }, { id: 111, name: "Rhyhorn" },
  { id: 112, name: "Rhydon" }, { id: 113, name: "Chansey" }, { id: 114, name: "Tangela" },
  { id: 115, name: "Kangaskhan" }, { id: 116, name: "Horsea" }, { id: 117, name: "Seadra" },
  { id: 118, name: "Goldeen" }, { id: 119, name: "Seaking" }, { id: 120, name: "Staryu" },
  { id: 121, name: "Starmie" }, { id: 122, name: "Mr. Mime" }, { id: 123, name: "Scyther" },
  { id: 124, name: "Jynx" }, { id: 125, name: "Electabuzz" }, { id: 126, name: "Magmar" },
  { id: 127, name: "Pinsir" }, { id: 128, name: "Tauros" }, { id: 129, name: "Magikarp" },
  { id: 130, name: "Gyarados" }, { id: 131, name: "Lapras" }, { id: 132, name: "Ditto" },
  { id: 133, name: "Eevee" }, { id: 134, name: "Vaporeon" }, { id: 135, name: "Jolteon" },
  { id: 136, name: "Flareon" }, { id: 137, name: "Porygon" }, { id: 138, name: "Omanyte" },
  { id: 139, name: "Omastar" }, { id: 140, name: "Kabuto" }, { id: 141, name: "Kabutops" },
  { id: 142, name: "Aerodactyl" }, { id: 143, name: "Snorlax" }, { id: 144, name: "Articuno" },
  { id: 145, name: "Zapdos" }, { id: 146, name: "Moltres" }, { id: 147, name: "Dratini" },
  { id: 148, name: "Dragonair" }, { id: 149, name: "Dragonite" }, { id: 150, name: "Mewtwo" },
  { id: 151, name: "Mew" }
];

const GAME_ORDER = [
  "x", "y", "omega-ruby", "alpha-sapphire", "sun", "moon", "ultra-sun", "ultra-moon",
  "lets-go-pikachu", "lets-go-eevee", "sword", "shield", "brilliant-diamond", "shining-pearl",
  "legends-arceus", "scarlet", "violet"
];

const GAME_NAME_MAP = {
  "x": "Pokémon X",
  "y": "Pokémon Y",
  "omega-ruby": "Pokémon Omega Ruby",
  "alpha-sapphire": "Pokémon Alpha Sapphire",
  "sun": "Pokémon Sun",
  "moon": "Pokémon Moon",
  "ultra-sun": "Pokémon Ultra Sun",
  "ultra-moon": "Pokémon Ultra Moon",
  "lets-go-pikachu": "Pokémon Let's Go, Pikachu!",
  "lets-go-eevee": "Pokémon Let's Go, Eevee!",
  "sword": "Pokémon Sword",
  "shield": "Pokémon Shield",
  "brilliant-diamond": "Pokémon Brilliant Diamond",
  "shining-pearl": "Pokémon Shining Pearl",
  "legends-arceus": "Pokémon Legends: Arceus",
  "scarlet": "Pokémon Scarlet",
  "violet": "Pokémon Violet"
};

const boxContainer = document.getElementById("boxContainer");
const caughtCount = document.getElementById("caughtCount");
const clearSaveBtn = document.getElementById("clearSaveBtn");
const settingsBtn = document.getElementById("settingsBtn");
const settingsOverlay = document.getElementById("settingsOverlay");
const closeSettingsBtn = document.getElementById("closeSettingsBtn");
const saveSettingsBtn = document.getElementById("saveSettingsBtn");
const resetSettingsBtn = document.getElementById("resetSettingsBtn");
const settingsDexTitle = document.getElementById("settingsDexTitle");
const settingsDexSubtitle = document.getElementById("settingsDexSubtitle");
const dexTitle = document.getElementById("dexTitle");
const dexSubtitle = document.getElementById("dexSubtitle");
const PROFILE_STORAGE_KEY = "livingDexProfileSettings";
const selectedPanelContent = document.getElementById("selectedPanelContent");
const regionTabs = document.getElementById("regionTabs");

const authStatus = document.getElementById("authStatus");
const authEmail = document.getElementById("authEmail");
const authPassword = document.getElementById("authPassword");
const signInBtn = document.getElementById("signInBtn");
const signUpBtn = document.getElementById("signUpBtn");
const googleSignInBtn = document.getElementById("googleSignInBtn");
const signOutBtn = document.getElementById("signOutBtn");
const syncSaveBtn = document.getElementById("syncSaveBtn");
const loadCloudSaveBtn = document.getElementById("loadCloudSaveBtn");
const signedOutControls = document.getElementById("signedOutControls");
const signedInControls = document.getElementById("signedInControls");
const authMessage = document.getElementById("authMessage");


let pokemon = [];
let caught = loadCaught();
let selectedPokemonId = null;
let encounterCache = loadEncounterCache();
let cloudSaveTimer = null;

function loadCaught() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
}


function scheduleCloudSave() {
  if (!window.supabaseClient) return;
  clearTimeout(cloudSaveTimer);
  cloudSaveTimer = setTimeout(async () => {
    const user = await getCurrentUser();
    if (user) await saveCloudDex(false);
  }, 750);
}

function saveCaught() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(caught));
  scheduleCloudSave();
}

function loadEncounterCache() {
  return JSON.parse(localStorage.getItem(ENCOUNTER_CACHE_KEY)) || {};
}

function saveEncounterCache() {
  localStorage.setItem(ENCOUNTER_CACHE_KEY, JSON.stringify(encounterCache));
}

function loadPokemonCache() {
  return JSON.parse(localStorage.getItem(POKEMON_CACHE_KEY)) || null;
}

function savePokemonCache(list) {
  localStorage.setItem(POKEMON_CACHE_KEY, JSON.stringify(list));
}

function titleCaseFromSlug(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function displayNameFromApiName(name) {
  const specialNames = {
    "nidoran-f": "Nidoran♀",
    "nidoran-m": "Nidoran♂",
    "farfetchd": "Farfetch’d",
    "mr-mime": "Mr. Mime",
    "mime-jr": "Mime Jr.",
    "type-null": "Type: Null",
    "jangmo-o": "Jangmo-o",
    "hakamo-o": "Hakamo-o",
    "kommo-o": "Kommo-o",
    "sirfetchd": "Sirfetch’d",
    "mr-rime": "Mr. Rime",
    "wo-chien": "Wo-Chien",
    "chien-pao": "Chien-Pao",
    "ting-lu": "Ting-Lu",
    "chi-yu": "Chi-Yu",
    "roaring-moon": "Roaring Moon",
    "iron-treads": "Iron Treads",
    "iron-bundle": "Iron Bundle",
    "iron-hands": "Iron Hands",
    "iron-jugulis": "Iron Jugulis",
    "iron-moth": "Iron Moth",
    "iron-thorns": "Iron Thorns",
    "iron-valiant": "Iron Valiant",
    "walking-wake": "Walking Wake",
    "iron-leaves": "Iron Leaves",
    "gouging-fire": "Gouging Fire",
    "raging-bolt": "Raging Bolt",
    "iron-boulder": "Iron Boulder",
    "iron-crown": "Iron Crown"
  };

  return specialNames[name] || titleCaseFromSlug(name);
}

async function loadPokemonList() {
  const cachedList = loadPokemonCache();

  if (cachedList && cachedList.length >= MAX_POKEMON_ID) {
    return cachedList;
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON_ID}&offset=0`);
    if (!response.ok) throw new Error("Could not load Pokémon list");

    const data = await response.json();
    const list = data.results.map((entry, index) => ({
      id: index + 1,
      apiName: entry.name,
      name: displayNameFromApiName(entry.name)
    }));

    savePokemonCache(list);
    return list;
  } catch (error) {
    console.warn("Using bundled Kanto fallback because the Pokémon list could not be loaded.", error);
    return FALLBACK_KANTO.map((mon) => ({ ...mon, apiName: mon.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") }));
  }
}

function getRegionForId(id) {
  return REGIONS.find((region) => id >= region.start && id <= region.end) || REGIONS[0];
}

function formatDexNumber(id) {
  return `#${String(id).padStart(4, "0")}`;
}

function getSpritePosition(mon) {
  const region = getRegionForId(mon.id);
  const index = mon.id - region.start;
  const col = index % SPRITE_COLUMNS;
  const row = Math.floor(index / SPRITE_COLUMNS);

  return {
    x: col * SPRITE_SIZE,
    y: row * SPRITE_SIZE,
    regionKey: region.key
  };
}

function getBoxId(boxIndex) {
  return `box-${boxIndex + 1}`;
}

function getBoxIndexForPokemonId(id) {
  return Math.floor((id - 1) / BOX_SIZE);
}

function updateCaughtCount() {
  const total = Object.values(caught).filter(Boolean).length;
  caughtCount.textContent = `${total} / ${pokemon.length} caught`;
}

function resetSelectedPanel() {
  selectedPanelContent.className = "selected-placeholder empty";
  selectedPanelContent.innerHTML = "";
}

function deselectPokemon() {
  selectedPokemonId = null;
  updateSelectedHighlight();
  resetSelectedPanel();
}

function getPokemonById(id) {
  return pokemon.find((mon) => mon.id === id);
}


function loadProfileSettings() {
  try {
    return JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY)) || {};
  } catch (error) {
    return {};
  }
}

function saveProfileSettings(settings) {
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(settings));
}

function applyProfileSettings() {
  const settings = loadProfileSettings();
  const title = settings.title || "Shiny Living Dex";
  const subtitle = settings.subtitle || "u:Chrgreen21";

  if (dexTitle) dexTitle.textContent = title;
  if (dexSubtitle) dexSubtitle.textContent = subtitle;
  if (settingsDexTitle) settingsDexTitle.value = title;
  if (settingsDexSubtitle) settingsDexSubtitle.value = subtitle;
}

function openSettings() {
  applyProfileSettings();

  if (settingsOverlay) {
    settingsOverlay.hidden = false;
  }
}

function closeSettings() {
  if (settingsOverlay) {
    settingsOverlay.hidden = true;
  }
}

function handleSaveSettings() {
  const title = settingsDexTitle?.value.trim() || "Shiny Living Dex";
  const subtitle = settingsDexSubtitle?.value.trim() || "u:Chrgreen21";

  saveProfileSettings({ title, subtitle });
  applyProfileSettings();
  closeSettings();
}

function handleResetSettings() {
  saveProfileSettings({
    title: "Shiny Living Dex",
    subtitle: "u:Chrgreen21"
  });
  applyProfileSettings();
}

function renderRegionTabs() {
  if (!regionTabs) return;

  regionTabs.innerHTML = "";

  REGIONS.forEach((region) => {
    const button = document.createElement("button");
    button.className = "region-tab";
    button.type = "button";
    button.textContent = region.name;

    button.addEventListener("click", () => {
      const boxIndex = getBoxIndexForPokemonId(region.start);
      const box = document.getElementById(getBoxId(boxIndex));
      if (box) {
        box.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });

    regionTabs.appendChild(button);
  });
}


function renderPokemonCell(mon) {
  const cell = document.createElement("button");
  cell.className = "pokemon-cell";
  cell.type = "button";
  cell.dataset.pokemonId = mon.id;
  cell.setAttribute("aria-label", `${mon.name} ${formatDexNumber(mon.id)}`);

  if (caught[mon.id]) {
    cell.classList.add("caught");
  }

  const name = document.createElement("div");
  name.className = "pokemon-name";
  name.textContent = mon.name;

  const spriteWrap = document.createElement("div");
  spriteWrap.className = "pokemon-sprite-wrap";

  const sprite = document.createElement("div");
  const pos = getSpritePosition(mon);
  sprite.className = `pokemon-sprite sprite-${pos.regionKey}`;
  sprite.style.backgroundPosition = `-${pos.x}px -${pos.y}px`;

  const number = document.createElement("div");
  number.className = "pokemon-number";
  number.textContent = formatDexNumber(mon.id);

  const badge = document.createElement("div");
  badge.className = "caught-badge";

  spriteWrap.appendChild(sprite);
  cell.appendChild(name);
  cell.appendChild(spriteWrap);
  cell.appendChild(number);
  cell.appendChild(badge);

  cell.addEventListener("mouseenter", () => {
    selectedPokemonId = mon.id;
    updateSelectedPanel(mon);
  });

  cell.addEventListener("focus", () => {
    selectedPokemonId = mon.id;
    updateSelectedPanel(mon);
  });

  cell.addEventListener("click", () => {
    caught[mon.id] = !caught[mon.id];
    saveCaught();
    cell.classList.toggle("caught", caught[mon.id]);
    updateCaughtCount();
    selectedPokemonId = mon.id;
    updateSelectedPanel(mon);
  });

  return cell;
}

function updateSelectedHighlight() {
  // Selection is now handled visually by CSS hover/focus instead of a persistent selected class.
}

function getOfficialArtworkUrl(mon) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${mon.id}.png`;
}

function updateSelectedPanel(mon) {
  const isCaught = Boolean(caught[mon.id]);

  selectedPanelContent.className = "selected-card";
  selectedPanelContent.innerHTML = `
    <div class="selected-sprite-frame">
      <img
        class="selected-artwork"
        src="${getOfficialArtworkUrl(mon)}"
        alt="Shiny ${mon.name}"
        loading="lazy"
      />
    </div>

    <div class="selected-info">
      <h3>${mon.name}</h3>
      <p>${formatDexNumber(mon.id)}</p>
      <span class="selected-status ${isCaught ? "caught" : "uncaught"}">
        ${isCaught ? "Caught" : "Not caught"}
      </span>
    </div>

    

    <section class="encounter-section">
      <h4>Catchable Games</h4>
      <div id="encounterInfo" class="encounter-info">Loading PokédexTracker location data...</div>
    </section>
  `;

  loadEncounterInfo(mon);
}

function normalizePokedexTrackerMethod(value) {
  if (value === null || value === undefined) return "";

  if (typeof value === "string") {
    return value.trim();
  }

  if (Array.isArray(value)) {
    return value.map(normalizePokedexTrackerMethod).filter(Boolean).join(": ");
  }

  if (typeof value === "object") {
    if (value.name) return String(value.name).trim();
    if (value.location) return String(value.location).trim();
    if (value.method) return String(value.method).trim();
    if (value.value) return normalizePokedexTrackerMethod(value.value);
    if (value.values) return normalizePokedexTrackerMethod(value.values);
  }

  return String(value).trim();
}

function parsePokedexTrackerData(data) {
  const locations = Array.isArray(data.locations) ? data.locations : [];

  return locations
    .map((entry) => {
      const gameName =
        entry?.game?.name ||
        entry?.game_name ||
        entry?.game ||
        "Unknown Game";

      const rawValues = Array.isArray(entry.values)
        ? entry.values
        : entry.value
          ? [entry.value]
          : entry.location
            ? [entry.location]
            : [];

      const methods = rawValues
        .map(normalizePokedexTrackerMethod)
        .filter(Boolean)
        .filter((method, index, arr) => arr.indexOf(method) === index);

      return {
        displayName: gameName.startsWith("Pokémon") ? gameName : `Pokémon ${gameName}`,
        locations: methods
      };
    })
    .filter((group) => group.locations.length);
}


async function loadLocalPokedexTrackerData() {
  const possiblePaths = [
    "data/pokedextracker-locations.json",
    "./data/pokedextracker-locations.json",
    "data/pokedextracker-locations.json",
    "./data/pokedextracker-locations.json",
    "pokedextracker-locations.json",
    "assets/sprites/pokedextracker-locations.json"
  ];

  const errors = [];

  for (const path of possiblePaths) {
    try {
      const response = await fetch(path, {
        cache: "no-store"
      });

      if (!response.ok) {
        errors.push(`${path}: HTTP ${response.status}`);
        continue;
      }

      return await response.json();
    } catch (error) {
      errors.push(`${path}: ${error.message}`);
    }
  }

  throw new Error(`Could not load local PokédexTracker JSON. Tried: ${errors.join(" | ")}`);
}

async function fetchEncounterData(mon) {
  const cacheKey = `local-pokedextracker-${mon.id}`;

  if (encounterCache[cacheKey]) {
    return encounterCache[cacheKey];
  }

  if (!window.__POKEDEXTRACKER_DATA__) {
    window.__POKEDEXTRACKER_DATA__ = await loadLocalPokedexTrackerData();
  }

  const entry =
    window.__POKEDEXTRACKER_DATA__[String(mon.id)] ||
    window.__POKEDEXTRACKER_DATA__[mon.id];

  const parsed = entry?.locations?.map((group) => ({
    displayName: group.game || group.displayName || "Unknown Game",
    locations: Array.isArray(group.methods)
      ? group.methods
      : Array.isArray(group.locations)
        ? group.locations
        : []
  })).filter((group) => group.locations.length) || [];

  encounterCache[cacheKey] = parsed;
  saveEncounterCache();

  return parsed;
}

function renderEncounterInfo(groups, mon) {
  const encounterInfo = document.getElementById("encounterInfo");

  if (!encounterInfo || selectedPokemonId !== mon.id) return;

  if (!groups.length) {
    encounterInfo.innerHTML = `
      <p class="encounter-note">
        The local PokédexTracker JSON did not contain location data for ${mon.name} with dex_type=21.
      </p>
    `;
    return;
  }

  encounterInfo.innerHTML = groups.map((group) => `
    <article class="game-entry">
      <h5>${group.displayName}</h5>
      <ul>
        ${group.locations.map((location) => `<li>${location}</li>`).join("")}
      </ul>
    </article>
  `).join("");
}

async function loadEncounterInfo(mon) {
  const encounterInfo = document.getElementById("encounterInfo");

  if (!encounterInfo) return;

  try {
    const groups = await fetchEncounterData(mon);
    renderEncounterInfo(groups, mon);
  } catch (error) {
    if (selectedPokemonId !== mon.id) return;

    encounterInfo.innerHTML = `
      <p class="encounter-note error">Location Data Failed To Load</p>
    `;
    console.error(error);
  }
}

function renderGrid() {
  boxContainer.innerHTML = "";

  const boxCount = Math.ceil(pokemon.length / BOX_SIZE);

  for (let boxIndex = 0; boxIndex < boxCount; boxIndex++) {
    const start = boxIndex * BOX_SIZE;
    const end = Math.min(start + BOX_SIZE, pokemon.length);
    const boxPokemon = pokemon.slice(start, end);

    const box = document.createElement("section");
    box.className = "dex-box";
    box.id = getBoxId(boxIndex);

    const title = document.createElement("h3");
    title.className = "dex-box-title";
    const firstId = pokemon[start].id;
    const lastId = pokemon[end - 1].id;
    title.textContent = `Box ${boxIndex + 1} (${formatDexNumber(firstId)}-${formatDexNumber(lastId)})`;

    const grid = document.createElement("div");
    grid.className = "pokemon-grid";

    boxPokemon.forEach((mon) => {
      grid.appendChild(renderPokemonCell(mon));
    });

    box.appendChild(title);
    box.appendChild(grid);
    boxContainer.appendChild(box);
  }

  updateCaughtCount();
}

if (clearSaveBtn) clearSaveBtn.addEventListener("click", () => {
  caught = {};
  saveCaught();

  if (selectedPokemonId !== null) {
    const selectedMon = getPokemonById(selectedPokemonId);
    if (selectedMon) updateSelectedPanel(selectedMon);
  }

  renderGrid();
});


if (settingsBtn) {
  settingsBtn.addEventListener("click", openSettings);
}

if (closeSettingsBtn) {
  closeSettingsBtn.addEventListener("click", closeSettings);
}

if (saveSettingsBtn) {
  saveSettingsBtn.addEventListener("click", handleSaveSettings);
}

if (resetSettingsBtn) {
  resetSettingsBtn.addEventListener("click", handleResetSettings);
}

if (settingsOverlay) {
  settingsOverlay.addEventListener("click", (event) => {
    if (event.target === settingsOverlay) {
      closeSettings();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && settingsOverlay && !settingsOverlay.hidden) {
    closeSettings();
  }
});


function setAuthMessage(message, isError = false) {
  if (!authMessage) return;
  authMessage.textContent = message || "";
  authMessage.classList.toggle("error", Boolean(isError));
}

async function getCurrentUser() {
  if (!window.supabaseClient) return null;
  const { data, error } = await supabaseClient.auth.getUser();
  if (error) return null;
  return data.user || null;
}

function updateAuthUi(user) {
  if (!authStatus) return;
  if (user) {
    authStatus.textContent = `Signed in as ${user.email || "Google account"}.`;
    if (signedOutControls) signedOutControls.hidden = true;
    if (signedInControls) signedInControls.hidden = false;
  } else {
    authStatus.textContent = "Not signed in. Your progress is saved only on this device.";
    if (signedOutControls) signedOutControls.hidden = false;
    if (signedInControls) signedInControls.hidden = true;
  }
}

async function refreshAuthUi() {
  const user = await getCurrentUser();
  updateAuthUi(user);
  return user;
}

async function saveCloudDex(showSuccess = true) {
  setAuthMessage("");
  const user = await getCurrentUser();
  if (!user) {
    setAuthMessage("Sign in before syncing.", true);
    return;
  }

  const { error } = await supabaseClient.from(CLOUD_SAVE_TABLE).upsert({
    user_id: user.id,
    caught_json: caught || {},
    settings_json: loadProfileSettings(),
    updated_at: new Date().toISOString()
  }, { onConflict: "user_id" });

  if (error) {
    setAuthMessage(error.message, true);
    return;
  }

  if (showSuccess) setAuthMessage("Cloud save synced.");
}

async function loadCloudDex(showMissingMessage = true) {
  setAuthMessage("");
  const user = await getCurrentUser();
  if (!user) {
    setAuthMessage("Sign in before loading a cloud save.", true);
    return;
  }

  const { data, error } = await supabaseClient
    .from(CLOUD_SAVE_TABLE)
    .select("caught_json, settings_json, updated_at")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    setAuthMessage(error.message, true);
    return;
  }

  if (!data) {
    if (showMissingMessage) setAuthMessage("No cloud save found yet. Click Sync Save to upload this device.");
    return;
  }

  caught = data.caught_json || {};
  saveCaught();

  if (data.settings_json) {
    saveProfileSettings(data.settings_json);
    if (typeof applyProfileSettings === "function") applyProfileSettings();
  }

  renderGrid();

  if (selectedPokemonId !== null) {
    const selectedMon = getPokemonById(selectedPokemonId);
    if (selectedMon) updateSelectedPanel(selectedMon);
  }

  setAuthMessage("Cloud save loaded.");
}

async function signUpWithEmail() {
  setAuthMessage("");
  const email = authEmail?.value.trim();
  const password = authPassword?.value;
  if (!email || !password) {
    setAuthMessage("Enter an email and password first.", true);
    return;
  }

  const { data, error } = await supabaseClient.auth.signUp({ email, password });
  if (error) {
    setAuthMessage(error.message, true);
    return;
  }

  setAuthMessage("Account created. Check your email if Supabase requires confirmation.");
  await refreshAuthUi();
  if (data.user) await saveCloudDex(true);
}

async function signInWithEmail() {
  setAuthMessage("");
  const email = authEmail?.value.trim();
  const password = authPassword?.value;
  if (!email || !password) {
    setAuthMessage("Enter an email and password first.", true);
    return;
  }

  const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
  if (error) {
    setAuthMessage(error.message, true);
    return;
  }

  setAuthMessage("Signed in.");
  await refreshAuthUi();
  await loadCloudDex(false);
}

async function signInWithGoogle() {
  setAuthMessage("");
  const redirectTo = window.location.origin + window.location.pathname;
  const { error } = await supabaseClient.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo }
  });
  if (error) setAuthMessage(error.message, true);
}

async function signOut() {
  setAuthMessage("");
  const { error } = await supabaseClient.auth.signOut();
  if (error) {
    setAuthMessage(error.message, true);
    return;
  }
  setAuthMessage("Signed out. Local save is still on this device.");
  await refreshAuthUi();
}

function setupAuthHandlers() {
  if (!window.supabaseClient) {
    setAuthMessage("Supabase config failed to load.", true);
    return;
  }

  if (signUpBtn) signUpBtn.addEventListener("click", signUpWithEmail);
  if (signInBtn) signInBtn.addEventListener("click", signInWithEmail);
  if (googleSignInBtn) googleSignInBtn.addEventListener("click", signInWithGoogle);
  if (signOutBtn) signOutBtn.addEventListener("click", signOut);
  if (syncSaveBtn) syncSaveBtn.addEventListener("click", () => saveCloudDex(true));
  if (loadCloudSaveBtn) loadCloudSaveBtn.addEventListener("click", () => loadCloudDex(true));

  supabaseClient.auth.onAuthStateChange(async (event, session) => {
    updateAuthUi(session?.user || null);
    if (event === "SIGNED_IN") await loadCloudDex(false);
  });

  refreshAuthUi();
}

async function init() {
  setupAuthHandlers();
  applyProfileSettings();
  boxContainer.innerHTML = `<p class="loading-message">Loading Pokémon...</p>`;
  pokemon = await loadPokemonList();
  renderRegionTabs();
  renderGrid();
}

init();

document.addEventListener("DOMContentLoaded", () => {
  const scrollTopButton = document.getElementById("scrollTopButton");

  if (!scrollTopButton) return;

  scrollTopButton.addEventListener("click", () => {
    const boxOne =
      document.getElementById(getBoxId(0)) ||
      document.querySelector(".dex-box");

    if (boxOne) {
      boxOne.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  });
});
