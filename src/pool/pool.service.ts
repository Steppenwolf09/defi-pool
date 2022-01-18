import { Injectable, Logger } from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import { Repository, getConnection } from "typeorm";
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
      await this.walletRepository.save({ address: address });
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
      const wallet = await this.walletRepository.findOne({address: result.from});
      await this.transactionRepository.save({status: status, message: message, result: result,
        wallet: wallet, date: new Date()});
      return true;
    }
    catch (e) {
      this.logger.warn(e);
      return false;
    }
  }

  async invest(addr, result): Promise<any> {
    try {
      const foundWallet = await this.walletRepository.findOne({address: addr})
      if (!foundWallet){
        return "Error! Add your wallet"
      }
      if (await this.investRepository.findOne({wallet: foundWallet})){
        await getConnection()
            .createQueryBuilder()
            .update(InvestmentEntity)
            .set({active: true,
              createdAtBlock: result.createdAtBlock, updatedAtBlock: result.updatedAtBlock,
              maticReceived: result.maticReceived, wethBalance: result.wethBalance,
              avaxBalance: result.avaxBalance, wbtcBalance: result.wbtcBalance, date: new Date()})
            .where({wallet: foundWallet})
            .execute();
        return true;
      }
      await this.investRepository.save({active: true, wallet: foundWallet,
        createdAtBlock: result.createdAtBlock, updatedAtBlock: result.updatedAtBlock,
        maticReceived: result.maticReceived, wethBalance: result.wethBalance,
        avaxBalance: result.avaxBalance, wbtcBalance: result.wbtcBalance, date: new Date()});
      return true;
    }
    catch (e) {
      this.logger.warn(e);
      return false;
    }
  }
}
