const { Routes } = require('./routes');

class API {
    constructor(options) {
        let { spaces, port } = options;
        if(!spaces) spaces = 2;
        if(!port) port = 5600;
        // Properties
        this.app = require('express')();
        this.routes = new Routes(this.app);
        // Settings
        this.app.set('json spaces', spaces);
        this.app.listen(port, () => {
            console.log('| ----------------------------------------------------- |');
            console.log('| Listenning API in port:', port);
        });
    }
}

module.exports = { API }