import Dexie, { type Table } from 'dexie';
import { IResumeRepository } from '../../domain/repositories/IResumeRepository';
import { ResumeProps } from '../../domain/schemas/resume.schema';

class ResumeDatabase extends Dexie {
  resumes!: Table<ResumeProps>;

  constructor() {
    super('ResumAI_DB');
    this.version(1).stores({
      resumes: 'id, basics.email, updatedAt' // Índices para búsqueda rápida
    });
  }
}

export class DexieResumeRepository implements IResumeRepository {
  private db = new ResumeDatabase();

  async save(resume: ResumeProps): Promise<void> {
    await this.db.resumes.put(resume);
  }

  async getById(id: string): Promise<ResumeProps | null> {
    return (await this.db.resumes.get(id)) || null;
  }

  async getAll(): Promise<ResumeProps[]> {
    return await this.db.resumes.toArray();
  }

  async delete(id: string): Promise<void> {
    await this.db.resumes.delete(id);
  }
}