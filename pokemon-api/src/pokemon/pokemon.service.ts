import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { firstValueFrom } from 'rxjs';

export interface PokemonResponse {
    name: string;
    types: string[];
    weight: number;
    abilities: string[];
    image: string;
}

export interface PokemonAbilityResponse {
    name: string;
    abilities: string[];
}

interface RawPokeApiData {
    name: string;
    weight: number;
    types: Array<{ type: { name: string } }>;
    abilities: Array<{ ability: { name: string } }>;
    sprites?: {
        other?: {
            'official-artwork'?: {
                front_default?: string;
            };
        };
    };
}

@Injectable()
export class PokemonService {
    constructor(
        private readonly httpService: HttpService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    async getPokemonByName(name: string): Promise<PokemonResponse> {
        const pokemonNameOrId = name.toLowerCase();
        const cacheKey = `pokemon_data_${pokemonNameOrId}`;

        const cachedData = await this.cacheManager.get<PokemonResponse>(cacheKey);
        if (cachedData) {
            console.log(`[Cache Hit] ดึงข้อมูล ${pokemonNameOrId} จาก in-memory cache`);
            return cachedData;
        }

        console.log(`[Cache Miss] กำลังดึงข้อมูล ${pokemonNameOrId} จาก PokeAPI...`);
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`;

        try {
            const response = await firstValueFrom(this.httpService.get<RawPokeApiData>(url));
            const data = response.data;

            const formattedData: PokemonResponse = {
                name: data.name,
                types: data.types.map((t) => t.type.name),
                weight: data.weight,
                abilities: data.abilities.map((a) => a.ability.name),
                image: data.sprites?.other?.['official-artwork']?.front_default || '',
            };

            await this.cacheManager.set(cacheKey, formattedData, 600000);

            return formattedData;
        } catch {
            throw new NotFoundException(`Pokemon with name or ID '${name}' not found`);
        }
    }

    async getPokemonAbility(name: string): Promise<PokemonAbilityResponse> {
        const pokemon = await this.getPokemonByName(name);
        return {
            name: pokemon.name,
            abilities: pokemon.abilities,
        };
    }

    async getRandomPokemon(): Promise<PokemonResponse> {
        const randomId = Math.floor(Math.random() * 1000) + 1;
        return this.getPokemonByName(randomId.toString());
    }
}
