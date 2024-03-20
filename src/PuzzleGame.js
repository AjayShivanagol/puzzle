const GeometryInputHandler = require('./GeometryInputHandler');
const ShapeCreator = require('./ShapeCreator');
const PointInPolygonChecker = require('./PointInPolygonChecker');

class PuzzleGame {
    constructor() {
        this.inputHandler = new GeometryInputHandler();
    }

    async runGame(shape) {
        let input = '';
        while (input !== '#') {
            input = await this.inputHandler.askQuestion(`\nPlease key in test coordinates in x y format or enter # to quit the game `);

            if (input === '#') {
                console.log('\nThank you for playing the GIC geometry puzzle app\nHave a nice day!');
                break;
            }

            input = input.replace(',', ' ');
            let parts = input.split(' ').filter(Boolean);
            let testPoint = { x: parseInt(parts[0], 10), y: parseInt(parts[1], 10) };

            if (isNaN(testPoint.x) || isNaN(testPoint.y)) {
                console.log(`Sorry, coordinates (${parts.join(' ')}) could not be parsed. Please use the correct format.`);
                continue;
            }

            console.log(`Your finalized shape is\n${shape.map((c, i) => `${i + 1}:(${c.x},${c.y})`).join('\n')}`);

            if (PointInPolygonChecker.pointInPolygon(testPoint, shape)) {
                console.log(`Coordinates (${testPoint.x} ${testPoint.y}) is within your finalized shape`);
            } else {
                console.log(`\nSorry, coordinates (${testPoint.x} ${testPoint.y}) is outside of your finalized shape`);
            }
        }
    }

    async start() {
        try {
            let choice = (await this.inputHandler.askQuestion('Welcome to the GIC geometry puzzle app\n[1] Create a custom shape\n[2] Generate a random shape\n')) || '';
            let shape;
            switch (choice.trim()) {
                case '1':
                    shape = await ShapeCreator.createCustomShape(this.inputHandler);
                    break;
                case '2':
                    shape = ShapeCreator.createRandomShape();
                    console.log('Your random shape is ');
                    shape.forEach((coord, index) => console.log(`${index + 1}:( ${coord.x},${coord.y} )`));
                    break;
                default:
                    console.log('Invalid option');
                    this.inputHandler.close();
                    return;
            }
            await this.runGame(shape);
            this.inputHandler.close();
        } catch (error) {
            console.log('An error occurred', error);
        }
    }
}

const game = new PuzzleGame();
// Start the game This will prompt the user to choose between creating a custom shape or generating a random shape.
game.start();

module.exports = PuzzleGame;
