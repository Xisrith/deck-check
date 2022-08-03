import { Permanent } from '../../card';
import Mana from '../../mana';

export const fieldOfTheDead = new Permanent({
    name: 'Field of the Dead',
    types: ['Land'],
    mana: new Mana({ colorless: 1 }),
})
export const highMarket = new Permanent({
    name: 'High Market',
    types: ['Land'],
    mana: new Mana({ colorless: 1 }),
})