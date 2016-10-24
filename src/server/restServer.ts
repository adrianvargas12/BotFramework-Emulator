import * as Restify from 'restify';

export class RestServer {

    // REVIEW: Can we get this from the Restify.server?
    port: number;
    server: Restify.Server;

    constructor(name: string) {
        this.server = Restify.createServer({
            name: name
        });

        // REVIEW: Which of these do we need?
        this.server.use(Restify.acceptParser(this.server.acceptable));
        this.server.use(Restify.authorizationParser());
        this.server.use(Restify.CORS());
        this.server.use(Restify.dateParser());
        this.server.use(Restify.queryParser());
        this.server.use(Restify.jsonp());
        this.server.use(Restify.gzipResponse());
        this.server.use(Restify.requestLogger());
        this.server.use(Restify.conditionalRequest());
        this.server.use(Restify.fullResponse());
        this.server.use(Restify.bodyParser());
    }

    public restart = (port: number) => {
        this.stop();
        this.port = port;
        return this.server.listen(this.port, () => {
            console.log(`${this.server.name} listening on ${this.server.url}`);
        });
    }

    public stop = () => {
        return this.server.close();
    }
}
