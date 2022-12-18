export const PasswordOptions = [
  'uppercase letters',
  'lowercase letters',
  'numbers',
  'symbols',
];

export const colors = {
  red: 'bg-red-500 border-red-500',
  yellow: 'bg-yellow-500 border-yellow-500',
  green: 'bg-green-500 border-green-500',
  none: ''
};

export function generatePassword(characters: number, options: Boolean[]): string {

  if (characters < 8) return "";

  let possibleCharacters = "";
  if (options[0]) possibleCharacters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (options[1]) possibleCharacters += "abcdefghijklmnopqrstuvwxyz";
  if (options[2]) possibleCharacters += "0123456789";
  if (options[3]) possibleCharacters += "!@#$%^&*()_+-=[]{}|;':,./<>?";

  let password = "";
  for (let i = 0; i < characters; i++) {
    password += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
  }

  return password;
}

export function checkPasswordStrength(password: string): number {
  const REGEX_UPPERCASE = /[A-Z]/;
  const REGEX_LOWERCASE = /[a-z]/;
  const REGEX_NUMBER = /[0-9]/;
  const REGEX_SPECIAL_CHAR = /[!@#$%^&*()_+\-[\]{};':"\\|,.<>/?]/;

  let passwordStrength = 0;

  if (REGEX_UPPERCASE.test(password)) {
    passwordStrength += 1;
  }

  if (REGEX_LOWERCASE.test(password)) {
    passwordStrength += 1;
  }

  if (REGEX_NUMBER.test(password)) {
    passwordStrength += 1;
  }

  if (REGEX_SPECIAL_CHAR.test(password)) {
    passwordStrength += 1;
  }

  return passwordStrength;
};

export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}
