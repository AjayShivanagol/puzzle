const PuzzleGame = require('../src/PuzzleGame');
jest.mock('../src/GeometryInputHandler');
jest.mock('../src/PointInPolygonChecker');

describe('PuzzleGame', () => {
  let puzzleGameInstance, inputHandlerMock;

  beforeEach(() => {
    // Re-create mocks before each test to reset their state and avoid leakage between tests
    jest.resetAllMocks();
    inputHandlerMock = require('../src/GeometryInputHandler');
    inputHandlerMock.askQuestion = jest.fn();

    // Instantiate PuzzleGame with mocked inputHandler
    puzzleGameInstance = new PuzzleGame();
    puzzleGameInstance.inputHandler = inputHandlerMock; // Injecting the mock directly for testing
  });

  it('should quit the game when # is input', async () => {
    inputHandlerMock.askQuestion.mockResolvedValueOnce('#');
    await puzzleGameInstance.start();
    expect(inputHandlerMock.askQuestion).toHaveBeenCalledWith(expect.any(String));
    expect(inputHandlerMock.askQuestion).toHaveBeenCalledTimes(1);
  });

  it('should tell if a point is inside the shape', async () => {
    inputHandlerMock.askQuestion.mockResolvedValueOnce('1 1').mockResolvedValueOnce('#');
    const shape = [{ x: 0, y: 0 }, { x: 2, y: 2 }, { x: 0, y: 2 }];
    await puzzleGameInstance.runGame(shape); // Ensure this is a feasible call based on your class design

    const PointInPolygonChecker = require('../src/PointInPolygonChecker');
    expect(PointInPolygonChecker.pointInPolygon).toHaveBeenCalledWith({ x: 1, y: 1 }, shape);
    expect(inputHandlerMock.askQuestion).toHaveBeenCalledTimes(2);
  });

  it('should tell if a point is outside the shape', async () => {
    inputHandlerMock.askQuestion.mockResolvedValueOnce('3 3').mockResolvedValueOnce('#');
    const shape = [{ x: 0, y: 0 }, { x: 2, y: 2 }, { x: 0, y: 2 }];
    await puzzleGameInstance.runGame(shape);

    const PointInPolygonChecker = require('../src/PointInPolygonChecker');
    expect(PointInPolygonChecker.pointInPolygon).toHaveBeenCalledWith({ x: 3, y: 3 }, shape);
    expect(inputHandlerMock.askQuestion).toHaveBeenCalledTimes(2);
  });

  it('should tell if a point is on the boundary of the shape', async () => {
    inputHandlerMock.askQuestion.mockResolvedValueOnce('1 2').mockResolvedValueOnce('#');
    const shape = [{ x: 0, y: 0 }, { x: 2, y: 2 }, { x: 0, y: 2 }];
    await puzzleGameInstance.runGame(shape);

    const PointInPolygonChecker = require('../src/PointInPolygonChecker');
    expect(PointInPolygonChecker.pointInPolygon).toHaveBeenCalledWith({ x: 1, y: 2 }, shape);
    expect(inputHandlerMock.askQuestion).toHaveBeenCalledTimes(2);
  });

  it('should tell if a point is outside the shape but on the same line as one of the edges', async () => {
    inputHandlerMock.askQuestion.mockResolvedValueOnce('2 3').mockResolvedValueOnce('#');
    const shape = [{ x: 0, y: 0 }, { x: 2, y: 2 }, { x: 0, y: 2 }];
    await puzzleGameInstance.runGame(shape);

    const PointInPolygonChecker = require('../src/PointInPolygonChecker');
    expect(PointInPolygonChecker.pointInPolygon).toHaveBeenCalledWith({ x: 2, y: 3 }, shape);
    expect(inputHandlerMock.askQuestion).toHaveBeenCalledTimes(2);
  });
});
