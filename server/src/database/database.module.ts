import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm'
import { ormConfigFactory } from 'config/orm-config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: ormConfigFactory
            ,inject: [ConfigService]
        })
    ]
})
export class DatabaseModule {}