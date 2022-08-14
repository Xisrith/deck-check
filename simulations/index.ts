import { Card } from "../card";
import Deck from "../deck";

export type ReduceFunction<TItem, TResult> = (prev: TResult, next: TItem, iteration: number) => TResult;

export type SimulateFunction<TResult> = (deck: Deck) => TResult;

export type SummarizeFunction<TReducerResult, TSummarizeResult> = (lastReducerResult: TReducerResult, totalIterations: number) => TSummarizeResult;

export class Reducer<TItem, TResult> {
    public readonly callback: ReduceFunction<TItem, TResult>;
    public readonly initialValue: TResult;

    public constructor (callback: ReduceFunction<TItem, TResult>, initialValue: TResult) {
        this.callback = callback;
        this.initialValue = initialValue;
    }
}

export class Simulation<TSimulateResult, TReducerResult, TSummarizeResult> {
    public readonly decklist: Card[];
    public readonly simulate: SimulateFunction<TSimulateResult>;
    public readonly reducer: Reducer<TSimulateResult, TReducerResult>;
    public readonly summarize: SummarizeFunction<TReducerResult, TSummarizeResult>;

    private _lastReducerResult: TReducerResult;
    private _totalIterations: number;

    public constructor (decklist: Card[], simulate: SimulateFunction<TSimulateResult>, reducer: Reducer<TSimulateResult, TReducerResult>, summarize: SummarizeFunction<TReducerResult, TSummarizeResult>) {
        this.decklist = decklist;
        this.simulate = simulate;
        this.reducer = reducer;
        this.summarize = summarize;

        this._lastReducerResult = reducer.initialValue;
        this._totalIterations = 0;
    }

    public clear = () => {
        this._lastReducerResult = this.reducer.initialValue;
        this._totalIterations = 0;
    };

    public getDeck = () => new Deck(this.decklist);

    public getLastResult = () => this._lastReducerResult;

    public getSummary = () => this.summarize(this._lastReducerResult, this._totalIterations);

    public run = async (count: number = 1): Promise<TReducerResult> => {
        if (count < 1) {
            throw new RangeError(`Simulation.run count (${count}) cannot be less than 1!`);
        }

        for (let i = 0; i < count; i++) {
            const result = this.simulate(this.getDeck());
            this._lastReducerResult = this.reducer.callback(this._lastReducerResult, result, this._totalIterations);
            this._totalIterations++;
        }

        return this._lastReducerResult;
    };
}