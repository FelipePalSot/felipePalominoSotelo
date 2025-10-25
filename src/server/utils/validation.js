export function validateLength(
  value,
  {
    min = 0,
    max = Infinity,
    fieldName = 'Campo',
    required = true,
    trim = true,
    normalizeSpaces = true,
    count = 'grapheme', // 'grapheme' | 'codeUnit'
  } = {}
) {
  // 1) a string, always
  let s = typeof value === 'string' ? value : String(value ?? '');

  // 2) normalizaciones
  if (normalizeSpaces) s = s.replace(/\s+/g, ' ');
  if (trim) s = s.trim();

  // 3) requerido
  if (required && s.length === 0) {
    return { valid: false, error: `${fieldName} es obligatorio.` };
  }
  // si no es requerido y quedó vacío, ya pasó
  if (!required && s.length === 0) {
    return { valid: true, value: s, length: 0 };
  }

  // 4) cómo contamos longitud (soporte emojis/acentos)
  const length =
    count === 'grapheme' && typeof Intl !== 'undefined' && Intl.Segmenter
      ? Array.from(new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(s)).length
      : [...s].length; // fallback: codepoints (mejor que s.length)

  // 5) límites
  if (length < min) return { valid: false, error: `${fieldName} debe tener al menos ${min} caracteres.` };
  if (length > max) return { valid: false, error: `${fieldName} debe tener como máximo ${max} caracteres.` };

  return { valid: true, value: s, length };
}

export function validateEmail(email, { fieldName = 'Correo electrónico' } = {}) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email || typeof email !== 'string') {
    return { valid: false, error: `${fieldName} es obligatorio.` };
  }
  
  const trimmedEmail = email.trim();
  
  if (!emailRegex.test(trimmedEmail)) {
    return { valid: false, error: `El formato de ${fieldName} no es válido.` };
  }
  
  return { valid: true, value: trimmedEmail };
}
