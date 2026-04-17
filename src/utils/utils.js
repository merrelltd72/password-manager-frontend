export function generatePassword(
  length,
  upperCase,
  lowerCase,
  numbers,
  specialChars,
) {
  const upperCaseSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCaseSet = "abcdefghijklmnopqrstuvwxyz";
  const numbersSet = "0123456789";
  const specialCharsSet = "!@#$%^&*()_+[]{}|;:,.<>?";

  let characters = "";

  if (upperCase) characters += upperCaseSet;
  if (lowerCase) characters += lowerCaseSet;
  if (numbers) characters += numbersSet;
  if (specialChars) characters += specialCharsSet;

  if (!characters) throw new Error("No character sets selected");

  let password = "";

  const array = new Uint32Array(length);
  crypto.getRandomValues(array);

  for (let i = 0; i < length; i++) {
    password += characters[array[i] % characters.length];
  }

  return password;
}
