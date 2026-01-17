import Dexie, { type Table } from 'dexie';
import { IResumeRepository } from '@/domain/repositories/IResumeRepository';
import { ResumeProps } from '@/domain/schemas/resume.schema';

class ResumeDatabase extends Dexie {
  resumes!: Table<ResumeProps>;

  constructor() {
    super('ResumAI_DB');
    this.version(1).stores({
      resumes: 'id, basics.email, updatedAt'
    });
  }
}

export class DexieResumeRepository implements IResumeRepository {
  private db = new ResumeDatabase();

  private normalize(data: unknown): ResumeProps {
    if (!data || typeof data !== 'object') {
       throw new Error("Datos corruptos en almacenamiento local"); 
    }
    
    const raw = data as Record<string, any>; // Casting interno controlado

    return {
      ...raw,
      id: raw.id,
      basics: {
        name: raw.basics?.name || "",
        email: raw.basics?.email || "",
        label: raw.basics?.label || "",
        summary: raw.basics?.summary || "",
        phone: raw.basics?.phone || "",
        ...raw.basics
      },
      experience: Array.isArray(raw.experience) ? raw.experience : [],
      customHtml: raw.customHtml || "",
      updatedAt: typeof raw.updatedAt === 'string' 
        ? new Date(raw.updatedAt) 
        : (raw.updatedAt || new Date())
    } as ResumeProps;
  }

  async save(resume: ResumeProps): Promise<void> {
    const cleanData = JSON.parse(JSON.stringify(resume));
    if (!cleanData.id) {
        throw new Error("Error crítico: Intento de guardar sin ID");
    }
    await this.db.resumes.put(cleanData);
  }

  async getById(id: string): Promise<ResumeProps | null> {
    const data = await this.db.resumes.get(id);
    return data ? this.normalize(data) : null;
  }

  async getAll(): Promise<ResumeProps[]> {
    const all = await this.db.resumes.toArray();
    return all
      .map(item => this.normalize(item))
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  async delete(id: string): Promise<void> {
    await this.db.resumes.delete(id);
  }
}