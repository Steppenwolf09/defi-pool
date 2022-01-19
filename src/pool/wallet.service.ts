import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletEntity } from './entities/wallet.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(WalletEntity)
    private walletRepository: Repository<WalletEntity>,
    private logger: Logger,
  ) {}

  async addWallet(
    address: string,
    walletIndex: number,
    timestamp: string,
  ): Promise<any> {
    try {
      if (
        await this.walletRepository.findOne({
          address: address,
        })
      ) {
        return 'This wallet is already exist';
      }
      await this.walletRepository.save({
        address: address,
        wallet_index: walletIndex,
        timestamp: timestamp,
      });
      return true;
    } catch (e) {
      this.logger.warn(e);
      return false;
    }
  }

  async dropWallet(address: string): Promise<boolean> {
    try {
      await this.walletRepository.delete({ address: address });
      return true;
    } catch (e) {
      this.logger.warn(e);
      return false;
    }
  }
}
