import { Card, Permanent } from '../card';
import Mana from '../mana';

export default {
    Basics: {
        Plains: new Permanent({
            name: 'Plains',
            types: ['Basic', 'Land', 'Plains'],
            mana: new Mana({ white: 1 }),
        }),
        Island: new Permanent({
            name: 'Island',
            types: ['Basic', 'Land', 'Island'],
            mana: new Mana({ blue: 1 }),
        }),
        Swamp: new Permanent({
            name: 'Swamp',
            types: ['Basic', 'Land', 'Swamp'],
            mana: new Mana({ black: 1 }),
        }),
        Mountain: new Permanent({
            name: 'Mountain',
            types: ['Basic', 'Land', 'Mountain'],
            mana: new Mana({ red: 1 }),
        }),
        Forest: new Permanent({
            name: 'Forest',
            types: ['Basic', 'Land', 'Forest'],
            mana: new Mana({ green: 1 }),
        }),
    },
    Fetches: {
        EvolvingWilds: new Card({
            name: 'Evolving Wilds',
            types: ['Land'],
            entersTapped: () => true,
            resolve: (game) => {
                const fetch = game.deck.fetch(c => c.types.includes('Basic') && c.types.includes('Land'));
                if (fetch) {
                    const permanent = new Permanent(fetch);
                    permanent.tapped = true;
                    game.board.permanents.push(permanent);
                }
            }
        }),
    },
}