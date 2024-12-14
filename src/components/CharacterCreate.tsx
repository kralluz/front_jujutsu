import React, { useState } from "react";
import { Character } from "../contexts/CharactersContext";
import UnfoldingModal from "./ModalAnimations";

interface CharacterCreateProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (newCharacter: Omit<Character, "id">) => void;
}

const CharacterCreate: React.FC<CharacterCreateProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [newCharacter, setNewCharacter] = useState<Omit<Character, "id">>({
    name: "",
    age: "",
    bio: "",
    profileImage: "",
    image: "",
    powers: [""],
    domainExpansions: {
      name: "",
      description: "",
    },
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setNewCharacter((prev) => ({ ...prev, [name]: value }));
  };

  const handlePowersChange = (index: number, value: string) => {
    const updatedPowers = [...newCharacter.powers];
    updatedPowers[index] = value;
    setNewCharacter((prev) => ({ ...prev, powers: updatedPowers }));
  };

  const addPowerField = () => {
    setNewCharacter((prev) => ({
      ...prev,
      powers: [...prev.powers, ""],
    }));
  };

  const handleCreate = () => {
    onCreate(newCharacter);
    onClose();
  };

  return (
    <UnfoldingModal isOpen={isOpen} onClose={onClose}>
      <div
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          padding: "20px",
          borderRadius: "10px",
          maxWidth: "600px",
          margin: "auto",
          overflowY: "auto",
          maxHeight: "80vh",
          position: "relative",
        }}
      >
        <h2 style={{ color: "white", textAlign: "center" }}>
          Criar Novo Personagem
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div style={{ flex: "1 1 45%" }}>
            <label style={{ color: "white" }}>Nome:</label>
            <input
              type="text"
              name="name"
              value={newCharacter.name}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </div>

          <div style={{ flex: "1 1 45%" }}>
            <label style={{ color: "white" }}>Idade:</label>
            <input
              type="text"
              name="age"
              value={newCharacter.age}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </div>

          <div style={{ flex: "1 1 100%" }}>
            <label style={{ color: "white" }}>Biografia:</label>
            <textarea
              name="bio"
              value={newCharacter.bio}
              onChange={handleInputChange}
              style={{ ...inputStyle, height: "80px" }}
            />
          </div>

          <div style={{ flex: "1 1 45%" }}>
            <label style={{ color: "white" }}>Imagem do Perfil:</label>
            <input
              type="text"
              name="profileImage"
              value={newCharacter.profileImage}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </div>

          <div style={{ flex: "1 1 45%" }}>
            <label style={{ color: "white" }}>Banner:</label>
            <input
              type="text"
              name="image"
              value={newCharacter.image}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </div>

          <div style={{ flex: "1 1 100%" }}>
            <label style={{ color: "white" }}>Poderes:</label>
            {(newCharacter.powers || []).map((power, index) => (
              <input
                key={index}
                type="text"
                value={power}
                onChange={(e) => handlePowersChange(index, e.target.value)}
                style={inputStyle}
              />
            ))}
            <button
              onClick={addPowerField}
              style={{
                ...cancelButtonStyle,
                marginTop: "10px",
                backgroundColor: "#444",
              }}
            >
              Adicionar Poder
            </button>
          </div>

          <div style={{ flex: "1 1 45%" }}>
            <label style={{ color: "white" }}>Domain Expansion Nome:</label>
            <input
              type="text"
              name="domainName"
              value={newCharacter.domainExpansions.name}
              onChange={(e) =>
                setNewCharacter((prev) => ({
                  ...prev,
                  domainExpansions: {
                    ...prev.domainExpansions,
                    name: e.target.value,
                  },
                }))
              }
              style={inputStyle}
            />
          </div>

          <div style={{ flex: "1 1 45%" }}>
            <label style={{ color: "white" }}>
              Domain Expansion Descrição:
            </label>
            <textarea
              name="domainDescription"
              value={newCharacter.domainExpansions.description}
              onChange={(e) =>
                setNewCharacter((prev) => ({
                  ...prev,
                  domainExpansions: {
                    ...prev.domainExpansions,
                    description: e.target.value,
                  },
                }))
              }
              style={{ ...inputStyle, height: "80px" }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <button onClick={onClose} style={cancelButtonStyle}>
            Cancelar
          </button>
          <button onClick={handleCreate} style={saveButtonStyle}>
            Criar
          </button>
        </div>
      </div>
    </UnfoldingModal>
  );
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  margin: "5px 0",
  backgroundColor: "#1c1c1c",
  color: "white",
  border: "1px solid #444",
  borderRadius: "5px",
};

const cancelButtonStyle: React.CSSProperties = {
  padding: "10px 20px",
  backgroundColor: "#555",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const saveButtonStyle: React.CSSProperties = {
  padding: "10px 20px",
  backgroundColor: "#007BFF",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default CharacterCreate;
