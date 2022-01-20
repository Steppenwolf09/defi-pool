import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletEntity } from './entities/wallet.entity';
import { TransactionEntity } from './entities/transaction.entity';
import { InvestmentEntity } from './entities/investment.entity';
import { TransactionService } from './services/transaction.service';
import { InvestmentService } from './services/investment.service';
import { WalletService } from './services/wallet.service';
import { WalletController } from './controllers/wallet.controller';
import { TransactionController } from './controllers/transaction.controller';
import { InvestmentController } from './controllers/investment.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WalletEntity,
      TransactionEntity,
      InvestmentEntity,
    ]),
  ],
  controllers: [WalletController, TransactionController, InvestmentController],
  providers: [Logger, WalletService, TransactionService, InvestmentService],
})
export class PoolModule {}
