define(['hero', 'zombies', 'background', 'environment', 'gui','win'], function (Hero, Zombies, Background, Environment, GUI, Win) {
    class Level {
        constructor() {
            this.sprites = {};
        }
        create() {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            //add all level objects here
            this.LEVEL = this.game.LEVEL;
            this.gui = new GUI(this.game, this.LEVEL);
            this.background = new Background(this.game);
            this.bullets = this.game.add.group();
            this.hero = new Hero(this.game, this.bullets, this.gui);
            this.environment = new Environment(this.game, this.hero, this.LEVEL);
            this.zombies = new Zombies(this.game, this.bullets, this.environment, this.gui, this.LEVEL);
            this.gui.level();

            //sprites crashe if return back to menu, problem is in this function...
            //this function is needed to use game camera
            this.game.world.setBounds(0, 0, 6000, 720);
        }
        update() {
            //update object's state here
            this.hero.addCollide(this.environment.platforms);
            this.hero.addCollideBoxes(this.environment.boxes);
            this.hero.addOverlap(this.environment.stars);
            this.hero.addOverlapZombie(this.zombies.sprite);
            this.hero.addOverlapPuddle(this.zombies.dragon);
            this.hero.addOverlapPuddle(this.environment.puddles);
            this.hero.addOverlapWin(this.environment.win);
            this.zombies.overlap(this.bullets, this.zombies.wound);
            this.background.control();
            this.hero.control();
            this.zombies.control();
        }
    }
    return new Level();
});
