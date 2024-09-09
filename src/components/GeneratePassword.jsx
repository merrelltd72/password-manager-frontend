import { useState } from "react";
import { generatePassword } from "../utils/utils";

const GeneratePassword = () => {
  const [length, setLength] = useState(8);
  const [letters, setLetters] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [specialChars, setSpecialChars] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();
    let generatedPassword = generatePassword(
      length,
      letters,
      numbers,
      specialChars
    );
    console.log(generatedPassword);
  };

  return (
    <div id="signup" className="container w-full max-w-sm">
      <form onSubmit={submitHandler}>
        <fieldset>
          <legend>GeneratePassword</legend>
          <div>
            <input
              name="letters"
              type="checkbox"
              value="true"
              onChange={() => setLetters(!letters)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Letters
            </label>
          </div>

          <div>
            <input
              name="numbers"
              type="checkbox"
              value="true"
              onChange={() => setNumbers(!numbers)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Numbers
            </label>
          </div>

          <div>
            <input
              name="specialChars"
              type="checkbox"
              value="true"
              onChange={() => setSpecialChars(!specialChars)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Special Characters
            </label>
          </div>

          <label className="block text-gray-600 text-lg font-bold mb-2">
            Password Length:
          </label>
          <input
            name="length"
            type="number"
            min="8"
            onChange={(e) => setLength(e.target.value)}
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
          />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-green-700 text-white font-bold rounded py-2 px-4"
          >
            Generate Password
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default GeneratePassword;
