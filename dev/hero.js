define(function () {
    class Hero {
        constructor(game, bullets, gui) {
            this.game = game;
            this.bullets = bullets;
            this.gui = gui;
            this.shotTimer = 0;
            const centerX = this.game.world.centerX;
            const centerY = this.game.world.centerY;
            this.sprite = this.game.add.sprite(centerX - 500, centerY + 110, 'gunman');
            //this.sprite.body.setSize(centerX-500,centerY + 110,centerX-450,centerY + 150);
            this.sprite.animations.add('walk', [8, 9, 10, 11, 12, 13]);
            this.sprite.animations.add('fire', [1, 2, 3, 4, 5]);
            this.sprite.animations.add('die', [16, 17, 18, 19, 20, 21]);
            this.sprite.anchor.setTo(.5, 0);
            this.game.camera.follow(this.sprite);
            this.game.physics.arcade.enable(this.sprite);
            this.sprite.body.setSize(84, 94, 0, 0);
            this.game.starsScoreNum = 0;
            this.sprite.body.collideWorldBounds = true;
            this.alive = true;
        }
        addCollide(object) {
            this.game.physics.arcade.collide(this.sprite, object);
        }
        addCollideBoxes(object) {
            this.game.physics.arcade.collide(this.sprite, object);
            object.children.forEach(item => {
                if (item.body.touching.left) {
                    item.x += 2;
                }
                if (item.body.touching.right) {
                    item.x -= 2;
                }
            });
        }
        addOverlap(object) {
            this.game.physics.arcade.overlap(this.sprite, object, this.touchStar, null, this);
        }
        addOverlapZombie(object) {
            this.game.physics.arcade.overlap(this.sprite, object, this.killHero, null, this);
        }
        addOverlapPuddle(object) {
            this.game.physics.arcade.overlap(this.sprite, object, this.isAlive, null, this);
        }
        addOverlapWin(object) {
            this.game.physics.arcade.overlap(this.sprite, object, this.win, null, this);
        }
        control() {
            if (this.alive) {
                //hero's moving with arrows and fire
                this.sprite.body.velocity.x = 0;
                if (this.jump) {
                    this.sprite.body.velocity.y += 20;
                }
                if (this.sprite.body.y >= 465) {
                    this.jump = false;
                    this.sprite.body.velocity.y = 0;
                }

                if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                    this.sprite.body.velocity.x = -200;

                    this.sprite.scale.x = -1;
                    this.sprite.animations.play('walk', 12, false);
                }
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                    this.sprite.body.velocity.x = 200;

                    this.sprite.scale.x = 1;
                    this.sprite.animations.play('walk', 12, false);
                }

                if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                    if (this.jump !== true || this.sprite.body.touching.down) {
                        this.game.audio.jump.play();  // Audio of jump
                        this.sprite.body.velocity.y = -700;
                        this.jump = true;
                    }
                }

                if (this.game.input.keyboard.isDown(Phaser.KeyCode.F) && this.sprite.body.velocity.x == 0) {
                    this.fire();
                    this.sprite.animations.play('fire', 15, false);
                }
            }
            else {
                this.sprite.body.velocity.x = 0;
                if (this.sprite.body.y <= 470) {
                    this.sprite.body.velocity.y = 200;
                } else {
                    this.sprite.body.velocity.y = 0;
                }
            }
        }
        fire() {

            //generating bullet after 275ms
            if (this.shotTimer < this.game.time.now) {
                this.shotTimer = this.game.time.now + 275;
                this.game.audio.fire.play();

                let bulletVelocity = 0, bulletX = 0, bulletY = 0;
                if (this.sprite.scale.x > 0) {
                    bulletVelocity = 300;
                    bulletX = this.sprite.x + 50;
                    bulletY = this.sprite.y + 50;
                } else {
                    bulletVelocity = -300;
                    bulletY = this.sprite.y + 50;
                    bulletX = this.sprite.x - 50;
                }
                let bullet = this.bullets.create(bulletX, bulletY, 'bullet');
                this.game.physics.enable(bullet, Phaser.Physics.ARCADE);

                bullet.body.velocity.x = bulletVelocity;
            }
        }
        touchStar(player, star) {
            this.game.audio.star.play(); // Audio pick up star
            star.kill();
            this.game.starsScoreNum++;
            this.gui.starsScoreText.setText(this.game.starsScoreNum.toString());
        }
        killHero(player, enemy) {
            if (enemy.body.velocity.x !== 0) {
                this.isAlive(player, enemy);
            }

        }
        isAlive(player, enemy) {
            if (player.tint !== 0xff00ff) {
                player.tint = 0xff00ff;
                this.game.time.events.add(Phaser.Timer.SECOND * 2, () => { player.tint = 0xffffff }, this);
                if (this.gui.heards.children.length > 1) {
                    this.gui.heards.removeChildAt(0);
                    this.game.audio.hit.play(); // Audio when enemies hit the hero
                }
                else {
                    this.alive = false;
                    this.game.audio.bgMusic.pause();
                    this.game.audio.heroDeath.play();
                    setTimeout(() => {this.game.audio.bgMusic.play();}, 1500);
                    this.sprite.animations.play('die', 12, false);
                    this.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
                        this.gui.heards.removeChildAt(0);
                        player.kill();
                        this.game.state.start('Lose');
                    }, this);
                }
            }
        }
        win(player, sign) {
            this.game.state.start('Win');
        }

    }
    return Hero;
});
