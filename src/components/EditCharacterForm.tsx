// src/components/EditCharacterForm.tsx
import React, { useState, useContext } from "react";
import { CharactersContext, Character } from "../contexts/CharactersContext";
import "./EditCharacterForm.css";

interface EditCharacterFormProps {
  character: Character;
  onClose: () => void;
}

const EditCharacterForm: React.FC<EditCharacterFormProps> = ({
  character,
  onClose,
}) => {
  const charactersContext = useContext(CharactersContext);

  const [formData, setFormData] = useState<Omit<Character, "id">>({
    name: character.name,
    age: character.age,
    bio: character.bio,
    profileImage: character.profileImage,
    image: character.image,
    powers: [...character.powers],
    domainExpansions: { ...character.domainExpansions },
  });

  const [powerInput, setPowerInput] = useState<string>("");

  if (!charactersContext) {
    return null;
  }

  const { updateCharacter } = charactersContext;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("domainExpansions.")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        domainExpansions: {
          ...formData.domainExpansions,
          [field]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAddPower = () => {
    if (powerInput.trim() !== "") {
      setFormData({
        ...formData,
        powers: [...formData.powers, powerInput.trim()],
      });
      setPowerInput("");
    }
  };

  const handleRemovePower = (index: number) => {
    const updatedPowers = formData.powers.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      powers: updatedPowers,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCharacter(character.id, formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Editar Personagem</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Idade:
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Biografia:
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Imagem de Perfil (URL):
            <input
              type="text"
              name="profileImage"
              value={formData.profileImage}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Imagem (URL):
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </label>
          <div className="powers-section">
            <label>Poderes:</label>
            <div className="powers-input">
              <input
                type="text"
                value={powerInput}
                onChange={(e) => setPowerInput(e.target.value)}
                placeholder="Novo poder"
              />
              <button type="button" onClick={handleAddPower}>
                Adicionar
              </button>
            </div>
            <ul>
              {formData.powers.map((power, index) => (
                <li key={index}>
                  {power}
                  <button
                    type="button"
                    onClick={() => handleRemovePower(index)}
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="domain-expansion-section">
            <label>
              Expansão de Domínio - Nome:
              <input
                type="text"
                name="domainExpansions.name"
                value={formData.domainExpansions.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Expansão de Domínio - Descrição:
              <textarea
                name="domainExpansions.description"
                value={formData.domainExpansions.description}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="form-actions">
            <button type="submit">Salvar</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCharacterForm;
