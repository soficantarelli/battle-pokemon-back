import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Battle } from 'src/entity/battle.entity';
import { Repository } from 'typeorm';
import { PokemonService } from '../pokemon/pokemon.service';

@Injectable()
export class BattlesService {
    constructor(
        @InjectRepository(Battle) private BattleRepository : Repository<Battle>,
        @Inject(forwardRef(() => PokemonService)) private pokemonService : PokemonService,
    ) {}

    async create(body: Battle): Promise<String> {
        const challenger = await this.pokemonService.getId(body.challenger_id);
        const opponent = await this.pokemonService.getId(body.opponent_id);

        let challengerHp = challenger.hp;
        let opponentHp = opponent.hp;

        let turn = challenger.speed !== opponent.speed
        ? (challenger.speed > opponent.speed ? challenger : opponent)
        : challenger.attack > opponent.attack ? challenger : opponent;

        while (challengerHp > 0 && opponentHp > 0) {
            let damage;
            if (turn === challenger) {
                damage = this.calculateDamage(challenger, opponent);
                opponentHp -= damage;
                turn = opponent;
            } else {
                damage = this.calculateDamage(opponent, challenger);
                challengerHp -= damage;
                turn = challenger;
            }
        } 

        const result = {
            challenger_id: body.challenger_id,
            opponent_id: body.opponent_id,
            winner: challengerHp > 0 ? body.challenger_id : body.opponent_id
        }

        await this.BattleRepository.save(result);

        return result.winner === body.challenger_id ? challenger.name : opponent.name;
    }

    calculateDamage(attacker, defender) {
        return attacker.attack <= defender.defense ? 1 : attacker.attack - defender.defense;
    };

    async getAll(): Promise<Battle[]> {
        return await this.BattleRepository.find();
    }
    
    async getBy(query): Promise<Battle[]> {
        return await this.BattleRepository.find(query);
    }
}
