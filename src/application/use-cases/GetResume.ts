import { IResumeRepository } from "../../domain/repositories/IResumeRepository";
import { ResumeProps } from "../../domain/schemas/resume.schema";

export class GetResume {
  constructor(private resumeRepository: IResumeRepository) {}

  async execute(id: string): Promise<ResumeProps | null> {
    return await this.resumeRepository.getById(id);
  }
}