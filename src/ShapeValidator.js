class ShapeValidator {

    // To validate the input, we need to ensure the input is in the format x y and that x and y are non-zero and unique.
    static isValidInputCoordinate(input, coordinates) {
        input = input.trim();
        const parts = input.split(/[\s,]+/);
        if (parts.length !== 2 || parts.some(part => isNaN(parseFloat(part)) || !isFinite(part))) {
            console.log('Invalid input, please enter coordinates in x y format.');
            return false;
        }
        const [x, y] = parts.map(Number);
        if (x === 0 || y === 0 || coordinates.some(coord => coord.x === x && coord.y === y)) {
            console.log(`New coordinates(${x},${y}) are invalid!!!\nNot adding new coordinates to the current shape.\n`);
            return false;
        }
        return { x, y };
    }

    static generateUniqueNonZeroCoordinate(existingCoordinates) {
        while (true) {
            const x = Math.floor(Math.random() * 10) + 1; // Ensure non-zero by starting at 1
            const y = Math.floor(Math.random() * 10) + 1; // Ensure non-zero by starting at 1
            const isUnique = !existingCoordinates.some(coord => coord.x === x && coord.y === y);
            if (isUnique) {
                return { x, y };
            }
        }
    }
}

module.exports = ShapeValidator;
