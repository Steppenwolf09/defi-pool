import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class PoolEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  weth: boolean;

  @Column()
  avax: boolean;

  @Column()
  wbtc: boolean;
}