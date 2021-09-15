var torus;

function updateMaterialFromCanvas(HTMLCanvas) {
    var canvTexture = new THREE.CanvasTexture(HTMLCanvas);
    var material = new THREE.MeshStandardMaterial({
        map: canvTexture,
        displacementMap: canvTexture,
        displacementScale: 0.8,

    })
    torus.material = material;
    torus.material.needsUpdate = true;
};

function getRandomStarField(numberOfStars, width, height) {
    var canvas = document.createElement("canvas");

	canvas.width = width;
	canvas.height = height;

	var ctx = canvas.getContext('2d');

	ctx.fillStyle="black";
	ctx.fillRect(0, 0, width, height);

	for (var i = 0; i < numberOfStars; ++i) {
		var radius = Math.random() * 2;
		var x = Math.floor(Math.random() * width);
		var y = Math.floor(Math.random() * height);

		ctx.beginPath();
		ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'white';
		ctx.fill();
	}

	var texture = new THREE.Texture(canvas);
	texture.needsUpdate = true;
	return texture;
};

function drawTorus() {
    // Setting the scene and the camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );

    // Lights
    const light = new THREE.AmbientLight( 0xFFFFFF );
    const pointl1 = new THREE.PointLight( 0xABD1F3, 30, 100 );
    pointl1.position.set( 60, 40, 20 );
    const pointl2 = new THREE.PointLight( 0xC72F31, 30, 100 );
    pointl2.position.set( -60, -30, 20 );


    // Create skybox
    var skyBox = new THREE.BoxGeometry(120, 120, 120);
    var skyBoxMaterial = new THREE.MeshBasicMaterial({
        map: getRandomStarField(600, 2048, 2048),
        side: THREE.BackSide
    });
    var sky = new THREE.Mesh(skyBox, skyBoxMaterial);

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
    
    const geometry_poly = new THREE.TorusGeometry( 10, 5, 150, 300 );

    // const geometry_poly = new THREE.TorusGeometry( 10, 5, 5, 6 );
    torus = new THREE.Mesh( geometry_poly, material );
    // Wireframe
    // var geometry_wire = new THREE.EdgesGeometry( torus.geometry ); // or WireframeGeometry
    // var material_wire = new THREE.LineBasicMaterial( { color: white } );
    // var wireframe = new THREE.LineSegments( geometry_wire , material_wire );


    // Adding camera movements with mouse
    

    // Grouping and showing
    const group = new THREE.Group();
    group.add(torus);
    group.add(sky);
    // group.add(wireframe);
    scene.add(group);
    scene.add(light);
    scene.add(pointl1);
    scene.add(pointl2);


    camera.position.z = 30;

    const animate = function () {
        requestAnimationFrame( animate );
        group.rotation.x += 0.001;
        group.rotation.y += 0.001;

        renderer.render( scene, camera );
    };
    animate();
    
};
