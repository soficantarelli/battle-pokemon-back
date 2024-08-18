import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
    .setTitle('Battle API')
    .setDescription('The battles API description')
    .setVersion('1.0')
    .build();