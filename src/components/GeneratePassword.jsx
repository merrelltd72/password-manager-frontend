import { useState } from "react";
import { generatePassword } from "../utils/utils";
import { toast } from "react-toastify";

const GeneratePassword = () => {
  const [length, setLength] = useState(8);
  const [upperCase, setUpperCase] = useState(true);
  const [lowerCase, setLowerCase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [specialChars, setSpecialChars] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    try {
      const pwd = generatePassword(
        length,
        upperCase,
        lowerCase,
        numbers,
        specialChars,
      );
      setGeneratedPassword(pwd);
    } catch {
      toast.error("Please select at least one character type.");
    }
  };

  const handleCopy = () => {
    if (!generatedPassword) return;
    navigator.clipboard
      .writeText(generatedPassword)
      .then(() => {
        toast.success("Password copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy password. Please copy it manually.");
      });
  };

  return (
    <div id="generatePassword" className="app-page">
      <div className="flex flex-col justify-center items-center h-screen">
        <form onSubmit={submitHandler} className="app-card mb-4 max-w-md">
          <fieldset className="app-fieldset">
            <legend className="app-fieldset-legend">Generate a Password</legend>
            <div>
              <input
                checked={upperCase}
                name="upperCase"
                type="checkbox"
                value="true"
                onChange={() => setUpperCase(!upperCase)}
                className="checkbox checkbox-primary checkbox-sm"
              />
              <label className="ml-2 text-sm font-semibold text-base-content/80">
                Uppercase Letters
              </label>
            </div>

            <div>
              <input
                checked={lowerCase}
                name="lowerCase"
                type="checkbox"
                value="true"
                onChange={() => setLowerCase(!lowerCase)}
                className="checkbox checkbox-primary checkbox-sm"
              />
              <label className="ml-2 text-sm font-semibold text-base-content/80">
                Lowercase Letters
              </label>
            </div>

            <div>
              <input
                checked={numbers}
                name="numbers"
                type="checkbox"
                value="true"
                onChange={() => setNumbers(!numbers)}
                className="checkbox checkbox-primary checkbox-sm"
              />
              <label className="ml-2 text-sm font-semibold text-base-content/80">
                Numbers
              </label>
            </div>

            <div>
              <input
                checked={specialChars}
                name="specialChars"
                type="checkbox"
                value="true"
                onChange={() => setSpecialChars(!specialChars)}
                className="checkbox checkbox-primary checkbox-sm"
              />
              <label className="ml-2 text-sm font-semibold text-base-content/80">
                Special Characters
              </label>
            </div>

            <label className="app-label mt-2">Password Length:</label>
            <input
              name="length"
              type="number"
              min="8"
              onChange={(e) => setLength(e.target.value)}
              className="app-input mb-2"
            />
            <br />

            <button type="submit" className="app-btn-primary mb-2">
              Generate Password
            </button>
            <br />
            <br />

            <label className="label">Generated Password:</label>
            <div className="flex gap-2">
              <input
                readOnly
                value={generatedPassword}
                name="generatedPassword"
                id="generatedPassword"
                className="app-input mb-2"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="btn btn-outline btn-sm"
                title="Copy to clipboard"
              >
                Copy
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default GeneratePassword;
