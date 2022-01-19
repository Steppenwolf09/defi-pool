import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletEntity } from './entities/wallet.entity';
import { TransactionEntity } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(WalletEntity)
    private walletRepository: Repository<WalletEntity>,
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
    private logger: Logger,
  ) {}

  async addTransaction(
    status: string,
    message: string,
    tx_id: number,
    chain_id: number,
    pool_id: number,
    timestamp: string,
    result,
  ): Promise<boolean> {
    try {
      const wallet = await this.walletRepository.findOne({
        address: result.from,
      });
      await this.transactionRepository.save({
        status: status,
        message: message,
        tx_id: tx_id,
        chain_id: chain_id,
        pool_id: pool_id,
        timestamp: timestamp,
        result: result,
        wallet: wallet,
      });
      return true;
    } catch (e) {
      this.logger.warn(e);
      return false;
    }
  }
}
