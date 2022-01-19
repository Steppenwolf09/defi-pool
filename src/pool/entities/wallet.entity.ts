import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class WalletEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @PrimaryColumn()
  wallet_index: number;

  @PrimaryColumn()
  address: string;

  @Column()
  timestamp: string;
}