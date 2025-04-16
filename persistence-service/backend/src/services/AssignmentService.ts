import { AppDataSource } from '../config/configure';
import { Assignment } from '../models/Assignment';
import { Contract } from '../models/Contract';
import { Role } from '../models/Role';

export class AssignmentService {
  private assignmentRepository = AppDataSource.getRepository(Assignment);
  private contractRepository = AppDataSource.getRepository(Contract);
  private roleRepository = AppDataSource.getRepository(Role);

  async assignRoleToContract(contractId: number, roleId: number): Promise<Assignment> {
    const contract = await this.contractRepository.findOne({ where: { contract_id: contractId } });
    const role = await this.roleRepository.findOne({ where: { role_id: roleId } });

    if (!contract || !role) throw new Error("Contract or Role not found");

    const assignment = this.assignmentRepository.create({ contract, role });
    return this.assignmentRepository.save(assignment);
  }

  async getAssignments(): Promise<Assignment[]> {
    return this.assignmentRepository.find({ relations: ['contract', 'role'] });
  }
}
