import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, getConnection } from "typeorm";
import { InvestmentEntity } from "./entities/investment.entity";
import { WalletEntity } from "./entities/wallet.entity";

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
}
