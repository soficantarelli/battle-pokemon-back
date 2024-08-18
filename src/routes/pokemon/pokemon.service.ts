import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository, UpdateResult } from 'typeorm';
import { Pokemon } from 'src/entity/pokemon.entity';
import { BattlesService } from '../battles/battles.service';

@Injectable()
export class PokemonService {
    constructor(
        @InjectRepository(Pokemon) private PokemonRepository : Repository<Pokemon>,
        @Inject(forwardRef(() => BattlesService)) private battlesService: BattlesService,
    ) {}

    async getAll(): Promise<Pokemon[]> {
        return await this.PokemonRepository.find();
    }

    async create(pokemon: Pokemon): Promise<Pokemon> {
        return await this.PokemonRepository.save(pokemon);
    }

    async upload(file): Promise<Pokemon[]> {
        const jsonData = JSON.parse(file.buffer.toString());
        const data = await Promise.all((jsonData.pokemon).map(async element => {
            return await this.PokemonRepository.save(element);
        }));

        return data;
    }

    async getId(id): Promise<Pokemon> {
        return await this.PokemonRepository.findOneBy({ id: id });
    }

    async getRandomOpponent(id): Promise<Pokemon> {
        const availableOpponents = await this.getAvailablePokemon(id);

        if (availableOpponents.length === 0) return null;

        const randomIndex = Math.floor(Math.random() * availableOpponents.length);
        return availableOpponents[randomIndex];
    }

    async getAvailablePokemon(id): Promise<Pokemon[]> {
        const opponentExist = await this.battlesService.getBy({ challenger_id: id });
        
        const usedIds = opponentExist.map(battle => battle.opponent_id);

        const pokemons = await this.PokemonRepository.find({
            where: {
              id: Not(In([...usedIds, id])),
            }
        });

        return pokemons;
    }
}
