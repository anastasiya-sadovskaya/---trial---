define(['gui', 'background'], function (GUI, Background) {
    class Lose {
        constructor() {
            this.sprites = {};
        }
        create() {
            this.background = new Background(this.game);
            this.gui = new GUI(this.game, this.game.LEVEL);
            this.gui.loseGame();
            this.muteBtn = this.game.add.button(1200,630, 'muteBtn', this.mute, this);
            this.muteBtn.fixedToCamera = true;
            if(this.game.sound.mute){
                this.sprites['ban'] = this.game.add.button(1200,625, 'ban', this.resumeAudio, this);
                this.sprites['ban'].fixedToCamera = true;
            }
        }

        mute(){
            this.sprites['ban'] = this.game.add.button(1200,625, 'ban', this.resumeAudio, this);
            this.sprites['ban'].fixedToCamera = true;
            this.game.sound.mute = true;
            //this.game.audio.jump.pause();
            //this.game.audio.bgMusic.pause();
        }

        resumeAudio(){
            this.sprites['ban'].kill();
            this.game.sound.mute = false;
        }

        update(){
            this.background.control();
        }
    }
    return new Lose();
});
