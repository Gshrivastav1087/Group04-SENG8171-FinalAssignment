import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Contract } from './Contract';
import { Role } from './Role';

@Entity('assignment')
export class Assignment {
  @PrimaryGeneratedColumn()
  assignment_id: number;

  @Column()
  cost: number;

  @ManyToOne(() => Contract, contract => contract.assignments)
  contract: Contract;

  @ManyToOne(() => Role, role => role.assignments)
  role: Role;
}
