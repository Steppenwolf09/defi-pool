
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import { WalletEntity } from './wallet.entity';


@Entity()
export class TransactionEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => WalletEntity)
  @JoinColumn()
  Wallet: WalletEntity;

  @Column({ nullable: true })
  status: string;

  @Column()
  message: string;

  @Column({ type: 'jsonb', default: () => "'[]'" })
  result: object;

  @Column()
  date: Date;
}