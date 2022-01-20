import { Controller, Post, Body, Get } from '@nestjs/common';
import { WalletService } from '../services/wallet.service';
import { InvestmentService } from '../services/investment.service';
import { TransactionService } from '../services/transaction.service';

@Controller('investment')
export class InvestmentController {
  constructor(
    private walletService: WalletService,
    private investService: InvestmentService,
  ) {}
  @Post('invest')
  async invest(@Body() params: any): Promise<any> {
    return this.investService.invest(params.address, params.result);
  }
  @Get('balances')
  async getBalances(@Body() params: any): Promise<any> {
    return this.investService.getBalances(params.address, params.poolId);
  }
  @Get('isActive')
  async isActive(@Body() params: any): Promise<any> {
    return this.investService.isActive(params.id);
  }
  @Post('deactivate')
  async deactivate(@Body() params: any): Promise<any> {
    return this.investService.deactivate(params.id);
  }
}