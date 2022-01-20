import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, PrimaryColumn} from 'typeorm';
import { WalletEntity } from './wallet.entity';
import { ResultTx } from '../interfaces/resultTx.interface';


@Entity()
export class TransactionEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @PrimaryColumn()
  tx_id: number;

  @Column()
  chain_id: number;

  @Column()
  pool_id: number;

  @Column()
  timestamp: string;

  @ManyToOne(() => WalletEntity, {eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  wallet: WalletEntity;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  message: string;

  @Column({ type: 'jsonb', default: () => "'[]'" })
  result: ResultTx;
}