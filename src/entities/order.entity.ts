import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GroceryEntity } from './grocery.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order, { cascade: true })
  items: OrderItemEntity[];

  @Column('decimal')
  totalPrice: number;
}

@Entity('order_items')
export class OrderItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OrderEntity, (order) => order.items)
  order: OrderEntity;

  @ManyToOne(() => GroceryEntity)
  grocery: GroceryEntity;

  @Column()
  quantity: number;
}