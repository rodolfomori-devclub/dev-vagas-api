import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { Exclude } from 'class-transformer';

@Entity({ name: 'TB_USER' })
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number

  @Column({ name: 'username' })
  public username: string

  @Column({ name: 'password' })
  public password: string

  @Column({ name: 'first_name' })
  public first_name: string

  @Column({ name: 'last_name' })
  public last_name: string

  @Column({ name: 'email' })
  public email: string

  @Column({ name: 'is_active', type: Boolean })
  public is_active: boolean

  @Exclude()
  public currentHashedRefreshToken?: string;
}
