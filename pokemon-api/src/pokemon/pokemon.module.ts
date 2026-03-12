import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
    imports: [
        HttpModule,
        CacheModule.register({
            ttl: 600000, // 10 นาที (คำนวณจาก 10 * 60 * 1000 millisecounds)
        }),
    ],
    providers: [PokemonService],
    controllers: [PokemonController],
})
export class PokemonModule {}
