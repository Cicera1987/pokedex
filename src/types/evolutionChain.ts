export interface Evolution {
    name: string;
    sprite: string;
}

export interface EvolutionChain {
    species: {
        name: string;
        url: string;
    };
    evolves_to: EvolutionChain[];
}

export interface Stat {
    stat: {
        name: string;
    };
    base_stat: number;
}

export interface Type {
    type: {
        name: string;
    };
}
