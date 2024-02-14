import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
import {config} from 'dotenv'

config({path: '.env'})

const configService = new ConfigService()

export default new DataSource({
    type: 'postgres',
    host: configService.getOrThrow('POSTGRES_HOST'),
    port: +configService.getOrThrow('POSTGRES_PORT'),
    username: configService.getOrThrow('POSTGRES_USER'),
    password: configService.getOrThrow('POSTGRES_PASSWORD'),
    database: configService.getOrThrow('POSTGRES_DB'),
    entities: ['src/**/*.entity{.ts,.js}'],
    migrations: ['migrations/*{.ts,.js}'],
})