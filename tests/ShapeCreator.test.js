const ShapeCreator = require('../src/ShapeCreator');
const ShapeValidator = require('../src/ShapeValidator');

// Mock for inputHandler to simulate user input
const mockInputHandler = {
  askQuestion: jest.fn()
};

beforeEach(() => {
  mockInputHandler.askQuestion.mockReset();
});

describe('ShapeCreator', () => {
  describe('createRandomShape', () => {
    it('should create a shape with a specific number of points', async () => {
      const shape = ShapeCreator.createRandomShape();
      expect(shape.length).toBeGreaterThanOrEqual(3);
      expect(shape.length).toBeLessThanOrEqual(8);
      shape.forEach(point => {
        expect(ShapeValidator.isValidInputCoordinate(`${point.x} ${point.y}`, [])).toEqual(expect.any(Object));
      });
    });
  });

  describe('createCustomShape', () => {
    it('should create a custom shape based on user input', async () => {
      // Simulate user inputs: coordinates and then finalizing with '#'
      mockInputHandler.askQuestion.mockResolvedValueOnce('1 1')
                                     .mockResolvedValueOnce('2 2')
                                     .mockResolvedValueOnce('3 1')
                                     .mockResolvedValueOnce('#');
      
      const coordinates = await ShapeCreator.createCustomShape(mockInputHandler);
      
      // Assertions
      expect(coordinates.length).toBeGreaterThanOrEqual(3); // At least a triangle
      coordinates.forEach(coord => {
        expect(coord).toHaveProperty('x');
        expect(coord).toHaveProperty('y');
      });
      expect(mockInputHandler.askQuestion).toHaveBeenCalledTimes(4);
    });
  });
});
