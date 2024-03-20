const readline = require('readline');

class GeometryInputHandler {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    askQuestion(query) {
        return new Promise(resolve => this.rl.question(query, resolve));
    }

    close() {
        this.rl.close();
    }
}

module.exports = GeometryInputHandler;
