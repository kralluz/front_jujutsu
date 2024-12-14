    // src/components/CharacterDetails.tsx
    import React from "react";
    import { Character } from "../contexts/CharactersContext";
    import UnfoldingModal from "./ModalAnimations";
    import "./CharacterDetails.css"; // Ensure this path is correct based on your project structure
    interface CharacterDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    character: Character | null;
    }

    const CharacterDetails: React.FC<CharacterDetailsProps> = ({
    isOpen,
    onClose,
    character,
    }) => {
    if (!character) return null;

    return (
        <UnfoldingModal isOpen={isOpen} onClose={onClose}>
        <div className="character-details">
            <h2>{character.name}</h2>
            <img
            src={character.profileImage}
            alt={`${character.name} Profile`}
            className="character-profile-image"
            />
            <p>
            <strong>Idade:</strong> {character.age}
            </p>
            <p>
            <strong>Biografia:</strong> {character.bio}
            </p>
            <p>
            <strong>Poderes:</strong>
            </p>
            <ul>
            {character.powers.map((power, index) => (
                <li key={index}>{power}</li>
            ))}
            </ul>
            <p>
            <strong>Domain Expansion:</strong> {character.domainExpansions.name}
            </p>
            {character.domainExpansions.description && (
            <p>{character.domainExpansions.description}</p>
            )}
            <button onClick={onClose} className="close-modal-button">
            Fechar
            </button>
        </div>
        </UnfoldingModal>
    );
    };

    export default CharacterDetails;
