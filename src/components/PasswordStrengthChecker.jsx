import zxcvbn from "zxcvbn";
import { useState } from "react";

const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const result = zxcvbn(newPassword);
    setScore(result.score);
    setFeedback(result.feedback.suggestions.join(" "));
  };

  const getScoreLabel = (score) => {
    switch (score) {
      case 0:
        return (
          <label className=" block text-lg text-red-600>">Very Weak</label>
        );
      case 1:
        return <label className="block text-lg text-orange-600>">Weak</label>;
      case 2:
        return (
          <label className="block text-lg text-yellow-600>">Moderate</label>
        );
      case 3:
        return <label className="block text-lg text-green-600>">Strong</label>;
      case 4:
        return (
          <label className="block text-lg text-green-600>">Very Strong</label>
        );
      default:
        <label className="block text-lg text-gray-600>">Unknown</label>;
    }
  };

  return (
    <>
      <div>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter password here"
          className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div>
        <strong>Password Strength:</strong> {getScoreLabel(score)}
      </div>
      <div>{feedback && <em className="text-gray-500">{feedback}</em>}</div>
    </>
  );
};

export default PasswordStrengthChecker;
