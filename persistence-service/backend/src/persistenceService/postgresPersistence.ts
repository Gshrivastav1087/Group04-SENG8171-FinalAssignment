// src/services/persistenceService/postgresPersistenceService.ts
import { DataSource, EntityTarget, ObjectLiteral } from "typeorm";
import IPersistenceService from "./persistenceService";

export default class PostgresPersistenceService implements IPersistenceService {
  private dataSource: DataSource;

  constructor(dataSource: DataSource) {
    if (!dataSource) {
      throw new Error("DataSource cannot be null or undefined");
    }
    this.dataSource = dataSource;
  }

  private validateDataSource(): void {
    if (!this.dataSource.isInitialized) {
      throw new Error("DataSource is not connected to the database");
    }
  }

  async create<T extends ObjectLiteral & { [key: string]: any }>(
    Entity: EntityTarget<T>,
    id: number
  ): Promise<T[]> {
    this.validateDataSource();

    const metadata = this.dataSource.getMetadata(Entity);
    const primaryColumn = metadata.primaryColumns[0].propertyName;

    return this.dataSource.getRepository(Entity).find({
      where: { [primaryColumn]: id } as any,
    });
  }

  async insert<T extends ObjectLiteral>(
    Entity: EntityTarget<T>,
    data: T
  ): Promise<T> {
    this.validateDataSource();

    try {
      return await this.dataSource.getRepository(Entity).save(data);
    } catch (error) {
      this.handleError(error);
      throw new Error("Failed to insert entity.");
    }
  }

  async update<T extends ObjectLiteral>(
    Entity: EntityTarget<T>,
    id: number,
    updates: Partial<T>
  ): Promise<void> {
    this.validateDataSource();

    const metadata = this.dataSource.getMetadata(Entity);
    const primaryColumn = metadata.primaryColumns[0].propertyName;

    try {
      await this.dataSource.getRepository(Entity).update(
        { [primaryColumn]: id } as any,
        updates
      );
    } catch (error) {
      this.handleError(error);
      throw new Error("Failed to update entity.");
    }
  }

  async delete<T extends ObjectLiteral>(
    Entity: EntityTarget<T>,
    id: number
  ): Promise<void> {
    this.validateDataSource();

    const metadata = this.dataSource.getMetadata(Entity);
    const primaryColumn = metadata.primaryColumns[0].propertyName;

    try {
      await this.dataSource.getRepository(Entity).delete({
        [primaryColumn]: id,
      } as any);
    } catch (error) {
      this.handleError(error);
      throw new Error("Failed to delete entity.");
    }
  }

  async findAll<T extends ObjectLiteral>(
    Entity: EntityTarget<T>
  ): Promise<T[]> {
    this.validateDataSource();

    try {
      return await this.dataSource.getRepository(Entity).find();
    } catch (error) {
      this.handleError(error);
      throw new Error("Failed to fetch all entities.");
    }
  }

  async findOne<T extends ObjectLiteral>(
    Entity: EntityTarget<T>,
    id: number
  ): Promise<T | null> {
    this.validateDataSource();

    const metadata = this.dataSource.getMetadata(Entity);
    const primaryColumn = metadata.primaryColumns[0].propertyName;

    try {
      return await this.dataSource.getRepository(Entity).findOne({
        where: { [primaryColumn]: id } as any,
      });
    } catch (error) {
      this.handleError(error);
      throw new Error("Failed to fetch entity by id.");
    }
  }

  private handleError(error: unknown): void {
    if (error instanceof Error) {
      console.error(`Database error: ${error.message}`);
    } else {
      console.error("Unknown error:", error);
    }
  }
}
