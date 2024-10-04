export interface PokedexMessages {
  pokemonList: string
  title: string
  searchPlaceholder: string
  favorites: string;
  darkMode: string
  lightMode: string
  basestatus: string
  stats: {
    hp: string
    attack: string
    defense: string
    special_attack: string
    special_defense: string
    speed: string
  }
}

export interface LocaleMessages {
  pokedex: PokedexMessages
}
