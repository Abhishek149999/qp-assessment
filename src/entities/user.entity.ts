import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'USER_DETAIL' })
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'ID' })
  public id: number;

  @Column({ name: 'FIRST_NAME', length: 30 })
  public firstName: string;

  @Column({ name: 'LAST_NAME', length: 30 })
  public lastName: string;

  @Column({ name: 'EMAIL_ID', length: 50, unique: true })
  public emailId: string;

  @Column({ name: 'ROLE', length: 10 })
  public role: string;

  @CreateDateColumn({ name: 'CREATED_AT' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT', nullable: true })
  public updatedAt: Date;
}