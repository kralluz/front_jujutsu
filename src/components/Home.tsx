// src/components/Home.tsx
import React, { useContext } from "react";
import { CharactersContext } from "../contexts/CharactersContext";
import CharacterCard from "./CharacterCard";
import CharactersManager from "./CharactersManager";
// import "./Home.css";

const Home: React.FC = () => {
  const charactersContext = useContext(CharactersContext);

  if (!charactersContext) {
    return <div>Carregando...</div>;  
  }

  const { characters } = charactersContext;

  return (
    <div className="home-container">
      <h1>Personagens</h1>
      <CharactersManager />
      <div className="cards-container">
        {characters.map((char) => (
          <CharacterCard key={char.id} character={char} />
        ))}
      </div>
    </div>
  );
};

export default Home;
