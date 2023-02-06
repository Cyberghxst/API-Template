const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');
const mdir = process.cwd();

class Routes {
    constructor(app) {
        this.app = app;
        this.routes = []
    }
    // Private method
    async #cacheRoutes(dir, arr = []) {
        const files = readdirSync(join(mdir, dir));
        for(let file of files) {
            let stat = lstatSync(join(mdir, dir, file));
            if(stat.isDirectory()) {
                this.cacheRoutes(join(dir, file));
            } else {
                const route = require(join(mdir, dir, file));
                if(!route) continue;
                arr.push(route);
            }
        }
        return arr;
    }
    // Public method
    async load(dir) {
        if(!dir || typeof dir !== 'string') throw new SyntaxError('Invalid path provided.')
        let line = '| ----------------------------------------------------- |';
        let arr = []
        this.#cacheRoutes(dir, this.routes).then(() => {
            console.log(line);
            arr = this.routes.map(x => `| ${x.path} [Loaded] | Method: ${x.method}\n${line}`);
            for(let i of arr) { console.log(i) }
            this.routes.forEach(route => {
                this.app[route.method](route.path, async (req, res) => route.code({ req, res }));
            });
        }).catch(e => {
            console.log(`Failed to load path with reason: ${e}. at:`, `load('${dir}')`)
        });
    }
}

module.exports = { Routes }