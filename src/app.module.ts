import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PoolModule } from "./pool/pool.module";
import { ConfigModule } from "@nestjs/config";
import EthereumConfig from 'config/ether.config'

@Module({
  imports: [ConfigModule.forRoot({ load: [EthereumConfig], envFilePath: '.development.env' }),
    PoolModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
