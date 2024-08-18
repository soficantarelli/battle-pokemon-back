import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BattlesController } from './battles.controller';
import { Battle } from 'src/entity/battle.entity';
import { BattlesService } from './battles.service';
import { PokemonModule } from '../pokemon/pokemon.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Battle]),
    forwardRef(() => PokemonModule),
  ],
  providers: [BattlesService],
  controllers: [BattlesController],
  exports: [BattlesService],
})
export class BattlesModule {}
