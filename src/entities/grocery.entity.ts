import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('groceries')
export class GroceryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column()
  description: string;

  @Column()
  inventory: number;
}