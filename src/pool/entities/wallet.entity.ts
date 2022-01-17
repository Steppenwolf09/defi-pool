import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WalletEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  address: string;
}