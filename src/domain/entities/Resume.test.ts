import { expect, test, describe } from "bun:test";
import { Resume } from "./Resume";

describe("Resume Entity", () => {
  test("debería crear un CV válido", () => {
    const validData = {
      basics: { name: "Jose Informático", email: "jose@test.com" },
      sections: []
    };
    const resume = Resume.create(validData);
    expect(resume.canBeExported()).toBeFalse(); // Falla porque no tiene secciones
  });

  test("debería fallar con un email inválido", () => {
    const invalidData = {
      basics: { name: "Jose", email: "no-es-email" },
      sections: []
    };
    expect(() => Resume.create(invalidData)).toThrow();
  });
});