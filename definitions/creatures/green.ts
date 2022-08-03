import { Card, Permanent } from '../../card';
import Mana from '../../mana';

export const sakuraTribeElder = new Card({
    cost: new Mana({ green: 1, generic: 1 }),
    name: 'Sakura-Tribe Elder',
    mana: new Mana({ generic: 1 }),
    actualManaValue: 0,
    potentialManaValue: 1,
    entersTapped: () => true,
    resolve: (game) => {
        const isBasicLand = (card: Card) => card.types.includes('Basic') && card.types.includes('Land');
        // Fetch the basics, preferring forests since they usually do better at ramping.
        const basic = game.deck.fetch(c => isBasicLand(c) && c.types.includes('Forest'))
            ?? game.deck.fetch(c => isBasicLand(c));

        // Put the land onto the battlefield tapped.
        if (basic) {
            const permanent = new Permanent(basic);
            permanent.tapped = true;
            game.board.permanents.push(permanent);
        }
    },
});

export const woodElves = new Card({
    cost: new Mana({ green: 1, generic: 1 }),
    name: 'Wood Elves',
    mana: new Mana({ generic: 1 }),
    actualManaValue: 1,
    potentialManaValue: 1,
    entersTapped: () => true,
    resolve: (game) => {
        const isForest = (card: Card) => card.types.includes('Land') && card.types.includes('Forest');
        const isNonForest = (card: Card) => card.types.includes('Land')
            && (
                card.types.includes('Plains')
                || card.types.includes('Island')
                || card.types.includes('Swamp')
                || card.types.includes('Mountain')
            );

        // Fetch the forest, preferring biomes / triomes.
        const land = game.deck.fetch(c => isForest(c) && isNonForest(c))
            ?? game.deck.fetch(c => isForest(c));

        // Put the land onto the battlefield.
        if (land) {
            const permanent = new Permanent(land);
            game.board.permanents.push(permanent);
        }
    },
});