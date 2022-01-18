
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import { WalletEntity } from './wallet.entity';


@Entity()
export class TransactionEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => WalletEntity, {eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  wallet: WalletEntity;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  message: string;

  @Column({ type: 'jsonb', default: () => "'[]'" })
  result: object;

  @Column()
  date: Date;
}