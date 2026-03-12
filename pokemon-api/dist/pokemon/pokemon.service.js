"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const cache_manager_1 = require("@nestjs/cache-manager");
const rxjs_1 = require("rxjs");
let PokemonService = class PokemonService {
    httpService;
    cacheManager;
    constructor(httpService, cacheManager) {
        this.httpService = httpService;
        this.cacheManager = cacheManager;
    }
    async getPokemonByName(name) {
        const pokemonNameOrId = name.toLowerCase();
        const cacheKey = `pokemon_data_${pokemonNameOrId}`;
        const cachedData = await this.cacheManager.get(cacheKey);
        if (cachedData) {
            console.log(`[Cache Hit] ดึงข้อมูล ${pokemonNameOrId} จาก in-memory cache`);
            return cachedData;
        }
        console.log(`[Cache Miss] กำลังดึงข้อมูล ${pokemonNameOrId} จาก PokeAPI...`);
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`;
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url));
            const data = response.data;
            const formattedData = {
                name: data.name,
                types: data.types.map((t) => t.type.name),
                weight: data.weight,
                abilities: data.abilities.map((a) => a.ability.name),
                image: data.sprites?.other?.['official-artwork']?.front_default || '',
            };
            await this.cacheManager.set(cacheKey, formattedData, 600000);
            return formattedData;
        }
        catch {
            throw new common_1.NotFoundException(`Pokemon with name or ID '${name}' not found`);
        }
    }
    async getPokemonAbility(name) {
        const pokemon = await this.getPokemonByName(name);
        return {
            name: pokemon.name,
            abilities: pokemon.abilities,
        };
    }
    async getRandomPokemon() {
        const randomId = Math.floor(Math.random() * 1000) + 1;
        return this.getPokemonByName(randomId.toString());
    }
};
exports.PokemonService = PokemonService;
exports.PokemonService = PokemonService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [axios_1.HttpService, Object])
], PokemonService);
//# sourceMappingURL=pokemon.service.js.map