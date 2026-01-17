import { IResumeRepository } from "../../domain/repositories/IResumeRepository";
import { ResumeProps } from "../../domain/schemas/resume.schema";

export class ListResumes {
  constructor(private resumeRepository: IResumeRepository) {}

  async execute(): Promise<ResumeProps[]> {
    return await this.resumeRepository.getAll();
  }
}