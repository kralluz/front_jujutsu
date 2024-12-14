import React, { useState, useEffect } from "react";
import { Character } from "../contexts/CharactersContext";
import UnfoldingModal from "./ModalAnimations";

interface CharacterEditProps {
  isOpen: boolean;
  onClose: () => void;
  character: Character | null;
  onSave: (
    id: number,
    updatedCharacter: Partial<Omit<Character, "id">>
  ) => void;
}

const CharacterEdit: React.FC<CharacterEditProps> = ({
  isOpen,
  onClose,
  character,
  onSave,
}) => {
  const [editedCharacter, setEditedCharacter] = useState<Partial<Character>>({
    name: "",
    age: "",
    bio: "",
    profileImage: "",
    image: "",
    powers: [],
    domainExpansions: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (character) {
      setEditedCharacter({
        name: character.name || "",
        age: character.age || "",
        bio: character.bio || "",
        profileImage: character.profileImage || "",
        image: character.image || "",
        powers: character.powers || [],
        domainExpansions: character.domainExpansions || {
          name: "",
          description: "",
        },
      });
    }
  }, [character]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setEditedCharacter((prev) => ({ ...prev, [name]: value }));
  };

  const handlePowersChange = (index: number, value: string) => {
    const updatedPowers = [...(editedCharacter.powers || [])];
    updatedPowers[index] = value;
    setEditedCharacter((prev) => ({ ...prev, powers: updatedPowers }));
  };

  const handleSave = () => {
    if (character?.id) {
      onSave(character.id, editedCharacter);
      onClose();
    }
  };

  if (!character) return null;

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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            padding: "10px ",
            borderRadius: "10px",
            backdropFilter: "blur(70px)",
            background: "rgba(255, 255, 255, 0.3)",
            zIndex: 10,
          }}
        >
          <button onClick={onClose} style={cancelButtonStyle}>
            Cancelar
          </button>
          <button onClick={handleSave} style={saveButtonStyle}>
            Salvar
          </button>
        </div>

        <h2 style={{ color: "white", textAlign: "center", marginTop: "20px" }}>Editar Personagem</h2>

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
              value={editedCharacter.name || ""}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </div>

          <div style={{ flex: "1 1 45%" }}>
            <label style={{ color: "white" }}>Idade:</label>
            <input
              type="text"
              name="age"
              value={editedCharacter.age || ""}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </div>

          <div style={{ flex: "1 1 100%" }}>
            <label style={{ color: "white" }}>Biografia:</label>
            <textarea
              name="bio"
              value={editedCharacter.bio || ""}
              onChange={handleInputChange}
              style={{ ...inputStyle, height: "80px" }}
            />
          </div>

          <div style={{ flex: "1 1 45%" }}>
            <label style={{ color: "white" }}>Imagem do Perfil:</label>
            <input
              type="text"
              name="profileImage"
              value={editedCharacter.profileImage || ""}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </div>

          <div style={{ flex: "1 1 45%" }}>
            <label style={{ color: "white" }}>Banner:</label>
            <input
              type="text"
              name="image"
              value={editedCharacter.image || ""}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </div>

          <div style={{ flex: "1 1 100%" }}>
            <label style={{ color: "white" }}>Poderes:</label>
            {(editedCharacter.powers || []).map((power, index) => (
              <input
                key={index}
                type="text"
                value={power}
                onChange={(e) => handlePowersChange(index, e.target.value)}
                style={inputStyle}
              />
            ))}
          </div>

          <div style={{ flex: "1 1 45%" }}>
            <label style={{ color: "white" }}>Domain Expansion Nome:</label>
            <input
              type="text"
              name="domainName"
              value={editedCharacter.domainExpansions?.name || ""}
              onChange={(e) =>
                setEditedCharacter((prev) => ({
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
            <label style={{ color: "white" }}>Domain Expansion Descrição:</label>
            <textarea
              name="domainDescription"
              value={editedCharacter.domainExpansions?.description || ""}
              onChange={(e) =>
                setEditedCharacter((prev) => ({
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

export default CharacterEdit;
