var torus;

function updateMaterialFromCanvas(HTMLCanvas) {
    var canvTexture = new THREE.CanvasTexture(HTMLCanvas);
    var material = new THREE.MeshStandardMaterial({
        map: canvTexture,
        displacementMap: canvTexture,
        displacementScale: 1,

    })
    torus.material = material;
    torus.material.needsUpdate = true;
}

function drawTorus(rows, cols) {
    // Setting the scene and the camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );

    // Lights
    const light = new THREE.AmbientLight( 0xFFFFFF );

    // Setting the renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // Colors
    const white = new THREE.Color(255, 255, 255);
    const black = new THREE.Color(0, 0, 0);

    // // Making a toroidal mesh and a corresponding wireframe
    // // Mesh
    var material = new THREE.MeshStandardMaterial( {
        polygonOffset: true,
        polygonOffsetFactor: 1, // positive value pushes polygon further away
        polygonOffsetUnits: 1,
    });
    
    const geometry_poly = new THREE.TorusGeometry( 10, 5, 60, 150 );

    // const geometry_poly = new THREE.TorusGeometry( 10, 5, 5, 6 );
    torus = new THREE.Mesh( geometry_poly, material );
    // Wireframe
    // var geometry_wire = new THREE.EdgesGeometry( torus.geometry ); // or WireframeGeometry
    // var material_wire = new THREE.LineBasicMaterial( { color: white } );
    // var wireframe = new THREE.LineSegments( geometry_wire , material_wire );


    // Grouping and showing
    const group = new THREE.Group();
    group.add(torus);
    // group.add(wireframe);
    scene.add(group);
    scene.add(light);


    camera.position.z = 30;

    const animate = function () {
        requestAnimationFrame( animate );
        group.rotation.x += 0.001;
        group.rotation.y += 0.001;

        renderer.render( scene, camera );
    };
    animate();
    
}
