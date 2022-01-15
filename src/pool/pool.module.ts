import { Logger, Module } from "@nestjs/common";
import { PoolController } from './pool.controller';
import { PoolService } from './pool.service';
import { ConfigModule } from '@nestjs/config';
import EthereumConfig from 'config/ether.config';

@Module({
  imports: [ConfigModule.forFeature(EthereumConfig)],
  controllers: [PoolController],
  providers: [PoolService, Logger],
})
export class PoolModule {}
