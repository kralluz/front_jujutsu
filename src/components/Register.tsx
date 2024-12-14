// src/components/Register.tsx
import React, { useState, useContext } from "react";
import { AccountsContext } from "../contexts/AccountsContext";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const accountsContext = useContext(AccountsContext);
  const navigate = useNavigate();

  if (!accountsContext) {
    return null;
  }

  const { createAccount, accounts } = accountsContext;

  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    const userExists = accounts.some((acc) => acc.user === user);
    if (userExists) {
      setError("Usuário já existe.");
      return;
    }

    if (user.trim() === "" || password.trim() === "") {
      setError("Usuário e senha são obrigatórios.");
      return;
    }

    createAccount(user, password);
    setError("");
    setSuccessMessage("Conta criada com sucesso! Você pode agora fazer login.");

    setTimeout(() => navigate("/session"), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleRegister();
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
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Registrar</h2>
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
        {successMessage && (
          <div
            style={{
              backgroundColor: "#4CAF50",
              color: "#fff",
              padding: "10px",
              borderRadius: "4px",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            {successMessage}
          </div>
        )}
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="user"
            style={{ display: "block", marginBottom: "8px" }}
          >
            Usuário
          </label>
          <input
            type="text"
            id="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="Digite seu usuário"
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
          <label
            htmlFor="password"
            style={{ display: "block", marginBottom: "8px" }}
          >
            Senha
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
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
          <label
            htmlFor="confirmPassword"
            style={{ display: "block", marginBottom: "8px" }}
          >
            Confirmar Senha
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirme sua senha"
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
          Registrar
        </button>
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
            Já tem uma conta?{" "}
            <a
              style={{
                color: "#0077cc",
                textDecoration: "none",
              }}
              href="/session"
            >
              Fazer login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
