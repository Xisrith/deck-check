import { Card, Permanent } from '../../card';
import Mana from '../../mana';

export const arcaneSignet = new Permanent({
    cost: new Mana({ generic: 2 }),
    name: 'Arcane Signet',
    types: ['Artifact'],
    mana: new Mana({ generic: 1 }),
    actualManaValue: 1,
    potentialManaValue: 1,
});

export const commandersSphere = new Permanent({
    cost: new Mana({ generic: 3 }),
    name: 'Commander\'s Sphere',
    types: ['Artifact'],
    mana: new Mana({ generic: 1 }),
    actualManaValue: 1,
    potentialManaValue: 1,
});

export const moonsilverKey = new Card({
    cost: new Mana({ generic: 3 }), 
    name: 'Moonsilver Key',
    types: ['Artifact'],
    mana: new Mana({ generic: 1 }),
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

export const wayfarersBauble = new Card({
    cost: new Mana({ generic: 3 }), 
    name: 'Wayfarer\'s Bauble',
    types: ['Artifact'],
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