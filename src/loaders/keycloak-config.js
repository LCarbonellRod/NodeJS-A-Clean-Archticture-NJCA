var session = require('express-session');
var Keycloak = require('keycloak-connect');
var keycloakConfig = require('../../keycloak.json');

let _keycloak;
let _memoryStore;

function getMemoryStore() {
    if (!_memoryStore){
        console.error('MemoryStore has not been initialized. Please called init first.');
        console.log("Initializing MemoryStore...");
        _memoryStore = new session.MemoryStore();
        return _memoryStore;
    }
    else
    {
        console.warn("Trying to init MemoryStore again!");
        return _memoryStore;
    }
}

Keycloak.prototype.redirectToLogin = function(req) {
    console.log('info', 'redirectToLogin')

    return false;
};

Keycloak.prototype.accessDenied = function (req, res)
{
    console.log('info', 'accessDenied')

    if (req.kauth || req.kauth.grant)
    {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.end('Cannot ' + req.method + ' ' + req.url + ' - Forbidden ' + res.statusCode);
    }
    else
    {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.end('Cannot ' + req.method + ' ' + req.url + ' - Unauthorized ' + res.statusCode);
    }
}

function initKeycloak() {
    if (_keycloak) {
        console.warn("Trying to init Keycloak again!");
        return _keycloak;
    }
    else {
        console.log("Initializing Keycloak...");
        var memoryStore = getMemoryStore();
        _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
        return _keycloak;
    }
}

function getKeycloak() {
    if (!_keycloak){
        console.error('Keycloak has not been initialized. Please called init first.');
        console.log("Initializing Keycloak...");
        var memoryStore = getMemoryStore();
        _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
        return _keycloak;
    }
    else
    {
        console.warn("Trying to init Keycloak again!");
        return _keycloak;
    }
}

module.exports = {
    initKeycloak,
    getKeycloak,
    getMemoryStore
};