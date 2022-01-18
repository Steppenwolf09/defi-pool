import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PoolModule } from "./pool/pool.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import database from 'config/db.config';
import { TypeOrmModule } from "@nestjs/typeorm";
import { WalletEntity } from "./pool/entities/wallet.entity";
import { TransactionEntity } from "./pool/entities/transaction.entity";
import { InvestmentEntity } from "./pool/entities/investment.entity";
import {AppService} from "./pool/app.service";

@Module({
  imports: [
    ConfigModule.forRoot({ load: [database], envFilePath: '.development.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        entities: [WalletEntity, TransactionEntity, InvestmentEntity],
        synchronize: configService.get<boolean>('database.synchronize'),
      }),
      inject: [ConfigService],
    }), PoolModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
