define(function () {
    class Audio {
        constructor(game) {
            this.game = game;
            
            // Background music
            this.bgMusic = this.game.add.audio('bgSong');
            this.bgMusic.loop = true;
            this.bgMusic.loopFull(0.6);

            // On fire audio
            this.fire = this.game.add.audio('gunshot');

            // Zombie death
            this.zombieDeath = this.game.add.audio('zombieDeath');

            // Pick up star
            this.star = this.game.add.audio('star');

            // On jump
            this.jump = this.game.add.audio('jump');
            this.jump.volume = 0.4;

            // On damage hero
            this.hit = this.game.add.audio('hit');

            // Hero die
            this.heroDeath = this.game.add.audio('heroDeath');

            // level complete audio
            this.lvlComplete = this.game.add.audio('levelComplete');
        }
    }
    return Audio;
});
