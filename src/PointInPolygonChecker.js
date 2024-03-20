class PointInPolygonChecker {   

    static pointInPolygon(point, vertices) {
        let count = 0; // Initialize a count for the ray-casting algorithm
        let x = point.x, y = point.y; // Extract the test point's coordinates for easier access
    
        // Iterate over each edge of the polygon defined by its vertices
        for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
            // Current vertex (i) and previous vertex (j) form an edge of the polygon
            let xi = vertices[i].x, yi = vertices[i].y; // Current vertex
            let xj = vertices[j].x, yj = vertices[j].y; // Previous vertex
    
            // Check if point is exactly on a horizontal edge
            if ((yi === yj && yi === y) && (x > Math.min(xi, xj) && x < Math.max(xi, xj))) {
                // The point shares the same y-coordinate as this horizontal edge and is between its x-coordinates
                return true; // The point is considered inside because it's on the edge
            }
    
            // Check if the point is on the edge (not necessarily horizontal) between vertices[i] and vertices[j]
            // This uses the equation of the line segment to see if the point lies exactly on the segment
            let onSegment = (xi - xj) * (y - yi) - (x - xi) * (yj - yi) === 0 &&
                (x >= Math.min(xi, xj) && x <= Math.max(xi, xj)) &&
                (y >= Math.min(yi, yj) && y <= Math.max(yi, yj));
            if (onSegment) {
                return true; // The point is on a non-horizontal edge, thus inside
            }
    
            // Check for intersections with a ray extending to the right from the point
            let intersect = ((yi > y) !== (yj > y)) && // One vertex is above the point, the other is below
                (x < (xj - xi) * (y - yi) / (yj - yi) + xi); // The intersection point on the edge is to the right of the point
            // If true, this edge intersects with the ray from the point
            if (intersect) count++;
        }
    
        // Determine inside vs. outside based on the ray-casting result
        // If the count of intersections is odd, the point is inside; if even, outside
        return count % 2 === 1;
    }
}

module.exports = PointInPolygonChecker;
