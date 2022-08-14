import { Reducer, SimulateFunction, Simulation, SummarizeFunction } from ".";
import { Card } from "../card";
import Deck from "../deck";

type ReduceResult = {
    totalLandCount: number,
};
type SimulateResult = {
    landCount: number,
};
type SummarizeResult = {
    avgLandCount: number,
};

const reducer = new Reducer<SimulateResult, ReduceResult>(
    (prev: ReduceResult, next: SimulateResult, iteration: number): ReduceResult => {
        return {
            totalLandCount: prev.totalLandCount + next.landCount,
        };
    },
    {
        totalLandCount: 0
    }
);

const simulate: SimulateFunction<SimulateResult> = (deck: Deck) => {
    deck.shuffle();
    const hand = deck.draw(7);
    return {
        landCount: hand.filter(c => c.isLand).length,
    };
};

const summarize: SummarizeFunction<ReduceResult, SummarizeResult> = (reduceResult: ReduceResult, iterations: number) => {
    return {
        avgLandCount: reduceResult.totalLandCount / iterations
    };
};

export default class OpeningHandSimulation extends Simulation<SimulateResult, ReduceResult, SummarizeResult> {
    public constructor (decklist: Card[]) {
        super(decklist, simulate, reducer, summarize);
    }
}