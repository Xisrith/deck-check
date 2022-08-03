import { Card, Permanent } from '../../card';
import Deck from '../../deck';
import Mana from '../../mana';

export const abundantHarvest = new Card({
    cost: new Mana({ green: 1 }),
    name: 'Abundant Harvest',
    mana: new Mana({ generic: 0 }),
    actualManaValue: 0,
    potentialManaValue: 1,
    resolve: (game) => {
        const landIndex = game.deck.cards.findIndex(c => c.types.includes('Land'));

        // Reveal cards from the top of the deck until you reveal a land.
        const draws = game.deck.draw(landIndex);
        const land = game.deck.draw()[0];
        
        // Put the revealed cards on the bottom of the deck in a random order.
        game.deck.cards.push(...(new Deck(draws).shuffle().cards));

        // Put the revealed land into your hand.
        game.hand.push(land);
    },
});

export const cultivate = new Card({
    cost: new Mana({ green: 1, generic: 2 }),
    name: 'Cultivate',
    mana: new Mana({ generic: 1 }),
    actualManaValue: 0,
    potentialManaValue: 2,
    entersTapped: () => true,
    resolve: (game) => {
        const isBasicLand = (card: Card) => card.types.includes('Basic') && card.types.includes('Land');
        // Fetch the basics, preferring forests since they usually do better at ramping.
        const firstBasic = game.deck.fetch(c => isBasicLand(c) && c.types.includes('Forest'))
            ?? game.deck.fetch(c => isBasicLand(c));
        const secondBasic = game.deck.fetch(c => isBasicLand(c) && c.types.includes('Forest'))
            ?? game.deck.fetch(c => isBasicLand(c));

        // Put the first basic onto the battlefield tapped.
        if (firstBasic) {
            const permanent = new Permanent(firstBasic);
            permanent.tapped = true;
            game.board.permanents.push(permanent);
        }

        // Put the second basic into your hand.
        if (secondBasic) {
            game.hand.push(secondBasic);
        }
    }
});

export const farseek = new Card({
    cost: new Mana({ green: 1, generic: 1 }),
    name: 'Farseek',
    mana: new Mana({ generic: 1 }),
    actualManaValue: 0,
    potentialManaValue: 1,
    entersTapped: () => true,
    resolve: (game) => {
        const isNonForest = (card: Card) => card.types.includes('Land')
            && (
                card.types.includes('Plains')
                || card.types.includes('Island')
                || card.types.includes('Swamp')
                || card.types.includes('Mountain')
            );

        // Fetch the non-forest, preferring biomes / triomes that are a forest.
        const land = game.deck.fetch(c => isNonForest(c) && c.types.includes('Forest'))
            ?? game.deck.fetch(c => isNonForest(c));

        // Put the land onto the battlefield tapped.
        if (land) {
            const permanent = new Permanent(land);
            permanent.tapped = true;
            game.board.permanents.push(permanent);
        }
    }
});

export const growthSpasm = new Card({
    cost: new Mana({ green: 1, generic: 2 }),
    name: 'Growth Spasm',
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
    }
});

export const kodamasReach = new Card({
    cost: new Mana({ green: 1, generic: 2 }),
    name: 'kodamasReach',
    mana: new Mana({ generic: 1 }),
    actualManaValue: 0,
    potentialManaValue: 2,
    entersTapped: () => true,
    resolve: (game) => {
        const isBasicLand = (card: Card) => card.types.includes('Basic') && card.types.includes('Land');
        // Fetch the basics, preferring forests since they usually do better at ramping.
        const firstBasic = game.deck.fetch(c => isBasicLand(c) && c.types.includes('Forest'))
            ?? game.deck.fetch(c => isBasicLand(c));
        const secondBasic = game.deck.fetch(c => isBasicLand(c) && c.types.includes('Forest'))
            ?? game.deck.fetch(c => isBasicLand(c));

        // Put the first basic onto the battlefield tapped.
        if (firstBasic) {
            const permanent = new Permanent(firstBasic);
            permanent.tapped = true;
            game.board.permanents.push(permanent);
        }

        // Put the second basic into your hand.
        if (secondBasic) {
            game.hand.push(secondBasic);
        }
    }
});

export const naturesLore = new Card({
    cost: new Mana({ green: 1, generic: 1 }),
    name: 'Nature\'s Lore',
    mana: new Mana({ generic: 1 }),
    actualManaValue: 1,
    potentialManaValue: 1,
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
    }
});

export const threeVisits = new Card({
    cost: new Mana({ green: 1, generic: 1 }),
    name: 'Three Visits',
    mana: new Mana({ generic: 1 }),
    actualManaValue: 1,
    potentialManaValue: 1,
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
    }
});