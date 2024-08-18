import { Controller, Post, Body, Get } from '@nestjs/common';
import { BattlesService } from './battles.service';
import { Battle } from 'src/entity/battle.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('battles')
@Controller('battles')
export class BattlesController {
    constructor(private battlesService: BattlesService) {}

    @Post()
    async create(@Body() body: Battle): Promise<String> {
        return await this.battlesService.create(body);
    }

    @Get()
    async getAll(): Promise<Battle[]> {
        return await this.battlesService.getAll();
    }
}
