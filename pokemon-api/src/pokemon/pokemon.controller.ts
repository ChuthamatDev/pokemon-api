import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PokemonService, PokemonResponse, PokemonAbilityResponse } from './pokemon.service';
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('pokemon')
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) {}

    @Get('random')
    async getRandomPokemon(): Promise<PokemonResponse> {
        const randomId = Math.floor(Math.random() * 1000) + 1;
        return await this.pokemonService.getPokemonByName(randomId.toString());
    }

    @UseGuards(AuthGuard)
    @Get(':name')
    async getPokemonByName(@Param('name') name: string): Promise<PokemonResponse> {
        return await this.pokemonService.getPokemonByName(name);
    }

    @UseGuards(AuthGuard)
    @Get(':name/ability')
    async getPokemonAbility(@Param('name') name: string): Promise<PokemonAbilityResponse> {
        return await this.pokemonService.getPokemonAbility(name);
    }
}
