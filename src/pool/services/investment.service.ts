import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, getConnection } from "typeorm";
import { InvestmentEntity } from "../entities/investment.entity";
import { WalletEntity } from "../entities/wallet.entity";

@Injectable()
export class InvestmentService {
  constructor(
    @InjectRepository(InvestmentEntity)
    private investRepository: Repository<InvestmentEntity>,
    @InjectRepository(WalletEntity)
    private walletRepository: Repository<WalletEntity>,
    private logger: Logger,
  ) {}

  async invest(addr: string, result): Promise<any> {
    try {
      const foundWallet = await this.walletRepository.findOne({
        address: addr,
      });
      if (!foundWallet) {
        return 'Error! Add your wallet';
      }
      if (
        await this.investRepository.findOne({
          wallet: foundWallet,
        })
      ) {
        await getConnection()
          .createQueryBuilder()
          .update(InvestmentEntity)
          .set({
            active: true,
            createdAtBlock: result.createdAtBlock,
            updatedAtBlock: result.updatedAtBlock,
            maticReceived: result.maticReceived,
            wethBalance: result.wethBalance,
            avaxBalance: result.avaxBalance,
            wbtcBalance: result.wbtcBalance,
            date: new Date(),
          })
          .where({ wallet: foundWallet })
          .execute();
        return true;
      }
      await this.investRepository.save({
        active: true,
        wallet: foundWallet,
        createdAtBlock: result.createdAtBlock,
        updatedAtBlock: result.updatedAtBlock,
        maticReceived: result.maticReceived,
        wethBalance: result.wethBalance,
        avaxBalance: result.avaxBalance,
        wbtcBalance: result.wbtcBalance,
        date: new Date(),
      });
      return true;
    } catch (e) {
      this.logger.warn(e);
      return false;
    }
  }
  async getBalances(address: string, poolId?: number) {
    try {
      const wallet = await this.walletRepository.findOne({ address: address });
      const result = await this.investRepository.findOne({ wallet: wallet });
      return {
        address: address,
        wethBalance: result.wethBalance,
        avaxBalance: result.avaxBalance,
        wbtcBalance: result.wbtcBalance,
      };
    } catch (e) {
      this.logger.warn(e);
      return false;
    }
  }
  async isActive(id: number){
    try {
      const res = await this.investRepository.findOne({id})
      return res.active;
    } catch (e) {
      this.logger.warn(e);
      return 'Error! There is not this id';
    }
  }
  async deactivate(id: number) {
    try {
      await getConnection()
        .createQueryBuilder()
        .update(InvestmentEntity)
        .set({
          active: false,
        })
        .where({ id })
        .execute();
      return true;
    } catch (e) {
      this.logger.warn(e);
      return 'Error! There is not this id';
    }
  }
}
