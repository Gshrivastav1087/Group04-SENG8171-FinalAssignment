import { AppDataSource } from '../config/configure';
import { Assignment } from '../models/Assignment';
import { Contract } from '../models/Contract';
import { Role } from '../models/Role';

export class AssignmentService {
  private assignmentRepository = AppDataSource.getRepository(Assignment);
  private contractRepository = AppDataSource.getRepository(Contract);
  private roleRepository = AppDataSource.getRepository(Role);

  async createAssignment(contract_id: number, role_id: number, cost: number): Promise<Assignment> {
    const contract = await this.contractRepository.findOneBy({ contract_id });
    const role = await this.roleRepository.findOneBy({ role_id });

    if (!contract || !role) throw new Error('Invalid contract or role ID');

    const assignment = this.assignmentRepository.create({ contract, role, cost });
    return this.assignmentRepository.save(assignment);
  }

  async getAssignments(): Promise<Assignment[]> {
    return this.assignmentRepository.find({ relations: ['contract', 'role'] });
  }

  async getAssignmentById(id: number): Promise<Assignment | null> {
    return this.assignmentRepository.findOne({ where: { assignment_id: id }, relations: ['contract', 'role'] });
  }

  async updateAssignment(id: number, contract_id: number, role_id: number, cost: number): Promise<Assignment | null> {
    const assignment = await this.assignmentRepository.findOne({ where: { assignment_id: id }, relations: ['contract', 'role'] });
    if (!assignment) return null;

    const contract = await this.contractRepository.findOneBy({ contract_id });
    const role = await this.roleRepository.findOneBy({ role_id });

    if (!contract || !role) throw new Error('Invalid contract or role ID');

    assignment.contract = contract;
    assignment.role = role;
    assignment.cost = cost;

    return this.assignmentRepository.save(assignment);
  }

  async deleteAssignment(id: number): Promise<boolean> {
    const result = await this.assignmentRepository.delete(id);
    return result.affected !== 0;
  }
}
