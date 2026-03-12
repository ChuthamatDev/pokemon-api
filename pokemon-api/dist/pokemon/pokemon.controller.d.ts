import { PokemonService, PokemonResponse, PokemonAbilityResponse } from './pokemon.service';
export declare class PokemonController {
    private readonly pokemonService;
    constructor(pokemonService: PokemonService);
    getRandomPokemon(): Promise<PokemonResponse>;
    getPokemonByName(name: string): Promise<PokemonResponse>;
    getPokemonAbility(name: string): Promise<PokemonAbilityResponse>;
}
