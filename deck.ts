import { Card } from './card';

type Log = typeof console.log;

export default class Deck {
    private readonly _log: Log;

    readonly cards: Card[] = [];

    constructor(cards: Card[], log?: Log) {
        this._log = log ?? (() => {});

        this.cards = cards.map(c => new Card(c));
    }

    /**
     * Removes the top card of the deck.
     * @param count Number of cards to draw (default is 1).
     * @returns The cards removed from the deck.
     */
    draw = (count: number = 1): Card[] => {
        const draw = this.cards.splice(0, count);
        this._log(`[Deck] Drew ${count} card(s) (${draw.map(d => d.name).join(', ')})`);
        return draw;
    }

    /**
     * Searches the deck for a copy of a card with the given name,
     * removes the card, then shuffles the deck.
     * @param name Name of card to fetch.
     * @returns The fetched card, if found, otherwise null.
     */
    fetch = (predicate: (card: Card) => boolean): Card | null => {
        const fetchIndex = this.cards.findIndex(predicate);
        if (fetchIndex === -1) {
            return null;
        }
        const fetch = this.cards.splice(fetchIndex, 1)[0];
        this._log(`[Deck] Fetched card (${fetch.name})`);
        return fetch;
    }

    /**
     * Shuffles the deck.
     */
    shuffle = (): void => {
        // Use the Fisher-Yates / Knuth algorithm.
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [this.cards[currentIndex], this.cards[randomIndex]] = [this.cards[randomIndex], this.cards[currentIndex]];
        }
        
        this._log('[Deck] Shuffled')
    };
}