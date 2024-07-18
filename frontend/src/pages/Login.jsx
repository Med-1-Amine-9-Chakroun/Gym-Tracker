import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
  };
  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Login</h3>
      <label>Email:</label>
      <input type="text" onChange={(e) => setEmail(e.target.value)} />
      <label>Password:</label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button>Login</button>
    </form>
  );
};

export default Login;
