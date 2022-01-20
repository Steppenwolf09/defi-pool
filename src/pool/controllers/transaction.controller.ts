import { Controller, Post, Body, Get } from '@nestjs/common';
import { WalletService } from '../services/wallet.service';
import { InvestmentService } from '../services/investment.service';
import { TransactionService } from '../services/transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(
    private walletService: WalletService,
    private investService: InvestmentService,
    private transactionService: TransactionService,
  ) {
  }

  @Post('addNew')
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

  @Get('wallet-pool-balance')
  async getPoolWalletBalance(@Body() params: any) {
    return this.transactionService.getPoolWalletBalance(
      params.address,
      params.poolId,
    );
  }
  @Get('count-pool-tx')
  async getCountPoolTx(@Body() params: any) {
    return this.transactionService.getCountPoolTx(params.poolId);
  }
}