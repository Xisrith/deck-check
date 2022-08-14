import { Deck } from "$/models/mod.ts";

export interface Connector {
    readonly decks: ResourceConnector<Deck>;
}

export interface ResourceConnector<T> {
    create: (record: T) => Promise<T>;
    get: (id: string) => Promise<T | null>;
    list: () => Promise<T[]>;
    update: (record: T) => Promise<void>;
}