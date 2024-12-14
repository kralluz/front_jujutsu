// src/components/CharacterCard.tsx
import React, { useState } from "react";
import { Character } from "../contexts/CharactersContext";
import EditCharacterForm from "./EditCharacterForm";
import "./CharacterCard.css";

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <div className="card">
      <img
        src={character.profileImage}
        alt={`${character.name} Profile`}
        className="profile-image"
      />
      <h2>{character.name}</h2>
      <p>
        <strong>Idade:</strong> {character.age}
      </p>
      <p>{character.bio}</p>
      <div className="powers">
        <strong>Poderes:</strong>
        <ul>
          {character.powers.map((power, index) => (
            <li key={index}>{power}</li>
          ))}
        </ul>
      </div>
      <div className="domain-expansion">
        <strong>Expansão de Domínio:</strong>
        <p>{character.domainExpansions.name}</p>
        <p>{character.domainExpansions.description}</p>
      </div>
      <div className="card-actions">
        <button onClick={() => setIsEditing(true)}>Editar</button>
        <button
          onClick={() => {
            console.log("Deletar personagem", character.id);
            // CharactersContext?.deleteCharacter(Number(character.id))
          }}
        >
          Deletar
        </button>
      </div>
      {isEditing && (
        <EditCharacterForm
          character={character}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default CharacterCard;
