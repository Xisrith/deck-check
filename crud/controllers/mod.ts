import { RouterContext, RouteParams } from "oak";
import { ResourceConnector } from "$/connectors/mod.ts";

export default class Controller<Resource, Route extends string> {
    private readonly _connector: ResourceConnector<Resource>;
    private readonly _route: Route;

    public readonly getRoute: {
        route: `${Route}/:id`,
        handler: (request: RouterContext<`${Route}/:id`, RouteParams<`${Route}/:id`>>) => Promise<void>,
    };

    public readonly listRoute: {
        route: Route,
        handler: (request: RouterContext<Route, RouteParams<Route>>) => Promise<void>,
    };

    public constructor (connector: ResourceConnector<Resource>, route: Route) {
        this._connector = connector;
        this._route = route;

        this.getRoute = {
            route: `${this._route}/:id`,
            handler: this.get,
        };

        this.listRoute = {
            route: this._route,
            handler: this.list,
        };
    }

    public get = async (request: RouterContext<`${Route}/:id`, RouteParams<`${Route}/:id`>>): Promise<void> => {
        const result = await this._connector.get(request.params.id);
        if (result) {
            request.response.body = {
                success: true,
                data: result,
            };
        } else {
            request.response.status = 404;
        }
    };

    public list = async (request: RouterContext<Route, RouteParams<Route>>): Promise<void> => {
        const result = await this._connector.list();
        request.response.body = {
            success: true,
            data: result,
        };
    }
}

import { Deck } from "$/models/mod.ts";
export class DeckController extends Controller<Deck, "/decks"> {
    public constructor (connector: ResourceConnector<Deck>) {
        super(connector, "/decks");
    }
}