// src/components/Login.tsx
import React, { useState, useContext } from "react";
import { AccountsContext } from "../contexts/AccountsContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login: React.FC = () => {
  const accountsContext = useContext(AccountsContext);
  const navigate = useNavigate();

  if (!accountsContext) {
    return null;
  }

  const { login } = accountsContext;
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLogin = () => {
    const success = login(user, password);
    if (success) {
      navigate("/");
    } else {
      setError("Usuário ou senha incorretos.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-heading">Login</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label htmlFor="user" className="form-label">
            Usuário
          </label>
          <input
            id="user"
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="Digite seu usuário"
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Senha
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        <p
          style={{
            color: "#333",
            fontSize: "14px",
          }}
        >
          Não tem uma conta?{" "}
          <a
            style={{
              color: "#0077cc",
              textDecoration: "none", 
            }}
            href="/register"
          >
            Criar conta
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
