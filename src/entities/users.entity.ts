import { UserRole } from 'src/users/dto/create-user.dto';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Permission } from './permission.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column('int', {
    default: 4  // 4 = CUSTOMER
  })
  role: number;

  // @OneToOne(() => Permission)
  // @JoinColumn({name: 'permissionId'})
  // permissionId: Permission;
  @Column()
  permissionId: number

  @CreateDateColumn()
  creat_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  created_by: string;

  @Column()
  update_by: string;
}