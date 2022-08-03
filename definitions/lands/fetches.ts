import { Card, Permanent } from '../../card';
import Mana from '../../mana';

export const aridMesa = new Card({
    name: 'Arid Mesa',
    types: ['Land'],
    mana: new Mana({ generic: 1 }),
    actualManaValue: 1,
    potentialManaValue: 1,
    entersTapped: () => false,
    resolve: (game) => {
        const fetch = game.deck.fetch(c => c.types.includes('Land') && (c.types.includes('Plains') || c.types.includes('Mountain')));
        if (fetch) {
            const permanent = new Permanent(fetch);
            game.board.permanents.push(permanent);
        }
    },
});

export const evolvingWilds = new Card({
    name: 'Evolving Wilds',
    types: ['Land'],
    mana: new Mana({ colorless: 1 }),
    actualManaValue: 0,
    potentialManaValue: 1,
    entersTapped: () => true,
    resolve: (game) => {
        const fetch = game.deck.fetch(c => c.types.includes('Basic') && c.types.includes('Land'));
        if (fetch) {
            const permanent = new Permanent(fetch);
            permanent.tapped = true;
            game.board.permanents.push(permanent);
        }
    },
});

export const fabledPassage = new Card({
    name: 'Fabled Passage',
    types: ['Land'],
    mana: new Mana({ colorless: 1 }),
    actualManaValue: 1,
    potentialManaValue: 1,
    entersTapped: (game) => {
        return game.board.permanents.filter(p => p.isLand()).length < 3;
    },
    resolve: (game) => {
        const fetch = game.deck.fetch(c => c.types.includes('Basic') && c.types.includes('Land'));
        if (fetch) {
            const permanent = new Permanent(fetch);
            permanent.tapped = game.board.permanents.filter(p => p.isLand()).length < 3;
            game.board.permanents.push(permanent);
        }
    },
});

export const windsweptHeath = new Card({
    name: 'Windswept Heath',
    types: ['Land'],
    mana: new Mana({ generic: 1 }),
    entersTapped: () => false,
    resolve: (game) => {
        const fetch = game.deck.fetch(c => c.types.includes('Land') && (c.types.includes('Plains') || c.types.includes('Forest')));
        if (fetch) {
            const permanent = new Permanent(fetch);
            game.board.permanents.push(permanent);
        }
    },
});

export const woodedFoothills = new Card({
    name: 'Wooded Foothills',
    types: ['Land'],
    mana: new Mana({ generic: 1 }),
    entersTapped: () => false,
    resolve: (game) => {
        const fetch = game.deck.fetch(c => c.types.includes('Land') && (c.types.includes('Mountain') || c.types.includes('Forest')));
        if (fetch) {
            const permanent = new Permanent(fetch);
            game.board.permanents.push(permanent);
        }
    },
});