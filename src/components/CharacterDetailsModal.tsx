import React from "react";
import { Character } from "../contexts/CharactersContext";
import UnfoldingModal from "./ModalAnimations";

interface CharacterDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    character: Character | null;
    onEdit: () => void;
    onDelete: () => void;
}

const CharacterDetails: React.FC<CharacterDetailsProps> = ({
    isOpen,
    onClose,
    character,
    onEdit,
    onDelete,
}) => {
    if (!character) return null;

    return (
        <UnfoldingModal isOpen={isOpen} onClose={onClose}>
            <div
                style={{
                    padding: "20px",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${character.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "#fff",
                    maxWidth: "600px",
                    margin: "0 auto",
                    overflowY: "auto",
                    maxHeight: "80vh",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", marginBottom: "20px", flexWrap: "wrap" }}>
                    <img
                        src={character.profileImage}
                        alt={`${character.name} Profile`}
                        style={{
                            width: "80px",
                            height: "80px",
                            borderRadius: "8px",
                            marginRight: "20px",
                            marginBottom: "10px",
                        }}
                    />
                    <div style={{ flex: "1 1 200px" }}>
                        <h2
                            style={{
                                fontSize: "1.8rem",
                                margin: 0,
                                fontWeight: "bold",
                            }}
                        >
                            {character.name}
                        </h2>
                        <p style={{ fontSize: "1.2rem", margin: "5px 0" }}>
                            <strong>Idade:</strong> {character.age ?? "Não informada"}
                        </p>
                    </div>
                </div>

                <div style={{ marginBottom: "20px" }}>
                    <p style={{ fontSize: "1rem", lineHeight: "1.5" }}>
                        <strong>Biografia:</strong> {character.bio || "Sem biografia disponível."}
                    </p>
                </div>

                <div style={{ marginBottom: "20px" }}>
                    <h3
                        style={{
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            marginBottom: "10px",
                        }}
                    >
                        Poderes
                    </h3>
                    <ul style={{ fontSize: "1rem", lineHeight: "1.5", marginLeft: "20px" }}>
                        {character.powers?.length ? (
                            character.powers.map((power, index) => (
                                <li key={index} style={{ marginBottom: "5px" }}>
                                    {power}
                                </li>
                            ))
                        ) : (
                            <p>Sem poderes registrados.</p>
                        )}
                    </ul>
                </div>

                <div style={{ marginBottom: "20px" }}>
                    <h3
                        style={{
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            marginBottom: "10px",
                        }}
                    >
                        Domain Expansion
                    </h3>
                    <p style={{ fontSize: "1rem", lineHeight: "1.5" }}>
                        <strong>Nome:</strong> {character.domainExpansions?.name || "Desconhecido"}
                    </p>
                    {character.domainExpansions?.description && (
                        <p style={{ fontSize: "1rem", lineHeight: "1.5" }}>
                            {character.domainExpansions.description}
                        </p>
                    )}
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "10px",
                        marginTop: "20px",
                        flexWrap: "wrap",
                    }}
                >
                    <button
                        onClick={onEdit}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#28a745",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "1rem",
                            fontWeight: "bold",
                            flex: "1 1 100px",
                        }}
                    >
                        Editar
                    </button>
                    <button
                        onClick={onDelete}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#dc3545",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "1rem",
                            fontWeight: "bold",
                            flex: "1 1 100px",
                        }}
                    >
                        Excluir
                    </button>
                </div>
            </div>
        </UnfoldingModal>
    );
};

export default CharacterDetails;
