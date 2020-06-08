"use strict";

class Initializer {
    constructor() {
        this.initializeCore();
        this.initializeExceptions();
        this.initializeClasses();
    }

    /* load core functionality */
    initializeCore() {
        /* setup utilites */
        global.express = require('express');
        global.app = express();
        global.sqlite3 = require('sqlite3').verbose();
        global.path = require('path');
        global.cors = require('cors')

        app.set('views', '/views');

        app.use(express.static(path.join(__dirname + '/views')));

    }

    /* load exception handler */
    initializeExceptions() {
        process.on('uncaughtException', (error, promise) => console.log(error));
    }

    /* load classes */
    initializeClasses() {
        global.utility = require('./utility.js');
        global.json = require('./json.js');
    }
}

module.exports.initializer = new Initializer();