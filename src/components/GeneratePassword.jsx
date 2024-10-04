import { useState } from "react";
import { generatePassword } from "../utils/utils";

const GeneratePassword = () => {
  const [length, setLength] = useState(8);
  const [upperCase, setUpperCase] = useState(true);
  const [lowerCase, setLowerCase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [specialChars, setSpecialChars] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();
    let generatedPassword = generatePassword(
      length,
      upperCase,
      lowerCase,
      numbers,
      specialChars
    );
    document.getElementById("generatedPassword").value = generatedPassword;
  };

  return (
    <div id="signup" className="container w-full max-w-sm">
      <form
        onSubmit={submitHandler}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <fieldset>
          <div>
            <input
              checked
              name="upperCase"
              type="checkbox"
              value="true"
              onChange={() => setUpperCase(!upperCase)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="text-gray-600 text-sm font-bold ml-1 mb-2">
              Uppercase Letters
            </label>
          </div>

          <div>
            <input
              checked
              name="lowerCase"
              type="checkbox"
              value="true"
              onChange={() => setLowerCase(!lowerCase)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="text-gray-600 text-sm font-bold ml-1 mb-2">
              Lowercase Letters
            </label>
          </div>

          <div>
            <input
              checked
              name="numbers"
              type="checkbox"
              value="true"
              onChange={() => setNumbers(!numbers)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="text-gray-600 text-sm font-bold ml-1 mb-2">
              Numbers
            </label>
          </div>

          <div>
            <input
              checked
              name="specialChars"
              type="checkbox"
              value="true"
              onChange={() => setSpecialChars(!specialChars)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="text-gray-600 text-sm font-bold ml-1 mb-2">
              Special Characters
            </label>
          </div>

          <label className="block text-gray-600 text-lg font-bold mt-2 mb-2">
            Password Length:
          </label>
          <input
            name="length"
            type="number"
            min="8"
            onChange={(e) => setLength(e.target.value)}
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline mb-2"
          />
          <br />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-green-700 text-white font-bold rounded py-2 px-4 mb-2"
          >
            Generate Password
          </button>
          <br />
          <br />

          <lable>Generated Password:</lable>
          <input
            name="generatedPassword"
            id="generatedPassword"
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline mb-2"
          ></input>
        </fieldset>
      </form>
    </div>
  );
};

export default GeneratePassword;
