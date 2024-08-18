import { forwardRef, Module } from '@nestjs/common';
import { PokemonController } from './pokemon.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon } from 'src/entity/pokemon.entity';
import { PokemonService } from './pokemon.service';
import { BattlesModule } from '../battles/battles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pokemon]),
    forwardRef(() =>  BattlesModule),
  ],
  providers: [PokemonService],
  controllers: [PokemonController],
  exports: [PokemonService],
})
export class PokemonModule {}
