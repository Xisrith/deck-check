import { Card, CardPermutation, Permanent } from './card';
import Deck from './deck';
import Mana from './mana';

type Log = typeof console.log;

/**
 * Represents the ability for the current board state to make certain plays.
 */
export class Board {
    readonly permanents: Permanent[] = [];

    /** Get the mana available to be tapped. */
    getAvailableMana = (): Mana => {
        return this.permanents
            .filter(p => !p.tapped && p.mana.toValue() > 0)
            .map(p => p.mana)
            .reduce((sum, perm) => sum.addMana(perm), new Mana());
    }

    getPotentialMana = (): Mana => {
        return this.permanents
            .filter(p => p.mana.toValue() > 0)
            .map(p => p.mana)
            .reduce((sum, perm) => sum.addMana(perm), new Mana());
    }

    /** Untap all permanents. */
    untap = () => {
        this.permanents.forEach(p => p.tapped = false);
    }
}

export class Game {
    private readonly _log: Log;

    readonly board: Board;
    readonly deck: Deck;
    readonly hand: Card[];

    readonly plays: { lands: number, ramps: number }[] = [];

    constructor(deck: Card[], log: typeof console.log = () => {}) {
        this._log = log;

        this.board = new Board();
        this.deck = new Deck(deck, this._log);
        this.hand = [];

        this.deck.shuffle();
        this.hand.push(...this.deck.draw(7));
    }

    untap = () => {
        this.board.untap();
    }

    draw = () => {
        this.hand.push(...this.deck.draw(1));

    }

    main = () => {
        const play = { lands: 0, ramps: 0 };

        // Try to hit our land drop.
        const lands = this.hand
            .filter(c => c.isLand())
            .sort(this._compareLands);
        const tappedIndex = lands.findIndex(l => l.entersTapped(this));
        const untappedIndex = lands.findIndex(l => !l.entersTapped(this));

        const tappedMana = this.board.getAvailableMana().toValue();
        const untappedMana = tappedMana + (untappedIndex === -1 ? 0 : lands[untappedIndex].actualManaValue);
        const rampPlays = this._discoverRampPlays(this.hand, untappedMana);

        const topTapped = rampPlays.findIndex(p => p.initialCost <= tappedMana && p.totalCost <= tappedMana);
        const topUntapped = rampPlays.findIndex(p => p.initialCost <= untappedMana && p.totalCost <= untappedMana);
        const preferUntapped = (rampPlays[topUntapped]?.potentialMana ?? 0) > (rampPlays[topTapped]?.potentialMana ?? 0);

        // Land drop.
        if (preferUntapped) {
            // Prefer playing the untapped land if it will give us a better ramp permutation.
            if (untappedIndex !== -1) {
                this.play(lands[untappedIndex]);
                play.lands++;
            } else if(tappedIndex !== -1) {
                this.play(lands[tappedIndex]);
                play.lands++;
            }
        } else {
            // Prefer playing the tapped land if we don't need the untapped land for ramp.
            if(tappedIndex !== -1) {
                this.play(lands[tappedIndex]);
                play.lands++;
            } else if (untappedIndex !== -1) {
                this.play(lands[untappedIndex]);
                play.lands++;
            }
        }

        // Ramp.
        if (preferUntapped) {
            if (topUntapped !== -1) {
                rampPlays[topUntapped].cards.forEach(card => this.play(card));
                play.ramps += rampPlays[topUntapped].cards.length;
            }
        } else {
            if (topTapped !== -1) {
                rampPlays[topTapped].cards.forEach(card => this.play(card));
                play.ramps += rampPlays[topTapped].cards.length;
            }
        }

        this.plays.push(play);
    }

    play = (card: Card) => {
        this._log(`[Game] Play card (${card.name})`);

        // Remove the card from the hand (if found).
        const handIndex = this.hand.findIndex(c => c.name === card.name);
        if (handIndex !== -1) {
            this.hand.splice(handIndex, 1);
        }
        
        // Resolve the card.
        card.resolve(this);
    }

    step = () => {
        this.untap();
        this.draw();
        this.main();
    }

    private _compareLands = (a: Card, b: Card): number => {
        const aTapped = a.entersTapped(this);
        const bTapped = b.entersTapped(this);

        // If neither land enters tapped, or both enter tapped,
        // it doesn't matter what order we play them in.
        if (aTapped === bTapped) {
            return 0;
        }

        // If either land enters tapped, it should be played second.
        return aTapped ? 1 : -1;
    }

    /**
     * Compare two potential ramp plays. Priorities include:
     * - Gaining the most mana possible this turn
     * - Playing the most tapped mana sources as possible this turn
     */
    private _compareRampPlays = (a: CardPermutation, b: CardPermutation): number => {
        return a.potentialMana - b.potentialMana;
    }

    /**
     * Discover which ramp plays are possible.
     */
    private _discoverRampPlays = (cards: Card[], mana: number) => {
        // Remove any cards that aren't ramp from the list.
        const ramps = cards.filter(c => c.potentialManaValue > 0 && !c.types.includes('Land'));
        const permutations = this._discoverCardPermutations(ramps).filter(p => p.initialCost <= mana && p.totalCost <= mana).sort(this._compareRampPlays);
        return permutations;
    }

    private _discoverCardPermutations = (cards: Card[]): CardPermutation[] => {
        return this._discoverPermutations(cards.length).map(permutation => new CardPermutation(permutation.map(index => cards[index])));
    }

    /** TODO: Make this iterative to run faster. */
    private _discoverPermutations = (count: number, depth: number = 0, permutations: number[][] = []): number[][] => {
        const newPermutations: number[][] = [];
        for (let i = 0; i < count; i++) {
            if (depth === 0) {
                newPermutations.push([i]);
            } else {
                permutations.filter(p => p.length === depth).forEach(p => {
                    if (!p.includes(i)) {
                        newPermutations.push([...p, i]);
                    }
                })
            }
        }
        if (newPermutations.length > 0) {
            return this._discoverPermutations(count, depth + 1, [...permutations, ...newPermutations]);
        }
        return permutations;
    }
}