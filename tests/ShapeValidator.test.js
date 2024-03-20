const ShapeValidator = require('../src/ShapeValidator');

describe('ShapeValidator', () => {
  describe('isValidInputCoordinate', () => {
    it('should validate coordinate format', () => {
      const validInput = '1 1';
      const invalidInput = 'one, two';

      expect(ShapeValidator.isValidInputCoordinate(validInput, [])).toBeTruthy();
      expect(ShapeValidator.isValidInputCoordinate(invalidInput, [])).toBeFalsy();
    });

    it('should reject duplicate coordinates', () => {
      const coordinates = [{ x: 1, y: 1 }, { x: 2, y: 2 }];
      const duplicateCoord = '1 1';
      const newCoord = '3 3';

      // Test that duplicate coordinates are rejected
      expect(ShapeValidator.isValidInputCoordinate(duplicateCoord, coordinates)).toBeFalsy();

      // Test that new, unique coordinates are accepted
      expect(ShapeValidator.isValidInputCoordinate(newCoord, coordinates)).toBeTruthy();
    });

    
  });

  describe('generateUniqueNonZeroCoordinate', () => {
    it('should generate a unique non-zero coordinate', () => {
      const existingCoordinates = [{ x: 1, y: 1 }];
      const newCoord = ShapeValidator.generateUniqueNonZeroCoordinate(existingCoordinates);

      const isUnique = !existingCoordinates.some(coord => coord.x === newCoord.x && coord.y === newCoord.y);
      expect(isUnique).toBe(true);
      expect(newCoord.x).not.toBe(0);
      expect(newCoord.y).not.toBe(0);
    });

    it('should ensure generated coordinates are not in the existing coordinates list', () => {
      const existingCoordinates = [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }];
      const newCoord = ShapeValidator.generateUniqueNonZeroCoordinate(existingCoordinates);

      // Check that the new coordinate does not match any existing coordinate
      const isUnique = existingCoordinates.every(coord => coord.x !== newCoord.x || coord.y !== newCoord.y);
      expect(isUnique).toBe(true);
    });
  });
});
