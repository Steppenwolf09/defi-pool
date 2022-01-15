import { Injectable, Logger } from "@nestjs/common";
const Web3 = require ('web3');
import { ConfigService } from '@nestjs/config';
const Contract = require ('web3-eth-contract');
import * as Investment from './abi/Investment.json';
import * as Erc20Token from './abi/Erc20Token.json';
import BigNumber from "bignumber.js";


@Injectable()
export class PoolService {
  private gasPrice;
  private gasLimit;
  private chainId;
  private contractAddress;
  private tokenAddress;
  private senderAddress;
  private senderKey;
  private ws;
  private web3;
  constructor(
    private ethConfig:ConfigService,
    private logger: Logger
  ) {
    this.gasPrice = ethConfig.get<number>('EthereumConfig.gasPrice');
    this.gasLimit = ethConfig.get<number>('EthereumConfig.gasLimit');
    this.chainId = ethConfig.get<number>('EthereumConfig.chainId');
    this.contractAddress = ethConfig.get<string>('EthereumConfig.contractAddress');
    this.tokenAddress = ethConfig.get<string>('EthereumConfig.tokenAddress');
    this.senderKey = ethConfig.get<string>('EthereumConfig.senderKey');
    this.senderAddress = ethConfig.get<string>('EthereumConfig.addressSender');
    this.ws = ethConfig.get<string>('EthereumConfig.ws');
    this.web3 = new Web3(this.ws);
  }
  async invest(coins: string): Promise<string> {
    try {
      const contract = new Contract(Investment.abi, this.contractAddress);
      const value = this.web3.utils.toWei(coins);
      const tokenContract = new Contract(Erc20Token.abi, this.tokenAddress);
      const txApprove = {
        gasPrice: this.gasPrice,
        gasLimit: this.gasLimit,
        to: this.tokenAddress,
        from: this.senderAddress,
        data: tokenContract.methods.approve(this.contractAddress, value).encodeABI()
      };
      const signedTxApprove = await this.web3.eth.accounts.signTransaction(txApprove, this.senderKey);
      return await this.web3.eth.sendSignedTransaction(signedTxApprove.rawTransaction);

      const txInvest = {
        gasPrice: this.gasPrice,
        gasLimit: this.gasLimit,
        to: this.tokenAddress,
        from: this.senderAddress,
        value: value,
        data: contract.methods.initInvestment().encodeABI()
      };
      const signedTxInvest = await this.web3.eth.accounts.signTransaction(txInvest, this.senderKey);
      const result = await this.web3.eth.sendSignedTransaction(signedTxInvest.rawTransaction);
      return result.transactionHash;
    }
    catch(error) {
      this.logger.warn(`${error}`);
    }
  }

  async refund(investmentId: number): Promise<any> {
    try {
      const contract = new Contract(Investment.abi, this.contractAddress);
      const txFinishInvest = {
        gasPrice: this.gasPrice,
        gasLimit: this.gasLimit,
        to: this.tokenAddress,
        from: this.senderAddress,
        data: contract.methods.finishInvestment(investmentId).encodeABI()
      };
      const signedTxInvest = await this.web3.eth.accounts.signTransaction(txFinishInvest, this.senderKey);
      const result = await this.web3.eth.sendSignedTransaction(signedTxInvest.rawTransaction);
      return result.transactionHash;
    }
    catch(error) {
      this.logger.warn(`${error}`);
    }
  }
}
