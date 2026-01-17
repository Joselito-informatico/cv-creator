import { Resume } from "../../domain/entities/Resume";
import { IResumeRepository } from "../../domain/repositories/IResumeRepository";

export class SaveResume {
  constructor(private resumeRepository: IResumeRepository) {}

  async execute(data: unknown): Promise<void> {
    // 1. Convertir a Entidad (Esto valida los datos automáticamente)
    const resume = Resume.create(data);
    
    // 2. Persistir
    await this.resumeRepository.save(resume.toPersistence());
  }
}