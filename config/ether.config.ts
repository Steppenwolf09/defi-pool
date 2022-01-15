import { registerAs } from "@nestjs/config";

export default registerAs('EthereumConfig', () => ({
  ws: process.env.WEB_SOCKET || "wss://ropsten.infura.io/ws/v3/ec12139d8eef47479c25a75f27226c4f",
  gasPrice: parseInt(process.env.GAS_PRICE) || 1600000015,
  gasLimit: parseInt(process.env.GAS_LIMIT) || 1000000,
  chainId: parseInt(process.env.CHAIN_ID) || 3,
  contractAddress: String(process.env.CONTRACT_ADDRESS),
  tokenAddress: String(process.env.TOKEN_ADDRESS),
  addressSender: String(process.env.ADDRESS_SENDER),
  senderKey: String(process.env.SENDER_KEY),
}));