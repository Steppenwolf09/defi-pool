import {Controller, Post, Body, Get} from '@nestjs/common';
import { WalletService } from '../services/wallet.service';
import { InvestmentService } from '../services/investment.service';
import { TransactionService } from '../services/transaction.service';

@Controller('wallet')
export class WalletController {
  constructor(
    private walletService: WalletService,
  ) {
  }

  @Post('addNew')
  async addWallet(@Body() params: any): Promise<any> {
    return this.walletService.addWallet(
      params.address,
      params.walletIndex,
      params.timestamp,
    );
  }

  @Post('drop')
  async dropWallet(@Body() params: any): Promise<any> {
    return this.walletService.dropWallet(params.address);
  }
}
