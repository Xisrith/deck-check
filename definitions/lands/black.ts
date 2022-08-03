import { Permanent } from '../../card';
import Mana from '../../mana';

export const cabalCoffers = new Permanent({
    name: 'Cabal Coffers',
    types: ['Land'],
    mana: new Mana({ black: 1 }),
    actualManaValue: 1,
});
export const urborgTombOfYawgmoth = new Permanent({
    name: 'Urborg, Tomb of Yawgmoth',
    types: ['Land'],
    mana: new Mana({ black: 1 }),
    actualManaValue: 1,
});