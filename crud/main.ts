import { DB } from "sqlite";
import SqliteConnector from "$/connectors/sqlite/mod.ts";
import { App } from "./app/mod.ts";
import * as path from "path";

const dbpath = path.join(path.dirname(path.fromFileUrl(import.meta.url)), ".sqlite");
const connector = new SqliteConnector(new DB(dbpath));

console.log("Listening on http://localhost:8080/");
await new App(connector).listen({ port: 8080 });
