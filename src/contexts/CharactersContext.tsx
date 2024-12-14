// src/contexts/CharactersContext.tsx
import React, { createContext, useState, ReactNode } from "react";

interface DomainExpansion {
  name: string;
  description: string;
}

export interface Character {
  id: number;
  name: string;
  age: number | string;
  bio: string;
  profileImage: string;
  image: string;
  powers: string[];
  domainExpansions: DomainExpansion;
}

interface CharactersContextType {
  characters: Character[];
  createCharacter: (character: Omit<Character, "id">) => void;
  readCharacters: () => Character[];
  updateCharacter: (
    id: number,
    updatedCharacter: Partial<Omit<Character, "id">>
  ) => void;
  deleteCharacter: (id: number) => void;
}

export const CharactersContext = createContext<
  CharactersContextType | undefined
>(undefined);

interface CharactersProviderProps {
  children: ReactNode;
}

const initialCharacters: Character[] = [
  {
    id: 1,
    name: "Aoi Todo",
    age: 18,
    bio: "Aoi Todo é um homem conhecido como Feiticeiro Jujutsu, Feiticeiro de Grau 1..",
    profileImage:
      "https://www.siliconera.com/wp-content/uploads/2023/11/aoi-todo-hanami-and-jogo-will-be-jujutsu-kaisen-cursed-clash-characters.jpeg?fit=1200%2C675",
    image:
      "https://criticalhits.com.br/wp-content/uploads/2023/12/latest-1-696x392.jpg",
    powers: [
      "Troca de posição com um inimigo, aliado ou objeto, desde que o objeto ou pessoa esteja embuída com energia amaldiçoada",
      "Força física acima da média e proeficiência em artes marciais.",
    ],
    domainExpansions: {
      name: "Não possui",
      description: "",
    },
  },
  // Adicione outros personagens conforme necessário
];

export const CharactersProvider: React.FC<CharactersProviderProps> = ({
  children,
}) => {
  const [characters, setCharacters] = useState<Character[]>(initialCharacters);

  const createCharacter = (character: Omit<Character, "id">) => {
    const newCharacter: Character = { id: Date.now(), ...character };
    setCharacters([...characters, newCharacter]);
  };

  const readCharacters = (): Character[] => {
    return characters;
  };

  const updateCharacter = (
    id: number,
    updatedCharacter: Partial<Omit<Character, "id">>
  ) => {
    setCharacters(
      characters.map((char) =>
        char.id === id ? { ...char, ...updatedCharacter } : char
      )
    );
  };

  const deleteCharacter = (id: number) => {
    setCharacters(characters.filter((char) => char.id !== id));
  };

  return (
    <CharactersContext.Provider
      value={{
        characters,
        createCharacter,
        readCharacters,
        updateCharacter,
        deleteCharacter,
      }}
    >
      {children}
    </CharactersContext.Provider>
  );
};
