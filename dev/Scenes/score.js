define(['gui', 'background'], function (GUI, Background) {
    class Score {
        constructor() {

        }
        create() {
            this.background = new Background(this.game);
            this.gui = new GUI(this.game, this.game.LEVEL);
            this.gui.score();
        }
        update(){
            this.background.control();
        }
    }
    return new Score();
});
