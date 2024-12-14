import React, { useContext, useState } from "react";
import { CharactersContext, Character } from "../contexts/CharactersContext";
import "./Home.css";
import CharacterDetails from "./CharacterDetailsModal";
import CharacterEdit from "./CharacterEdit";

const Home: React.FC = () => {
  const charactersContext = useContext(CharactersContext);

  if (!charactersContext) {
    return <div className="loading">Carregando...</div>;
  }

  const { characters, createCharacter, deleteCharacter, updateCharacter } =
    charactersContext;

  const handleAddCharacter = () => {
    const newCharacter: any = {
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

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );

  const openEdit = (character: Character) => {
    setSelectedCharacter(character);
    setIsEditOpen(true);
  };

  const closeEdit = () => {
    setSelectedCharacter(null);
    setIsEditOpen(false);
  };

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
      <div className="add-button-container">
        <button onClick={handleAddCharacter} className="add-character-button">
          Adicionar Personagem
        </button>
      </div>

      <div
        className="site-introduction"
        style={{
          textAlign: "left",
          margin: "20px 0",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ fontSize: "2rem", color: "#333" }}>
          Bem-vindo à Wiki de Jujutsu Kaisen
        </h2>
        <p style={{ fontSize: "1.2rem", color: "#666" }}>
          Explore informações detalhadas sobre os personagens do anime e mangá
          Jujutsu Kaisen. Navegue pelos perfis dos personagens, descubra suas
          habilidades e histórias.
        </p>
      </div>

      <div className="characters-container">
        {characters.map((character) => (
          <div
            key={character.id}
            className="character-card"
            onClick={() => openDetails(character)}
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

      {selectedCharacter && (
        <>
          <CharacterDetails
            isOpen={isDetailsOpen}
            onClose={closeDetails}
            character={selectedCharacter}
            onEdit={() => openEdit(selectedCharacter)}
            onDelete={() => {
              deleteCharacter(selectedCharacter.id as number);
              closeDetails();
            }}
          />
          <CharacterEdit
            isOpen={isEditOpen}
            onClose={closeEdit}
            character={selectedCharacter}
            onSave={(id, updatedCharacter) => {
              updateCharacter(id, updatedCharacter);
              closeEdit();
            }}
          />
        </>
      )}
    </div>
  );
};

export default Home;
