import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletEntity } from '../entities/wallet.entity';
import { TransactionEntity } from '../entities/transaction.entity';
import { ResultTx } from "../interfaces/resultTx.interface";

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
    result: ResultTx,
  ): Promise<any> {
    try {
      const wallet = await this.walletRepository.findOne({
        address: result.from,
      });
      if (!wallet) {
        return 'Erorr! This wallet does not exist'
      }
      await this.transactionRepository.save({
        status: status,
        message: message,
        tx_id: tx_id,
        chain_id: result.chainId,
        pool_id: pool_id,
        timestamp: result.timestamp,
        result: result,
        wallet: wallet,
      });
      return true;
    } catch (e) {
      this.logger.warn(e);
      return false;
    }
  }
  async getPoolWalletBalance(address: string, poolId: number) {
    try {
      const wallet = await this.walletRepository.findOne({ address: address });
      const trx = await this.transactionRepository.find({
        wallet: wallet,
        pool_id: poolId,
      });
      let sum = 0;
      for (let i = 0; i < trx.length; i++) {
        sum += trx[i].result.value;
      }
      return { address: wallet.address, pool_id: poolId, summary: sum };
    } catch (e) {
      this.logger.warn(e);
      return false;
    }
  }
  async getCountPoolTx(poolId: number) {
    const tx = await this.transactionRepository.find({ pool_id: poolId });
    return tx.length;
  }
}
