import { ERRORS } from '../constants/errors';

export function translateError(error: keyof typeof ERRORS) {
  return ERRORS[error];
}

