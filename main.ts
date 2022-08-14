import { Card } from './card';
import Deck from './deck';
import jennieFey from './definitions/decks/jennie-fey';
import rotcleaver from './definitions/decks/rotcleaver';
import { Game } from './game';

for (let i = 99 - jennieFey.length; i > 0; i--) {
    jennieFey.push(new Card({
        name: 'Junk'
    }));
}

for (let i = 99 - rotcleaver.length; i > 0; i--) {
    rotcleaver.push(new Card({
        name: 'Junk'
    }));
}

/**
 * Run a simulation over the given deck list.
 * @param deck Original deck.
 * @param simulation Simulation to run.
 * @param count Iteration count.
 */
const simulate = <T, U>(deck: Card[], simulation: (d: Deck) => T, summary: (results: T[]) => U, count: number = 1): U => {
    const results = [] as T[];
    for (let i = 0; i < count; i++) {
        results.push(simulation(new Deck(deck)));
    }

    return summary(results);
};

const simulateOpeningHand = () => {
    const getOpeningHand = (deck: Deck) => {
        deck.shuffle();
        return deck.draw(7);
    }

    const simulation = (deck: Deck) => {
        const hand = getOpeningHand(deck);
        return {
            lands: hand.filter(card => card.isLand()).length
        };
    };

    const summarizer = (results: ReturnType<typeof simulation>[]) => {
        const landCounts: any = {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            average: 0,
        };
        results.forEach(result => {
            landCounts[result.lands]++;
            landCounts.average += result.lands;
        });
        landCounts[0] /= results.length
        landCounts[1] /= results.length
        landCounts[2] /= results.length
        landCounts[3] /= results.length
        landCounts[4] /= results.length
        landCounts[5] /= results.length
        landCounts[6] /= results.length
        landCounts[7] /= results.length
        landCounts.average /= results.length;
        return landCounts;
    };

    const results = simulate(rotcleaver, simulation, summarizer, 1000);

    console.log(results)
}

const simulateRamp = (cards: Card[], turns: number, iterations: number, log: typeof console.log = () => {}) => {
    const calcMean = (values: number[]) => {
        return values.reduce((a, b) => a + b, 0) / values.length;
    };

    /** Values must be sorted. */
    const calcMode = (values: number[]) => {
        let mode = 0;
        let count = 0;
        let testMode = 0;
        let testCount = 0;

        // Look for the mode.
        values.forEach(v => {
            if (v !== testMode) {
                if (testCount > count) {
                    mode = testMode;
                    count = testCount;
                }
                testMode = v;
                testCount = 0;
            }
            else {
                testCount++
            }
        });

        // Final check.
        if (testCount > count) {
            mode = testMode;
            count = testCount;
        }

        return mode;
    };

    const calcStdDev = (values: number[], mean: number) => {
        return Math.sqrt(calcMean(values.map(x => Math.pow(x - mean, 2))));
    };

    const simulation = (deck: Deck) => {
        const game = new Game([...deck.cards], log);
        const curve: number[] = [0];
        const lands: number[] = [game.board.permanents.filter(c => c.isLand()).length];
        for (let i = 0; i < turns; i++) {
            game.step();
            curve.push(game.board.getPotentialMana().toValue());
            lands.push(game.board.permanents.filter(c => c.isLand()).length);
        }
        return {
            curve,
            lands,
            plays: game.plays,
        };
    };

    const summarizer = (results: ReturnType<typeof simulation>[]) => {
        const turnSummaries: {
            plays: {
                landsMean: number,
                rampsMean: number,
            },
            mana: {
                max: number;
                mean: number,
                min: number;
                mode: number,
                q0: number,
                q1: number,
                q2: number,
                q3: number,
                q4: number,
                standardDeviation: number,
            },
            lands: {
                max: number;
                mean: number,
                min: number;
                mode: number,
                q1: number,
                q2: number,
                q3: number,
                standardDeviation: number,
            },
        }[] = [];
        for (let i = 0; i < turns; i++) {
            const mana = results.map(r => r.curve[i]).sort((a, b) => a - b);
            const land = results.map(r => r.lands[i]).sort((a, b) => a - b);
            const manaStdDev = Number.parseFloat(calcStdDev(mana, calcMean(mana)).toPrecision(3));
            turnSummaries.push({
                plays: {
                    landsMean: calcMean(results.map(r => r.plays[i].lands)),
                    rampsMean: calcMean(results.map(r => r.plays[i].ramps)),
                },
                mana: {
                    max: mana[mana.length - 1],
                    mean: calcMean(mana),
                    min: mana[0],
                    mode: calcMode(mana),
                    q0: mana[mana.length / 4] - (mana[mana.length / 4 * 3] - mana[mana.length / 4]) * 1.5,
                    q1: mana[mana.length / 4],
                    q2: mana[mana.length / 2],
                    q3: mana[mana.length / 4 * 3],
                    q4: mana[mana.length / 4 * 3] + (mana[mana.length / 4 * 3] - mana[mana.length / 4]) * 1.5,
                    standardDeviation: Number.parseFloat(calcStdDev(mana, calcMean(mana)).toPrecision(3))
                },
                lands: {
                    max: land[land.length - 1],
                    mean: calcMean(land),
                    min: land[0],
                    mode: calcMode(land),
                    q1: land[land.length / 4],
                    q2: land[land.length / 2],
                    q3: land[land.length / 4 * 3],
                    standardDeviation: Number.parseFloat(calcStdDev(land, calcMean(land)).toPrecision(3))
                }
            });
        }
        
        return turnSummaries;
    };

    const results = simulate(cards, simulation, summarizer, iterations);
    return results;
};

const output = {
    jennieFey: simulateRamp(jennieFey, 10, 10000).map(t => ({
        ...t.mana,
        landsMean: t.plays.landsMean,
        rampsMean: t.plays.rampsMean,
    })),
    rotcleaver: simulateRamp(rotcleaver, 10, 10000).map(t => ({
        ...t.mana,
        q0: t.mana.q4,
        q1: t.mana.q3,
        q3: t.mana.q1,
        q4: t.mana.q0,
        landsMean: t.plays.landsMean,
        rampsMean: t.plays.rampsMean,
    })),
}
const opt: any[] = [];
for (let i = 0; i < 10; i++) {
    opt.push({
        curve: i,
        jennieFey: output.jennieFey[i].mean,
        jennieFeyLands: output.jennieFey[i].landsMean,
        jennieFeyRamps: output.jennieFey[i].rampsMean,
        rotcleaver: output.rotcleaver[i].mean,
        rotcleaverLands: output.rotcleaver[i].landsMean,
        rotcleaverRamps: output.rotcleaver[i].rampsMean,
    });
    // opt.push(output.jennieFey[i]);
    // opt.push(output.rotcleaver[i]);
}
console.log(JSON.stringify(opt, undefined, 2));