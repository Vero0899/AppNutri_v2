// rut-validator.ts
import { AbstractControl, ValidatorFn } from '@angular/forms';

export function rutValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const rut = control.value;

    // Verificar si el RUT es válido
    if (!rut) return null; // No validar si no hay valor

    // Remover el guion para la validación
    const [numberPart, dv] = rut.split('-');
    const number = numberPart.replace(/\./g, ''); // Remover puntos
    if (!number || !dv) return { 'invalidRut': true }; // Si falta el número o el dígito verificador

    // Lógica de validación
    let sum = 0;
    let multiplier = 2;

    for (let i = number.length - 1; i >= 0; i--) {
      sum += Number(number[i]) * multiplier;
      multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }

    const calculatedDv = 11 - (sum % 11);
    const finalDv = calculatedDv === 10 ? 'K' : calculatedDv === 11 ? '0' : calculatedDv.toString();

    return finalDv.toLowerCase() === dv.toLowerCase() ? null : { 'invalidRut': true };
  };
}
