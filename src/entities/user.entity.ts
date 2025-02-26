import { UserRole } from 'src/users/dto/create-user.dto';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Permission } from './permission.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({nullable: true})
  address?: string;

  @Column('int', {
    default: 4,  // 4 = CUSTOMER
  })
  role?: number;

  @ManyToOne(() => Permission)
  @JoinColumn({ name: 'permissionId' })
  permission?: Permission;
  // @Column()
  // permissionId: number

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({nullable: true})
  createdBy: string;

  @Column({nullable: true})
  updatedBy: string;
}