import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PokemonService } from './pokemon.service';
import { Pokemon } from 'src/entity/pokemon.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('pokemon')
@Controller('pokemon')
export class PokemonController {
    constructor(private pokemonService: PokemonService) {}

    @Get()
    async getAll(): Promise<Pokemon[]> {
        return await this.pokemonService.getAll();
    }

    @Get('random-opponent/:id')
    async getRandomOpponent(@Param('id') id): Promise<Pokemon> {
        return this.pokemonService.getRandomOpponent(id);
    }

    @Get(':id')
    async getId(@Param('id') id): Promise<Pokemon> {
        return await this.pokemonService.getId(id);
    }

    @Post()
    async create(@Body() body: Pokemon): Promise<Pokemon> {
        return await this.pokemonService.create(body);
    }

    @Post('json')
    @UseInterceptors(FileInterceptor('file'))
    async uploadJson(@UploadedFile() file: Express.Multer.File) {
        return await this.pokemonService.upload(file);
    }
}