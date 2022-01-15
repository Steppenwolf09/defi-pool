import { Controller, Post, Body } from '@nestjs/common';
import { PoolService } from './pool.service';

@Controller('pool')
export class PoolController {
  constructor(
    private poolService:PoolService,
  ) {}
  @Post('invest')
  async invest(@Body() params: any): Promise<any> {
    return this.poolService.invest(params.value);
  }
  @Post('refund')
  async refund(@Body() params: any): Promise<any> {
    return this.poolService.refund(params.investmentId);
  }
}
