const { API } = require('./classes/api');

const api = new API({
    port: 5600,
    spaces: 2
});

api.routes.load('./src/routes');