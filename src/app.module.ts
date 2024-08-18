import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppLoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { AllExceptionsFilter } from './common/exceptions/all.exceptions.filter';
import { PokemonModule } from './routes/pokemon/pokemon.module';
import { BattlesModule } from './routes/battles/battles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configData } from './config/typeorm';

@Module({
  imports: [
    HttpModule,
    PokemonModule,
    BattlesModule,
    TypeOrmModule.forRoot(configData)],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
  },
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
      consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}