import { Game } from './game';
import Mana from './mana';

export class Card {
    // Card properties.
    cost: Mana = new Mana();
    name: string = '';
    permanent: boolean = true;
    types: string[] = [];

    // Card behaviors.
    entersTapped: (game: Game) => boolean = (_) => false;
    resolve: (game: Game) => void = (_) => {};
    mana: Mana = new Mana();

    /** The mana this source can provide this turn. Used to decide what ramp plays are possible. */
    actualManaValue: number = 0;
    /** The mana this source can provide next turn. Used to decide what ramp play is optimal. */
    potentialManaValue: number = 0;

    constructor(init?: Partial<Card>) {
        Object.assign(this, init);
    }

    isLand = (): boolean => {
        return this.types.includes('Land');
    }

    manaDelta = (): number => {
        return this.mana.toValue() - this.cost.toValue();
    }

    static createLands = (name: string, mana: string, count: number = 1): Card[] => {
        const cards = [] as Card[];
        for (let i = 0; i < count; i++) {
            cards.push(new Permanent({
                cost: new Mana(),
                name,
                types: ['Land'],
                mana: Mana.fromString(mana),
            }));
        }
        return cards;
    }

    static createSpell = (name: string, cost: string, types: string[], mana: string, count: number = 1): Card[] => {
        const cards = [] as Card[];
        for (let i = 0; i < count; i++) {
            cards.push(new Card({
                cost: Mana.fromString(cost),
                name,
                types,
                mana: Mana.fromString(mana),
            }));
        }
        return cards;
    }
}

export class CardPermutation {
    public cards: Card[];
    public initialCost: number;
    public totalCost: number;
    public potentialMana: number;

    constructor (cards: Card[]) {
        this.cards = cards;
        this.initialCost = cards[0].cost.toValue();
        this.totalCost = 0;
        this.potentialMana = 0;
        cards.forEach(card => {
            this.totalCost += card.cost.toValue() - card.actualManaValue;
            this.potentialMana += card.potentialManaValue;
        });
    }
}

/**
 * Extension of card that auto implements resolution logic
 * to move the card to the board when resolved.
 */
export class Permanent extends Card {
    tapped: boolean = false;

    constructor(init?: Partial<Permanent>) {
        super(init);

        const resolve = this.resolve;
        this.resolve = (game: Game) => {
            this.tapped = this.entersTapped(game);
            game.board.permanents.push(this);
            resolve(game);
        }
    }
}