import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Assignment } from './Assignment';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn()
  role_id: number;

  @Column({ unique: true })
  role_name: string;

  @OneToMany(() => Assignment, assignment => assignment.role)
  assignments: Assignment[];
}
