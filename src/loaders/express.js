import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session'

const memoryStore = require('./keycloak-config').getMemoryStore();
const keycloak = require('./keycloak-config').initKeycloak();


// API routes
import * as routes from '../api';


// const app = express(); // for itelisense only.. 

export default ({ app })=> {
    var env = process.env.NODE_ENV;

    /**
     * Enable cors on all actions
     */
    app.use(cors());

    // NOT FOR PRODUCTION
    // Create a session-store to be used by both the express-session
    // middleware and the keycloak middleware.

    app.use(session({
        secret: '9a1287ca-4a5a-4664-871b-2724e0ef33a1',
        resave: false,
        saveUninitialized: true,
        store: memoryStore
    }));

    //Keycloak
    app.use(keycloak.middleware());
    console.log('Keycloak middleware Initialized')

    /**
     * Transform string to JSON.
     */
    app.use(bodyParser.json());

    /**
     * SERVERS 
     */
    app.use(process.env.ROUTING_PREFIX , routes.default);

    /**
     * Check API health.
     */
    app.get(`${process.env.ROUTING_PREFIX}status`, (req, res) => {
        res.status(200).send("SEQT IS UP AND RUNNING!");
    });


    /**
     * Catch 404 and forward to error handle.
     */
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });

    /**
     * Global error catcher.
     */
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            errors:{
                message: err.message
            }
        });
    });

};


