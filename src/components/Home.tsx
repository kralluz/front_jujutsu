// src/components/Home.tsx
import React, { useContext, useState } from "react";
import { CharactersContext, Character } from "../contexts/CharactersContext";
import "./Home.css";
import CharacterDetails from "./CharacterDetailsModal";

const Home: React.FC = () => {
  const charactersContext = useContext(CharactersContext);

  if (!charactersContext) {
    return <div className="loading">Carregando...</div>;
  }

  const { characters, createCharacter } = charactersContext;

  const handleAddCharacter = () => {
    const newCharacter = {
      name: "Novo Personagem",
      age: "Desconhecido",
      bio: "Biografia do novo personagem",
      profileImage: "https://via.placeholder.com/150",
      image: "https://via.placeholder.com/300",
      powers: ["Poder desconhecido"],
      domainExpansions: {
        name: "Nenhum",
        description: "",
      },
    };
    createCharacter(newCharacter);
  };

  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );

  const openDetails = (character: Character) => {
    setSelectedCharacter(character);
    setIsDetailsOpen(true);
  };

  const closeDetails = () => {
    setSelectedCharacter(null);
    setIsDetailsOpen(false);
  };

  return (
    <div className="home-container">
      <h1 className="title">Personagens</h1>
      <div className="add-button-container">
        <button onClick={handleAddCharacter} className="add-character-button">
          Adicionar Personagem
        </button>
      </div>

      <div className="characters-container">
        {characters.map((character) => (
          <div
            key={character.id}
            className="character-card"
            onClick={() => openDetails(character)}
            style={{ cursor: "pointer" }} // Indica que o cartão é clicável
          >
            <div className="banner">
              <img
                src={character.image}
                alt={`${character.name} Banner`}
                className="banner-image"
              />
              <img
                src={character.profileImage}
                alt={`${character.name} Profile`}
                className="profile-image"
              />
              <div className="character-info">
                <h2 className="character-name">{character.name}</h2>
                <p className="character-age">
                  <strong>Idade:</strong> {character.age}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Detalhes do Personagem */}
      <CharacterDetails
        isOpen={isDetailsOpen}
        onClose={closeDetails}
        character={selectedCharacter}
      />
    </div>
  );
};

export default Home;
