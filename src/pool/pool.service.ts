import { Injectable, Logger } from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { WalletEntity } from "./entities/wallet.entity";
import { TransactionEntity } from "./entities/transaction.entity";
import { InvestmentEntity } from "./entities/investment.entity";

@Injectable()
export class PoolService {
  constructor(
    @InjectRepository(WalletEntity)
    private walletRepository: Repository<WalletEntity>,
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
    @InjectRepository(InvestmentEntity)
    private investRepository: Repository<InvestmentEntity>,
    private logger: Logger,
  ) {}

  async addWallet(address: string): Promise<boolean> {
    try {
      await this.walletRepository.save({ address: address })
      return true;
    }
    catch (e) {
      this.logger.warn(e);
      return false;
    }
  }

  async dropWallet(address: string): Promise<boolean> {
    try {
      await this.walletRepository.delete({ address: address });
      return true;
    }
    catch (e) {
      this.logger.warn(e);
      return false;
    }
  }

  async addTransaction(status: string, message: string, result): Promise<boolean>{
    try {
      const wallet = await this.walletRepository.findOne({address: result.from})
      await this.transactionRepository.save({status: status, message: message, result: result,
        wallet: wallet.id, date: new Date()})
      return true;
    }
    catch (e) {
      this.logger.warn(e);
      return false;
    }
  }

  async invest(address, result): Promise<boolean> {
    try {
      const wallet = await this.walletRepository.findOne({address: address})
      await this.investRepository.save({active: true, walletId: wallet.id,
        createdAtBlock: result.createdAtBlock, updatedAtBlock: result.updatedAtBlock,
        maticReceived: result.maticReceived, wethBalance: result.wethBalance,
        avaxBalance: result.avaxBalance, wbtcBalance: result.wbtcBalance})
      return true;
    }
    catch (e) {
      this.logger.warn(e);
      return false;
    }
  }
}
