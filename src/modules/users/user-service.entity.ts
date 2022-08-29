import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'TB_USER_SERVICE' })
export class UserService {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number

  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' }) 
  public user_id: number

  @Column({ name: 'last_login' })
  public last_login: Date

  @Column({ name: 'is_superuser', type: Boolean })
  public is_superuser: boolean

  @Column({ name: 'is_staff', type: Boolean })
  public is_staff: boolean

  @Column({name: 'date_joined'})
  public date_joined: Date
}