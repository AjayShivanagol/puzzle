const ShapeValidator = require('./ShapeValidator');

class ShapeCreator {
    static createRandomShape() {
        // Generate a random number of points between 3 and 8
        const numberOfPoints = Math.floor(Math.random() * 6) + 3; // 3 to 8 points
        const points = [];
        while (points.length < numberOfPoints) {
            const newPoint = ShapeValidator.generateUniqueNonZeroCoordinate(points);
            points.push(newPoint);
        }

        // This sorting is a simplistic approach to help form a shape. For actual convex shapes, consider a convex hull algorithm.
        points.sort((a, b) => a.x - b.x || a.y - b.y);

        return points;
    }

    static async createCustomShape(inputHandler) {
        const coordinates = [];
        while (true) {
            let questionName = `Please enter coordinate ${coordinates.length + 1} in x y format `;
            if (coordinates.length >= 3) {
                questionName = `Please enter # to finalize your shape or enter coordinate ${coordinates.length + 1} in x y format `;
            }

            // Use inputHandler.askQuestion instead of askQuestion directly
            const input = await inputHandler.askQuestion(questionName);

            if (input === '#' && coordinates.length >= 3) {
                console.log('Your finalized shape is');
                break; // Break if user enters '#' and at least 3 coordinates are entered
            } else if (input === '#' && coordinates.length < 3) {
                console.log('At least 3 coordinates are required to create a shape.');
                continue; // Prevent finalizing if fewer than 3 coordinates
            }

            const validatedInput = ShapeValidator.isValidInputCoordinate(input, coordinates);
            if (validatedInput) {
                coordinates.push(validatedInput);
                console.log(`Your current shape is ${coordinates.length < 3 ? 'incomplete' : 'valid and is complete'}`);
                coordinates.forEach((coord, index) => console.log(`${index + 1}: (${coord.x},${coord.y})`));
            }
        }

        coordinates.forEach((coord, index) => console.log(`${index + 1}: (${coord.x},${coord.y})`));

        return coordinates; // Returns the coordinates array for further processing or validation
    }
}

module.exports = ShapeCreator;
