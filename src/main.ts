import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerConfig } from './config/swagger.config';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors();
	app.setGlobalPrefix('api/v1/battle-pokemon');

	const document = SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup('api/v1/battle-pokemon/docs', app, document);

	app.use((req, res, next) => {
		res.locals.initTime = Date.now();
		next();
	})

	await app.listen(4000);
	console.log('Api listening in port: ', 4000);
}
bootstrap();
