const PointInPolygonChecker = require('../src/PointInPolygonChecker');

describe('PointInPolygonChecker', () => {
  it('should return true if point is inside the polygon', () => {
    const point = { x: 2, y: 2 };
    const polygon = [{ x: 1, y: 1 }, { x: 1, y: 3 }, { x: 3, y: 3 }, { x: 3, y: 1 }];
    expect(PointInPolygonChecker.pointInPolygon(point, polygon)).toBeTruthy();
  });

  it('should return false if point is outside the polygon', () => {
    const point = { x: 4, y: 4 };
    const polygon = [{ x: 1, y: 1 }, { x: 1, y: 3 }, { x: 3, y: 3 }, { x: 3, y: 1 }];
    expect(PointInPolygonChecker.pointInPolygon(point, polygon)).toBeFalsy();
  });

  it('should return true if point is on the boundary of the polygon', () => {
    const point = { x: 1, y: 2 };
    const polygon = [{ x: 1, y: 1 }, { x: 1, y: 3 }, { x: 3, y: 3 }, { x: 3, y: 1 }];
    expect(PointInPolygonChecker.pointInPolygon(point, polygon)).toBeTruthy();
  });

  it('should return false if point is outside the polygon but on the same line as one of the edges', () => {
    const point = { x: 2, y: 4 };
    const polygon = [{ x: 1, y: 1 }, { x: 1, y: 3 }, { x: 3, y: 3 }, { x: 3, y: 1 }];
    expect(PointInPolygonChecker.pointInPolygon(point, polygon)).toBeFalsy();
  });
  
  
});
