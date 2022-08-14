import { Application, Router } from "oak";
import { Connector } from "$/connectors/mod.ts";
import { DeckController } from "$/controllers/mod.ts";

export class App extends Application {
    public constructor (connector: Connector) {
        super();

        const router = new Router();
        const controllers = [
            new DeckController(connector.decks)
        ];
        controllers.forEach(controller => {
            router.get(controller.getRoute.route, controller.getRoute.handler);
            router.get(controller.listRoute.route, controller.listRoute.handler);
        });

        this.use(router.routes());
        this.use(router.allowedMethods());
    }
}