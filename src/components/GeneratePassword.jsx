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
    <div id="signup" className="@container w-full place-content-center">
      <div className="flex justify-center bg-primary">
        <form
          onSubmit={submitHandler}
          className="bg-white shadow-md rounded-sm border-2 p-8"
        >
          <fieldset className="fieldset bg-base-200 border-base-200 rounded-box border w-sm p-4">
            <legend className="fieldset-legend">Generate a Password</legend>
            <div>
              <input
                checked
                name="upperCase"
                type="checkbox"
                value="true"
                onChange={() => setUpperCase(!upperCase)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
              className="shadow appearance-none border rounded-sm w-full py-1 px-3 text-gray-600 leading-tight focus:outline-hidden focus:shadow-outline mb-2"
            />
            <br />

            <button
              type="submit"
              className="bg-blue-500 hover:bg-green-700 text-white font-bold rounded-sm py-2 px-4 mb-2"
            >
              Generate Password
            </button>
            <br />
            <br />

            <lable>Generated Password:</lable>
            <input
              name="generatedPassword"
              id="generatedPassword"
              className="shadow appearance-none border rounded-sm w-full py-1 px-3 text-gray-600 leading-tight focus:outline-hidden focus:shadow-outline mb-2"
            ></input>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default GeneratePassword;
