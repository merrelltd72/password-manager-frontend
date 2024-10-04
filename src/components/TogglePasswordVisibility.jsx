const TogglePasswordVisibility = () => {
  const togglePassword = () => {
    let toggle = document.getElementById("password");
    if (toggle.type === "password") {
      toggle.type = "text";
    } else {
      toggle.type = "password";
    }
  };

  return (
    <div className="mb-2">
      <input type="checkbox" onClick={togglePassword} />{" "}
      <label className="text-gray-600 text-sm font-bold mb-2">
        Show Password
      </label>
    </div>
  );
};

export default TogglePasswordVisibility;
