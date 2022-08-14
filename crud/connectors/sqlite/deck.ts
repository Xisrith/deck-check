import { DB, PreparedQuery } from "sqlite";
import { ResourceConnector } from "../mod.ts";
import { Deck, DeckFormat } from "$/models/mod.ts";

export default class DeckSqliteConnector implements ResourceConnector<Deck> {
    private readonly _get: PreparedQuery<[string, DeckFormat], { id: string, format: string }, { id: string }>;
    private readonly _getDecklist: PreparedQuery<[string, string], { deck_id: string, card_name: string }, { deck_id: string }>;
    private readonly _list: PreparedQuery<[string, DeckFormat], { id: string, format: string }>;

    public constructor (database: DB) {
        database.execute(`
            CREATE TABLE IF NOT EXISTS decks (
                id TEXT PRIMARY KEY,
                format TEXT
            )
        `);

        database.execute(`
            CREATE TABLE IF NOT EXISTS decklists (
                deck_id TEXT,
                card_name TEXT
            )
        `);

        this._get = database.prepareQuery("SELECT id, format FROM decks WHERE id = :id");
        this._getDecklist = database.prepareQuery("SELECT deck_id, card_name FROM decklists WHERE deck_id = :deck_id");
        this._list = database.prepareQuery("SELECT id, format FROM decks");
    }

    public create = (_deck: Deck): Promise<Deck> => new Promise<Deck>((_resolve, reject) => {
        reject("Not implemented");
    });

    public get = (id: string): Promise<Deck> => new Promise((resolve, reject) => {
        const results = this._get.all({ id });
        if (results.length) {
            const [id, format] = results[0];
            const decklist = this._getDecklist.all({ deck_id: id });
            resolve(Object.assign({}, {
                id,
                format,
                cards: decklist.map(([_, card_name]) => card_name),
            }));
        } else {
            reject(`No deck with the id (${id}) exists`);
        }
    });

    public list = (): Promise<Deck[]> => new Promise<Deck[]>((resolve) => {
        const results = this._list.all();
        const decks = results.map(([id, format]) => {
            const decklist = this._getDecklist.all({ deck_id: id });
            return {
                id,
                format,
                cards: decklist.map(([_, card_name]) => card_name),
            };
        });
        resolve(decks);
    });

    public update = (_deck: Deck): Promise<void> => new Promise((_resolve, reject) => {
        reject("Not implemented");
    });
}