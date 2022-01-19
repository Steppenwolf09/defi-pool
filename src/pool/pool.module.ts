import { Logger, Module } from '@nestjs/common';
import { PoolController } from './pool.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletEntity } from './entities/wallet.entity';
import { TransactionEntity } from './entities/transaction.entity';
import { InvestmentEntity } from './entities/investment.entity';
import { TransactionService } from './transaction.service';
import { InvestmentService } from './investment.service';
import { WalletService } from './wallet.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WalletEntity,
      TransactionEntity,
      InvestmentEntity,
    ]),
  ],
  controllers: [PoolController],
  providers: [Logger, WalletService, TransactionService, InvestmentService],
})
export class PoolModule {}
