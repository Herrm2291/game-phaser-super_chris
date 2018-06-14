// Game configuration
const config = {
	type: Phaser.AUTO, // Phaser will decide how to render the game (WebGL or Canvas)
	width: 800,
	height: 600,
	zoom: 1.5,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 300 },
			debug: false
		}
	},
	scene: {
		preload: preload,
		create: create,
		update: update
	}
};

// Loads a new game with the config parameters declared in config above
const game = new Phaser.Game(config);

// Parameters used for the game
let score = 0;
let lives = 3;
let gameOver = false;

// Preloading images and spritesheets to be used in the game
function preload() {
	this.load.image('graveyard', 'assets/graveyard/graveyard.png');
	this.load.image('tile1', 'assets/graveyard/Tiles/Tile1.png');
	this.load.image('tile2', 'assets/graveyard/Tiles/Tile2.png');
	this.load.image('tile3', 'assets/graveyard/Tiles/Tile3.png');
	this.load.image('tile4', 'assets/graveyard/Tiles/Tile4.png');
	this.load.image('tile6', 'assets/graveyard/Tiles/Tile6.png');
	this.load.image('tile7', 'assets/graveyard/Tiles/Tile7.png');
	this.load.image('tile8', 'assets/graveyard/Tiles/Tile8.png');
	this.load.image('tile9', 'assets/graveyard/Tiles/Tile9.png');
	this.load.image('tile10', 'assets/graveyard/Tiles/Tile10.png');
	this.load.image('tile11', 'assets/graveyard/Tiles/Tile11.png');
	this.load.image('tile12', 'assets/graveyard/Tiles/Tile12.png');
	this.load.image('tile13', 'assets/graveyard/Tiles/Tile13.png');
	this.load.image('tile14', 'assets/graveyard/Tiles/Tile14.png');
	this.load.image('tile15', 'assets/graveyard/Tiles/Tile15.png');
	this.load.image('skullAndBone', 'assets/graveyard/Tiles/skullAndBone.png');
	this.load.image('skull', 'assets/graveyard/Tiles/skull.png');
	this.load.image('threeBones', 'assets/graveyard/Tiles/threeBones.png');
	this.load.image('twoBones', 'assets/graveyard/Tiles/twoBones.png');
	this.load.image('crate', 'assets/graveyard/Objects/crate.png');
	this.load.image('sign', 'assets/graveyard/Objects/sign.png');
	this.load.image('bushSmall', 'assets/graveyard/Objects/bushSmall.png');
	this.load.image('bushLarge', 'assets/graveyard/Objects/bushLarge.png');
	this.load.image('deadBush', 'assets/graveyard/Objects/deadBush.png');
	this.load.image(
		'tombStoneRound',
		'assets/graveyard/Objects/tombStoneRound.png'
	);
	this.load.image(
		'tombStoneCross',
		'assets/graveyard/Objects/tombStoneCross.png'
	);
	this.load.image('skeleton', 'assets/graveyard/Objects/skeleton.png');
	this.load.image('arrowLeft', 'assets/graveyard/Objects/arrowLeft.png');
	this.load.image('arrowRight', 'assets/graveyard/Objects/arrowRight.png');
	this.load.image('tree', 'assets/graveyard/Objects/tree.png');
	this.load.image('gaslightLogo', 'assets/gaslightLogo.png');
	this.load.image('browserDevil', 'assets/browserDevil.png');
	this.load.spritesheet(
		'superChris',
		'assets/superChris.png',
		{ frameWidth: 48, frameHeight: 62 }
	);
}

// Create is where the game world is built since these pieces of code only need to be called once
function create() {
	// Background image placed at these coordinates
	this.add.image(-100, 0, 'graveyard').setOrigin(0, 0);

	// Static arcade physics group for platforms
	platforms = this.physics.add.staticGroup();

	// Ground level, left to right
	platforms.create(32, 568, 'tile2').setScale(.5).refreshBody();
	platforms.create(96, 568, 'tile2').setScale(.5).refreshBody();
	platforms.create(160, 568, 'tile2').setScale(.5).refreshBody();
	platforms.create(224, 568, 'tile7').setScale(.5).refreshBody();
	platforms.create(288, 568, 'tile8').setScale(.5).refreshBody();
	platforms.create(352, 568, 'tile10').setScale(.5).refreshBody();
	platforms.create(416, 568, 'tile11').setScale(.5).refreshBody();
	platforms.create(480, 568, 'tile2').setScale(.5).refreshBody();
	platforms.create(544, 568, 'tile2').setScale(.5).refreshBody();
	platforms.create(608, 568, 'tile2').setScale(.5).refreshBody();
	platforms.create(672, 568, 'tile2').setScale(.5).refreshBody();
	platforms.create(736, 568, 'tile2').setScale(.5).refreshBody();
	platforms.create(800, 568, 'tile2').setScale(.5).refreshBody();

	// Ground level platform
	platforms.create(288, 440, 'tile1').setScale(.5).refreshBody();
	platforms.create(288, 504, 'tile4').setScale(.5).refreshBody();
	platforms.create(352, 440, 'tile3').setScale(.5).refreshBody();
	platforms.create(352, 504, 'tile6').setScale(.5).refreshBody();

	// Left platform, midway up the screen
	platforms.create(20, 290, 'tile15').setScale(.5).refreshBody();

	// Middle platform floating in the center(ish) of the screen
	platforms.create(322, 250, 'tile14').setScale(.25).refreshBody();
	platforms.create(354, 250, 'tile15').setScale(.25).refreshBody();

	// Right platform, near the top of the screen
	platforms.create(686, 136, 'tile1').setScale(.5).refreshBody();
	platforms.create(750, 136, 'tile2').setScale(.5).refreshBody();
	platforms.create(770, 136, 'tile2').setScale(.5).refreshBody();
	platforms.create(686, 200, 'tile12').setScale(.5).refreshBody();
	platforms.create(750, 200, 'tile9').setScale(.5).refreshBody();
	platforms.create(770, 200, 'tile9').setScale(.5).refreshBody();

	// Game world decorations only, no collision
	this.add.sprite(730, 360, 'arrowLeft').setScale(.5);
	this.add.sprite(30, 518, 'arrowRight').setScale(.5);
	this.add.sprite(290, 393, 'bushLarge').setScale(.5);
	this.add.sprite(465, 506, 'bushLarge');
	this.add.sprite(680, 95, 'bushSmall').setScale(.25);
	this.add.sprite(345, 400, 'bushSmall').setScale(.25);
	this.add.sprite(560, 515, 'bushSmall').setScale(.5);
	this.add.sprite(665, 510, 'deadBush').setScale(.75);
	this.add.sprite(25, 240, 'deadBush').setScale(.5);
	this.add.sprite(340, 212, 'sign').setScale(.5);
	this.add.sprite(230, 525, 'skeleton').setScale(.5);
	this.add.sprite(750, 80, 'skeleton');
	this.add.sprite(48, 48, 'tile9').setScale(.75);
	this.add.sprite(143, 48, 'tile13').setScale(.75);
	this.add.sprite(40, 580, 'skull').setScale(.5);
	this.add.sprite(745, 190, 'skull').setScale(.7);
	this.add.sprite(325, 484, 'skullAndBone').setScale(.7);
	this.add.sprite(690, 585, 'skullAndBone').setScale(.5);
	this.add.sprite(163, 20, 'skullAndBone').setScale(.5);
	this.add.sprite(760, 575, 'threeBones').setScale(.5);
	this.add.sprite(700, 140, 'threeBones').setScale(.5);
	this.add.sprite(30, 65, 'threeBones').setScale(.5);
	this.add.sprite(600, 510, 'tombStoneRound');
	this.add.sprite(700, 510, 'tombStoneCross').setScale(.75);
	this.add.sprite(315, 382, 'tombStoneRound');
	this.add.sprite(105, 418, 'tree');
	this.add.sprite(168, 565, 'twoBones').setScale(.5);
	this.add.sprite(760, 140, 'twoBones').setScale(.75);
	this.add.sprite(160, 70, 'twoBones').setScale(.5);

	// Usable objects, have collision 
	platforms.create(410, 510, 'crate').setScale(.5).refreshBody();
	platforms.create(765, 420, 'crate').setScale(.75).refreshBody();
	platforms.create(765, 497, 'crate').setScale(.75).refreshBody();

	// Super Chris created and dropped into the game at these coordinates
	player = this.physics.add.sprite(80, 450, 'superChris');

	// Removed the very small bounce that Super Chris had when landing on the ground and he is prevented from going outside the bounds of the game screen
	player.setBounce(0.0);
	player.setCollideWorldBounds(true);

	// Animations created for Super Chris which are based on movement direction
	if (!this.anims.get('left')) {
		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers('superChris'),
			frameRate: 10,
			repeat: -1
		});
	}

	if (!this.anims.get('turn')) {
		this.anims.create({
			key: 'turn',
			frames: [{ key: 'superChris' }],
			frameRate: 20
		});
	}

	if (!this.anims.get('right')) {
		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('superChris'),
			frameRate: 10,
			repeat: -1
		});
	}

	// Phasers built-in keyboard manager for keyboard event inputs
	cursors = this.input.keyboard.createCursorKeys();

	// Arcade physics group for the 12 Gaslight logos that drop from the top of the screen, 70 pixels apart
	gaslightLogos = this.physics.add.group({
		key: 'gaslightLogo',
		repeat: 11,
		setXY: { x: 12, y: 0, stepX: 70 }
	});

	// Setting the random bounce values for each Gaslight logo
	gaslightLogos.children.iterate(function (child) {
		child.setBounceY(Phaser.Math.FloatBetween(0.7, 0.9));
	});

	// Arcade physics group for the browser devils
	browserDevils = this.physics.add.group();

	// Text for scoreboard and life counter
	scoreText = this.add.text(10, 10, 'Score: ' + score, { font: '30px Creepster' });
	livesText = this.add.text(72, 55, 'Lives: ' + lives, { font: '20px Creepster' });

	// Collision and overlap for objects within the game
	this.physics.add.collider(player, platforms);
	this.physics.add.collider(gaslightLogos, platforms);
	this.physics.add.collider(browserDevils, platforms);
	this.physics.add.collider(player, browserDevils, hitBrowserDevil, null, this);
	this.physics.add.overlap(player, gaslightLogos, collectGaslightLogo, null, this);
}

// Update is where anything that needs to be checked or needs a check to run is placed as these events are called every frame
function update() {
	// Pause or resume the game
	this.input.keyboard.on('keydown_X', () => {
		if (!this.scene.isActive('default')) {
			this.scene.resume('default');
		} else {
			this.scene.pause('default');
		}
	});

	// Events that happen when gameOver is triggered
	if (gameOver) {
		gameOver = false;
		this.cameras.main.shake(1500);
		this.time.delayedCall(750, function () {
			this.cameras.main.fade(750);
		}, [], this);
		this.time.delayedCall(1500, function () {
			this.scene.restart('default');
		}, [], this);
	}

	// Keybinds created for Super Chris to move
	if (cursors.left.isDown) {
		player.body.setVelocityX(-200);

		player.flipX = true;

		player.anims.play('left', true);
	}
	else if (cursors.right.isDown) {
		player.setVelocityX(200);

		player.flipX = false;

		player.anims.play('right', true);
	}
	else {
		player.setVelocityX(0);
		player.anims.play('turn');
	}

	// Allows Super Chris to jump only if touching an object aka no air jumping
	if (cursors.space.isDown && player.body.touching.down) {
		player.setVelocityY(-300);
	}
}

// What happens when Super Chris collects Gaslight logos
function collectGaslightLogo(player, gaslightLogo) {
	gaslightLogo.disableBody(true, true);

	score += 10;
	scoreText.setText('Score: ' + score);

	// If there are no Gaslight Logos on the screen then a new batch of them is created
	if (gaslightLogos.countActive(true) === 0) {
		gaslightLogos.children.iterate(function (child) {
			child.enableBody(true, child.x, 0, true, true);
		});

		// Creating a random x position variable using a ternary operator which will always be on the opposite side of the screen to Super Chris
		const position = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

		// Creating a variable that uses parameters, including the above position variable, to ensure the created browser devils spawn on the opposite side of the screen to Super Chris
		const browserDevil = browserDevils.create(position, 16, 'browserDevil');
		browserDevil.setBounce(1);
		browserDevil.setCollideWorldBounds(true);
		browserDevil.setVelocity(Phaser.Math.Between(-200, 200), 20);
		browserDevil.allowGravity = false;
	}
}

// What happens when Super Chris being hit by a nefarious browser devil
function hitBrowserDevil(player, browserDevil) {
	this.physics.pause();
	player.setTint(0xff0000);
	player.anims.play('turn');
	gameOver = true;
}

