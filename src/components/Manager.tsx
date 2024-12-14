// src/components/Manager.tsx
import React, { useState } from "react";
import AccountsManager from "./AccountsManager";
import CharactersManager from "./CharactersManager";

const Manager: React.FC = () => {
  const [activeTab, setActiveTab] = useState("accounts");

  return (
    <div
      style={{
        padding: "24px",
        background: "white",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        borderRadius: "8px",
      }}
    >
      <div style={{ display: "flex", marginBottom: "16px" }}>
        <button
          onClick={() => setActiveTab("accounts")}
          style={{
            padding: "8px 16px",
            marginRight: "8px",
            background: activeTab === "accounts" ? "#3182CE" : "#E2E8F0",
            color: activeTab === "accounts" ? "white" : "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Gerenciar Contas
        </button>
        <button
          onClick={() => setActiveTab("characters")}
          style={{
            padding: "8px 16px",
            background: activeTab === "characters" ? "#3182CE" : "#E2E8F0",
            color: activeTab === "characters" ? "white" : "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Gerenciar Personagens
        </button>
      </div>
      <div>
        {activeTab === "accounts" && <AccountsManager />}
        {activeTab === "characters" && <CharactersManager />}
      </div>
    </div>
  );
};

export default Manager;
