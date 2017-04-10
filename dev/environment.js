define(function () {
    class Environment {
        constructor(game, hero, level) {
            this.game = game;
            this.centerX = this.game.world.centerX;
            this.centerY = this.game.world.centerY;
            this.levelConfig = this.game.cache.getJSON('levelsConfig')[level];
            this.platforms = this.game.add.physicsGroup();
            this.boxes = this.game.add.physicsGroup();
            this.stars = this.game.add.physicsGroup();
            this.puddles = this.game.add.physicsGroup();
            this.signs = this.game.add.physicsGroup();
            this.win = this.game.add.physicsGroup();
            this.hero = hero;

            this.generateObjects();
        }
        generateObjects() {
            //if you want to add new objects:
            //  Example
            //1)assetsLoader.js -> this.game.load.image('boxes','assets/box.png');
            //2)environment.js -> this.boxes = this.game.add.physicsGroup();
            //3)levelsConfig.json -> "boxes": [[-320, 140], [500, 140]],
            // you must use the SAME names in all files
            for (let key in this.levelConfig) {
                for (let i = 0; i < this.levelConfig[key].length; i++) {
                    if (this.levelConfig[key][i] != null) {
                        let x = this.centerX + this.levelConfig[key][i][0];
                        let y = this.centerY + this.levelConfig[key][i][1];
                        this[key].create(x, y, key);
                    }
                }
            }
            this.win.create(5720, this.game.world.height - this.game.rnd.integerInRange(225, 225), 'winsign');
            this.platforms.setAll('body.immovable', true);
            this.boxes.setAll('body.immovable', true);
            this.game.physics.arcade.enable(this.platforms, this.boxes, this.puddles, this.win);
        }
        get getPlatformsCoordinates() {
            return this.platforms.children;
        }
    }
    return Environment;
});
