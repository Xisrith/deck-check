import { Permanent } from '../../card';
import Mana from '../../mana';

export const dimirLocket = new Permanent({
    cost: new Mana({ generic: 2 }),
    name: 'Dimir Locket',
    types: ['Artifact'],
    mana: new Mana({ generic: 1 }),
    actualManaValue: 1,
    potentialManaValue: 1,
});

export const dimirSignet = new Permanent({
    cost: new Mana({ generic: 2 }),
    name: 'Dimir Signet',
    types: ['Artifact'],
    mana: new Mana({ generic: 1 }),
    actualManaValue: 1,
    potentialManaValue: 1,
});

export const talismanOfDominance = new Permanent({
    cost: new Mana({ generic: 2 }),
    name: 'Talisman of Dominance',
    types: ['Artifact'],
    mana: new Mana({ generic: 1 }),
    actualManaValue: 1,
    potentialManaValue: 1,
});