define(['gui', 'background'], function (GUI, Background) {
    class Score {
        constructor() {
            this.sprites = {};
        }
        create() {
            this.background = new Background(this.game);
            this.gui = new GUI(this.game, this.game.LEVEL);
            this.gui.score();
            this.muteBtn = this.game.add.button(1200,630, 'muteBtn', this.mute, this);
            this.muteBtn.fixedToCamera = true;
            if(this.game.sound.mute){
                this.sprites['ban'] = this.game.add.button(1200,625, 'ban', this.resumeAudio, this);
                this.sprites['ban'].fixedToCamera = true;
            }
        }
        update(){
            this.background.control();
        }
    }
    return new Score();
});
