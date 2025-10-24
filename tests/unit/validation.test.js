import { validateLength } from "../../src/server/utils/validation.js";

describe("validateLength (robusto)", () => {
  test("OK dentro del rango", () => {
    const r = validateLength("Limpieza", {
      min: 3,
      max: 20,
      fieldName: "Nombre",
    });
    expect(r.valid).toBe(true);
    expect(r.length).toBe(8);
  });

  test("obligatorio: vacío (espacios) falla", () => {
    const r = validateLength("   ", { fieldName: "Nombre" });
    expect(r.valid).toBe(false);
    expect(r.error).toBe("Nombre es obligatorio.");
  });

  test("no obligatorio: vacío pasa (length=0)", () => {
    const r = validateLength("", { required: false, fieldName: "Alias" });
    expect(r.valid).toBe(true);
    expect(r.length).toBe(0);
  });

  test("corto falla con mensaje", () => {
    const r = validateLength("ab", { min: 3, fieldName: "Nombre" });
    expect(r.valid).toBe(false);
    expect(r.error).toBe("Nombre debe tener al menos 3 caracteres.");
  });

  test("largo falla con mensaje", () => {
    const r = validateLength("ProductoMuyLargo", {
      max: 5,
      fieldName: "Código",
    });
    expect(r.valid).toBe(false);
    expect(r.error).toBe("Código debe tener como máximo 5 caracteres.");
  });

  test("colapsa espacios + trim por defecto", () => {
    const r = validateLength("  Juan   Pérez  ", {
      min: 4,
      max: 20,
      fieldName: "Nombre",
    });
    expect(r.valid).toBe(true);
    expect(r.value).toBe("Juan Pérez");
  });

  test("admite valores no-string (número)", () => {
    const r = validateLength(12345, { min: 5, max: 10, fieldName: "Código" });
    expect(r.valid).toBe(true);
    expect(r.length).toBe(5);
  });

  test("cuenta graphemes (emojis) correctamente", () => {
    const r1 = validateLength("😀😀", { min: 3, fieldName: "Emoji" });
    expect(r1.valid).toBe(false);
    const r2 = validateLength("😀😀😀", { min: 3, fieldName: "Emoji" });
    expect(r2.valid).toBe(true);
  });

  test("modo crudo: sin trim ni normalizeSpaces", () => {
    const r = validateLength("  a  ", {
      min: 3,
      trim: false,
      normalizeSpaces: false,
      fieldName: "Raw",
    });
    expect(r.valid).toBe(true); // cuenta espacios tal cual
  });

  test("no obligatorio: con contenido pasa y normaliza", () => {
    const r = validateLength("  Cesar  ", {
      required: false,
      min: 0,
      max: 50,
      fieldName: "Alias",
    });
    expect(r.valid).toBe(true);
    expect(r.value).toBe("Cesar");
    expect(r.length).toBe(5);
  });

  test("usa conteo alternativo (codeUnit/codepoint)", () => {
    const r = validateLength("AB", {
      min: 2,
      max: 10,
      count: "codeUnit",
      fieldName: "Código",
    });
    expect(r.valid).toBe(true);
    expect(r.length).toBe(2);
  });

  test("trim sí, normalizeSpaces no (solo recorta bordes)", () => {
    const r = validateLength("  Juan   Pérez  ", {
      min: 4,
      max: 50,
      trim: true,
      normalizeSpaces: false,
      fieldName: "Nombre",
    });
    expect(r.valid).toBe(true);
    expect(r.value).toBe("Juan   Pérez"); // mantiene espacios internos
  });

  test("boundaries: exactamente min y exactamente max pasan", () => {
    const rMin = validateLength("abc", { min: 3, max: 10, fieldName: "Texto" }); // = min
    expect(rMin.valid).toBe(true);
    const rMax = validateLength("x".repeat(10), {
      min: 0,
      max: 10,
      fieldName: "Texto",
    }); // = max
    expect(rMax.valid).toBe(true);
  });

  test("required por defecto (true) + undefined: falla como obligatorio", () => {
    const r = validateLength(undefined, { fieldName: "Campo" });
    expect(r.valid).toBe(false);
    expect(r.error).toBe("Campo es obligatorio.");
  });
  test("normalizeSpaces sí y trim no (colapsa internos y conserva bordes)", () => {
    const r = validateLength("  Juan    ", {
      min: 2,
      trim: false,
      normalizeSpaces: true,
      fieldName: "Nombre",
    });
    expect(r.valid).toBe(true);
    expect(r.value).toBe(" Juan ");
    expect(r.length).toBe(6);
  });

test('defaults globales: sin options usa min=0 y required=true', () => {
  const r = validateLength('Hola');
  expect(r.valid).toBe(true);
  expect(r.length).toBe(4);
});

test('defaults por propiedad: min/required undefined activan sus defaults', () => {
  const r = validateLength('Hola', { min: undefined, required: undefined });
  expect(r.valid).toBe(true);
  expect(r.length).toBe(4);
});
});
