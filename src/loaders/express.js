import bodyParser from 'body-parser';
import cors from 'cors';

var keycloakConfig = require('../../keycloak.json');

import { keycloakSetUp, keycloakMiddlewares} from '@yp-chassis/chassisjs';

var keycloak = keycloakSetUp.getKeycloak(keycloakConfig);
var session = keycloakMiddlewares;



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

    // Pass secret through env vars
    app.use(session.getSessionMiddleware());

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


