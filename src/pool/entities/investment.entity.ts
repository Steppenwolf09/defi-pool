import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';
import { WalletEntity } from './wallet.entity';


@Entity()
export class InvestmentEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(() => WalletEntity, {onDelete: 'CASCADE'})
  @JoinColumn()
  wallet: WalletEntity;

  @Column()
  active: boolean;

  @Column()
  createdAtBlock: string;

  @Column({ nullable: true })
  updatedAtBlock: string;

  @Column({ nullable: true })
  maticReceived: string;

  @Column({ nullable: true })
  wethBalance: string;

  @Column({ nullable: true })
  avaxBalance: string;

  @Column({ nullable: true })
  wbtcBalance: string;

  @Column()
  date: Date;
}