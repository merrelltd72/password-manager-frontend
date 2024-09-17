export function generatePassword(
  length,
  upperCase,
  lowerCase,
  numbers,
  specialChars
) {
  const upperCaseSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCaseSet = "abcdefghijklmnopqrstuvwxyz";
  const numbersSet = "0123456789";
  const specialCharsSet = "!@#$%^&*()_+[]{}|;:,.<>?";

  let characters = '"';

  if (upperCase) characters += upperCaseSet;
  if (lowerCase) characters += lowerCaseSet;
  if (numbers) characters += numbersSet;
  if (specialChars) characters += specialCharsSet;

  if (!characters) throw new Error("No character sets selected");

  let password = "";

  while (length > password.length) {
    password += characters[Math.floor(Math.random() * characters.length)];
  }

  console.log(password);
  return password;
}
