"use strict";

var canvas;
var gl;
var program;

// point array and color array
var pointsArray = [];
var colorsArray = [];

window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    // add positions and colors of points 
    main();

    // Load shaders and initialize attribute buffers
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // push point array and color array in buffers
        //
    //  Load shaders and initialize attribute buffers
    //
    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colorsArray), gl.STATIC_DRAW );
    
    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    render();
}

function main() {
    var nx = 500;
    var ny = 500;
    // Initialize a sphere using center (0,0,-1) and radius 0.5.
    var s = new sphere(vec2(0.0,0.0,-1.0), 0.5);
    // Your code goes here:

    var bottomLeft = vec2(-2.0,-1.0,-1.0);
    var horizontal = vec2(4.0,0.0,0.0);
    var vertical = vec2(0.0,2.0,0.0);
    var origin = vec2(0.0,0.0,0.0);

    for (var j = (ny - 1); j >= 0; j--) {
        for (var i = 0; i < nx; i++) {
            let u = (i/nx);
            let v = (j/ny);

            let r = new ray(origin, add(bottomLeft, add(scale(u, horizontal), scale(v, vertical))));
            let d = r.direction();
            let c = colors(r,s);

            pointsArray.push(vec2(-1*d[0], -1*d[1]));
            colorsArray.push(c);
        }
    }

}

// r is an object of ray. s is an object of sphere. 
function colors(r, s){
    var rec = new hit_record();
    // Your code goes here:
    // if hit the sphere: call s.hit(); return normal 
    // else: return background

    if (s.hit(r, rec)){
        var n = rec.getNormal();
        return scale(0.5, vec3(n[0]+1, n[1]+1, 1.5));
    }

    let t = 0.5*(r.direction()[1] + 1.0);
    return mix(vec3(1.0, 1.0, 1.0), vec3(0.5, 0.7, 1.0), t);
}

var render = function() {
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays( gl.POINTS, 0, pointsArray.length );
}
