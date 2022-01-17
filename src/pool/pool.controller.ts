import { Controller, Post, Body } from '@nestjs/common';
import { PoolService } from './pool.service';

@Controller('pool')
export class PoolController {
  constructor(
    private poolService:PoolService,
  ) {}

  @Post('addWallet')
  async addWallet(@Body() params: any): Promise<any> {
    return this.poolService.addWallet(params.address);
  }

  @Post('dropWallet')
  async dropWallet(@Body() params: any): Promise<any> {
    return this.poolService.dropWallet(params.address);
  }

  @Post('addTransaction')
  async addTransaction(@Body() params: any): Promise<any> {
    return this.poolService.addTransaction(params.status, params.message, params.result);
  }

  @Post('invest')
  async invest(@Body() params: any): Promise<any> {
    return this.poolService.invest(params.address, params.result);
  }
}
