import { HttpService } from '@nestjs/axios';
import type { Cache } from 'cache-manager';
export interface PokemonResponse {
    name: string;
    types: string[];
    weight: number;
    abilities: string[];
}
export interface PokemonAbilityResponse {
    name: string;
    abilities: string[];
}
export declare class PokemonService {
    private readonly httpService;
    private cacheManager;
    constructor(httpService: HttpService, cacheManager: Cache);
    getPokemonByName(name: string): Promise<PokemonResponse>;
    getPokemonAbility(name: string): Promise<PokemonAbilityResponse>;
}
