import { resumeSchema, type ResumeProps } from "@/domain/schemas/resume.schema";

export class Resume {
  private constructor(private props: ResumeProps) {}

  // Uso de 'unknown' para obligar a la validación de tipos segura
  static create(data: unknown): Resume {
    const raw = data as Record<string, unknown>;
    const safeRaw = raw || {};

    // Casteo seguro de sub-propiedades para inyección de defaults
    const basics = (safeRaw.basics as Record<string, unknown>) || {};
    const experience = Array.isArray(safeRaw.experience) ? safeRaw.experience : [];

    const enrichedData = {
      ...safeRaw,
      id: safeRaw.id || crypto.randomUUID(),
      basics: {
        name: basics.name || "Nuevo Usuario",
        email: basics.email || "email@ejemplo.com",
        label: basics.label || "",
        summary: basics.summary || "",
        phone: basics.phone || "",
        ...basics
      },
      experience: experience,
      customHtml: safeRaw.customHtml || "",
      updatedAt: safeRaw.updatedAt || new Date(),
    };

    const validated = resumeSchema.parse(enrichedData);
    return new Resume(validated);
  }

  public canBeExported(): boolean {
    return (
      this.props.basics.name.length > 0
    );
  }

  public toPersistence(): ResumeProps {
    return JSON.parse(JSON.stringify(this.props));
  }

  get id() { return this.props.id; }
  get basics() { return this.props.basics; }
  get experience() { return this.props.experience; }
  get customHtml() { return this.props.customHtml; }
  get updatedAt() { return this.props.updatedAt; }
}