// src/services/persistenceService/mockPersistenceService.ts

import { EntityTarget, ObjectLiteral } from "typeorm";
import { Assignment } from "../models/Assignment";
import { Award } from "../models/Award";
import { Contact } from "../models/Contact";
import { Contract } from "../models/Contract";
import { Movie } from "../models/Movie";
import { MovieAward } from "../models/MovieAward";
import { Nationality } from "../models/Nationality";
import { Person } from "../models/Person";
import { PersonAward } from "../models/PersonAward";
import { Role } from "../models/Role";
import IPersistenceService from "./persistenceService";

export default class MockPersistenceService implements IPersistenceService {
  create<T extends ObjectLiteral & { id: number }>(Entity: EntityTarget<T>, id: number): Promise<T[]> {
    const entityInstance = this.getMockEntity<T>(Entity, id);
    return entityInstance ? Promise.resolve([entityInstance]) : Promise.reject("Unknown entity.");
  }

  insert<T extends ObjectLiteral>(Entity: EntityTarget<T>, data: T): Promise<T> {
    return Promise.resolve(data);
  }

  update<T extends ObjectLiteral>(Entity: EntityTarget<T>, id: number, updates: Partial<T>): Promise<void> {
    return Promise.resolve();
  }

  delete<T extends ObjectLiteral>(Entity: EntityTarget<T>, id: number): Promise<void> {
    return Promise.resolve();
  }

  findAll<T extends ObjectLiteral>(Entity: EntityTarget<T>): Promise<T[]> {
    const entityInstance = this.getMockEntity<T>(Entity, 1);
    return entityInstance ? Promise.resolve([entityInstance]) : Promise.reject("Unknown entity.");
  }

  private getMockEntity<T>(Entity: EntityTarget<T>, id: number): T | null {
    if (Entity === Award) {
      return {
        award_id: id,
        award_name: "Best Picture",
        award_year: 2024
      } as unknown as T;
    }

    if (Entity === Assignment) {
      return {
        assignment_id: id
      } as unknown as T;
    }

    if (Entity === Contact) {
      return {
        contact_id: id,
        email: "john@example.com",
        phone_number: "123-456-7890",
        address: "123 Hollywood Blvd"
      } as unknown as T;
    }

    if (Entity === Contract) {
      return {
        contract_id: id,
        salary: 50000
      } as unknown as T;
    }

    if (Entity === Movie) {
      return {
        movie_id: id,
        title: "The Big Show",
        release_date: "2024-10-01"
      } as unknown as T;
    }

    if (Entity === MovieAward) {
      return {
        movieaward_id: id
      } as unknown as T;
    }

    if (Entity === Nationality) {
      return {
        nationality_id: id,
        country_name: "Canada"
      } as unknown as T;
    }

    if (Entity === Person) {
      return {
        person_id: id,
        full_name: "John Doe",
        date_of_birth: "1990-01-01",
        biography: "A seasoned actor."
      } as unknown as T;
    }

    if (Entity === PersonAward) {
      return {
        personaward_id: id
      } as unknown as T;
    }

    if (Entity === Role) {
      return {
        role_id: id,
        role_name: "Director"
      } as unknown as T;
    }

    return null;
  }
}