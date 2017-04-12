define(['gui', 'background'], function (GUI, Background) {
    class Win {
        constructor() {

        }
        create() {
            if(!this.game.muteStat){
                this.game.audio.lvlComplete.play();
            }
            this.background = new Background(this.game);
            this.gui = new GUI(this.game, this.game.LEVEL);
            this.gui.winGame();
        }
        update(){
            this.background.control();
        }
    }
    return new Win();
});
