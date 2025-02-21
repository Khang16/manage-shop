import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({type: 'text'})
  description: string;

  @Column({type: 'text'})
  detail: string;
  
  @CreateDateColumn()
  creat_at: Date;
  
  @UpdateDateColumn()
  updated_at: Date;
  
  @Column()
  created_by: string;
  
  @Column()
  update_by: string;
}
