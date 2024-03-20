const GeometryInputHandler = require('../src/GeometryInputHandler');

describe('GeometryInputHandler', () => {
  let handler;

  beforeEach(() => {
    handler = new GeometryInputHandler();
  });

  afterEach(() => {
    handler.close();
  });

  it('should ask a question and return user input', async () => {
    // To Mock the readline interface
    jest.spyOn(handler, 'askQuestion').mockResolvedValueOnce('mocked input');

    const input = await handler.askQuestion('Mock question?');
    expect(input).toBe('mocked input');
  });

  it('should close the readline interface', () => {
    const close = jest.spyOn(handler, 'close');
    handler.close();
    expect(close).toHaveBeenCalled();

  });

  it('should create a readline interface', () => {
    const rl = handler.rl;
    expect(rl).toBeDefined();
  });

  it('should have input and output properties', () => {
    const rl = handler.rl;
    expect(rl.input).toBeDefined();
    expect(rl.output).toBeDefined();
  });

  it('should have input and output properties that are set to process.stdin and process.stdout respectively', () => {
    const rl = handler.rl;
    expect(rl.input).toBe(process.stdin);
    expect(rl.output).toBe(process.stdout);
  });

  it('should have a close method', () => {
    expect(handler.close).toBeDefined();
  });

});
