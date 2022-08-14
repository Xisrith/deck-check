import { DB } from "sqlite";
import DeckSqliteConnector from "./deck.ts";

export default class SqliteConnector {
    public readonly decks: DeckSqliteConnector;

    public constructor (database: DB) {
        this.decks = new DeckSqliteConnector(database);
    }
}