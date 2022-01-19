import { Controller, Post, Body } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { InvestmentService } from './investment.service';
import { TransactionService } from './transaction.service';

@Controller('pool')
export class PoolController {
  constructor(
    private walletService: WalletService,
    private investService: InvestmentService,
    private transactionService: TransactionService,
  ) {}

  @Post('addWallet')
  async addWallet(@Body() params: any): Promise<any> {
    return this.walletService.addWallet(
      params.address,
      params.walletIndex,
      params.timestamp,
    );
  }

  @Post('dropWallet')
  async dropWallet(@Body() params: any): Promise<any> {
    return this.walletService.dropWallet(params.address);
  }

  @Post('addTransaction')
  async addTransaction(@Body() params: any): Promise<any> {
    return this.transactionService.addTransaction(
      params.status,
      params.message,
      params.tx_id,
      params.chain_id,
      params.pool_id,
      params.timestamp,
      params.result,
    );
  }

  @Post('invest')
  async invest(@Body() params: any): Promise<any> {
    return this.investService.invest(params.address, params.result);
  }
}
