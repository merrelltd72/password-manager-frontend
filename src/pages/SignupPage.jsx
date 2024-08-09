import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    setErrors([]);
    const params = new FormData(e.target);
    axios.post("http://localhost:3000/users.json", params).then((res) => {
      console.log(res.data);
      e.target.reset();
      navigate("/");
    });
  };

  return (
    <div id="signup">
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form onSubmit={submitHandler}>
        <fieldset>
          <legend>Sign Up Form</legend>
          <div>
            Username: <input name="username" type="text" />
          </div>
          <div>
            Email: <input name="email" type="email" />
          </div>
          <div>
            Password: <input name="password" type="password" />
          </div>
          <div>
            Password confirmation:{" "}
            <input name="password_confirmation" type="password" />
          </div>
          <button type="submit">Signup</button>
        </fieldset>
      </form>
    </div>
  );
};

export default SignupPage;
