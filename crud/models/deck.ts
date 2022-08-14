export type DeckFormat = "EDH" | "Modern";

export interface Deck {
    id: string;
    format: "EDH" | "Modern";
    cards: string[];
}