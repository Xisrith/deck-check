import { Permanent } from '../../card';
import Mana from '../../mana';

export const charcoalDiamond = new Permanent({
    cost: new Mana({ generic: 2 }),
    name: 'Charcoal Diamond',
    types: ['Artifact'],
    mana: new Mana({ black: 1 }),
    actualManaValue: 0,
    potentialManaValue: 1,
    entersTapped: () => true,
});

export const crowdedCrypt = new Permanent({
    cost: new Mana({ black: 1, generic: 2 }),
    name: 'Charcoal Diamond',
    types: ['Artifact'],
    actualManaValue: 1,
    potentialManaValue: 1,
    mana: new Mana({ black: 1 }),
});