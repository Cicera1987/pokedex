export interface Pokemon {
    name: string;
    url: string;
    id: number
}

export interface DetailedPokemon {
    id: string;
    name: string;
    sprites: {
        front_default: string;
    };
    url:string;
}