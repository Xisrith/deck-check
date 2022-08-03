import { Permanent } from '../../card';
import Mana from '../../mana';

export const plains = new Permanent({
    name: 'Plains',
    types: ['Basic', 'Land', 'Plains'],
    mana: new Mana({ white: 1 }),
    actualManaValue: 1,
});
export const island = new Permanent({
    name: 'Island',
    types: ['Basic', 'Land', 'Island'],
    mana: new Mana({ blue: 1 }),
    actualManaValue: 1,
});
export const swamp = new Permanent({
    name: 'Swamp',
    types: ['Basic', 'Land', 'Swamp'],
    mana: new Mana({ black: 1 }),
    actualManaValue: 1,
});
export const mountain = new Permanent({
    name: 'Mountain',
    types: ['Basic', 'Land', 'Mountain'],
    mana: new Mana({ red: 1 }),
    actualManaValue: 1,
});
export const forest = new Permanent({
    name: 'Forest',
    types: ['Basic', 'Land', 'Forest'],
    mana: new Mana({ green: 1 }),
    actualManaValue: 1,
});