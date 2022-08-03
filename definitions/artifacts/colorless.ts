import { Permanent } from '../../card';
import Mana from '../../mana';

export const solRing = new Permanent({
    cost: new Mana({ generic: 1 }),
    name: 'Sol Ring',
    types: ['Artifact'],
    mana: new Mana({ colorless: 2 }),
    actualManaValue: 2,
    potentialManaValue: 2,
});

export const thoughtVessel = new Permanent({
    cost: new Mana({ generic: 2 }),
    name: 'Thought Vessel',
    types: ['Artifact'],
    mana: new Mana({ colorless: 1 }),
    actualManaValue: 1,
    potentialManaValue: 1,
})