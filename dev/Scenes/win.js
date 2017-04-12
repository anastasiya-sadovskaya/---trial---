define(['gui', 'background'], function (GUI, Background) {
    class Win {
        constructor() {
            this.sprites = {};
        }
        create() {
            if(!this.game.sound.mute){
                this.game.audio.lvlComplete.play();
            }
            this.background = new Background(this.game);
            this.gui = new GUI(this.game, this.game.LEVEL);
            this.gui.winGame();
            this.muteBtn = this.game.add.button(1200,630, 'muteBtn', this.gui.mute, this);
            this.muteBtn.fixedToCamera = true;
            if(this.game.sound.mute){
                this.sprites['ban'] = this.game.add.button(1200,625, 'ban', this.gui.resumeAudio, this);
                this.sprites['ban'].fixedToCamera = true;
            }
        }
        update(){
            this.background.control();
        }
    }
    return new Win();
});
