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
    // Validação: Verifica se as senhas coincidem
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    // Validação: Verifica se o usuário já existe
    const userExists = accounts.some((acc) => acc.user === user);
    if (userExists) {
      setError("Usuário já existe.");
      return;
    }

    // Validação: Verifica se os campos estão preenchidos
    if (user.trim() === "" || password.trim() === "") {
      setError("Usuário e senha são obrigatórios.");
      return;
    }

    // Cria a conta
    createAccount(user, password);
    setError("");
    setSuccessMessage("Conta criada com sucesso! Você pode agora fazer login.");

    // Redireciona para a página de login após um tempo
    setTimeout(() => navigate("/session"), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleRegister();
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Registrar</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="user"
            style={{ display: "block", marginBottom: "5px" }}
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
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="password"
            style={{ display: "block", marginBottom: "5px" }}
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
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="confirmPassword"
            style={{ display: "block", marginBottom: "5px" }}
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
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Registrar
        </button>
      </form>
      {error && <p style={{ color: "red", marginTop: "15px" }}>{error}</p>}
      {successMessage && (
        <p style={{ color: "green", marginTop: "15px" }}>{successMessage}</p>
      )}
    </div>
  );
};

export default Register;
