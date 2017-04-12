define(['environment'], function (Environment) {
    class Zombies {
        constructor(game, bullets, environment, gui, level) {
            this.game = game;
            this.bullets = bullets;
            this.environment = environment;
            this.gui = gui;
            this.velocity = 100;
            this.sprite = this.game.add.group();
            this.game.score = 0;

            const centerX = this.game.world.centerX;
            const centerY = this.game.world.centerY;
            const platforms = this.environment.getPlatformsCoordinates;

            for (let i = 0; i < platforms.length; i++) {
                if (this.game.rnd.integerInRange(0, 3)) {
                    this.sprite.create(platforms[i].x + 100, platforms[i].y - 90, 'zombie');
                }
            }

            this.game.physics.arcade.enable(this.sprite);
            this.sprite.children.forEach((item, index) => {
                item.animations.add('walk', [7, 8, 9, 10, 11, 12, 13]);
                item.animations.add('death', [1, 2, 3, 4, 6]);
                item.anchor.setTo(.5, 0);
                item.body.velocity.x = this.game.rnd.integerInRange(30, 100);
                item.scale.x = this.game.rnd.integerInRange(0, 1) ? -1 : 1;
                if (item.scale.x < 0) {
                    item.body.velocity.x = -item.body.velocity.x;
                }
                item.rout = item.x;
            });
            this.game.time.events.add(Phaser.Timer.SECOND / 2, this.changeDirection, this);

            this.text = this.game.add.text(centerX - 100, 32, 'Zombies killed: ' + this.game.score, { fill: '#ffffff' });
            this.text.fixedToCamera = true;
            //dragon
            this.dragon = this.game.add.physicsGroup();
            for (let i = 1; i < 100; i++) {
                this.dragon.create(i * 2000, this.game.rnd.integerInRange(100, 500), 'dragon');
            }
            this.dragon.children.forEach((item, index) => {
                item.animations.add('fly', [1, 2, 3, 4]);
            });
            this.game.zomdiesCount=this.sprite.children.length;
        }
        addCollide(object) {
            this.game.physics.arcade.collide(this.sprite, object, this.alert);
        }
        control() {
            this.sprite.children.forEach(item => {
            this.game.physics.arcade.overlap(this.bullets, item, (item) => this.wound(item), null, this);

            if (!item.death) {
                // item.body.velocity.x = this.velocity;
                item.animations.play('walk', 12, false);
            } else {
                if (item.death != '-1') {
                    item.animations.play('death', 12, false);
                    item.death = -1;
                    this.bullets.children.length = 0;
                    this.game.score++;
                    this.text.setText('Zombies killed: ' + this.game.score);
                }
            }
        });
        //dragon
        this.dragon.children.forEach(item => {
            item.animations.play('fly', 8, false);
            if(!this.gui.warningStat){
                item.x -= 3;
            };
            this.game.physics.arcade.overlap(this.bullets, item, (item) => item.kill(), null, this);
        });
            
        }
        changeDirection() {
            this.game.time.events.add(Phaser.Timer.SECOND / 2, this.changeDirection, this);
            this.sprite.children.forEach(item => {
                if (Math.abs(item.x - item.rout) > 40 && !item.death) {
                    item.scale.x = -item.scale.x;
                    item.body.velocity.x = -item.body.velocity.x;
                }
            })
        }
        overlap(object, method) {
            //checking hit a zombie
            this.game.physics.arcade.overlap(object, this.sprite, method, null, this);
        }
        wound(zombie) {
            if (zombie.death != -1) {
                if(!this.game.muteStat){
                    this.game.audio.zombieDeath.play(); // Audio when he die
                }

                zombie.body.velocity.x = 0;
                zombie.tint = 0xff00ff;
                this.game.time.events.add(Phaser.Timer.SECOND / 2, () => zombie.tint = 0xffffff, this);
                if (zombie.death != -1) {
                    zombie.death = true;
                    this.game.time.events.add(Phaser.Timer.SECOND * 2, () => zombie.kill(), this);
                }
            }
        }
    }
    return Zombies;
});
