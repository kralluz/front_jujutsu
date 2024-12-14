// src/components/Login.tsx
import React, { useState, useContext } from "react";
import { AccountsContext } from "../contexts/AccountsContext";
import { useNavigate } from "react-router-dom";

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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#121212",
        color: "#fff",
        padding: "20px",
      }}
    >
      <form
        style={{
          backgroundColor: "#1e1e1e",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
        onSubmit={handleSubmit}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
        {error && (
          <div
            style={{
              backgroundColor: "#ff4d4d",
              color: "#fff",
              padding: "10px",
              borderRadius: "4px",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="user" style={{ display: "block", marginBottom: "8px" }}>
            Usuário
          </label>
          <input
            id="user"
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="Digite seu usuário"
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #333",
              backgroundColor: "#2e2e2e",
              color: "#fff",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="password" style={{ display: "block", marginBottom: "8px" }}>
            Senha
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #333",
              backgroundColor: "#2e2e2e",
              color: "#fff",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#0077cc",
            color: "#fff",
            cursor: "pointer",
          }}
        >
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
            color: "#ccc",
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
