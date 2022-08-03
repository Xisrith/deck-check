import { Permanent } from '../../card';
import Mana from '../../mana';

export const skyDiamond = new Permanent({
    cost: new Mana({ generic: 2 }),
    name: 'Sky Diamond',
    types: ['Artifact'],
    mana: new Mana({ blue: 1 }),
    actualManaValue: 0,
    potentialManaValue: 1,
    entersTapped: () => true,
});