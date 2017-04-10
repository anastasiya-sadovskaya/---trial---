define(['gui', 'background'], function (GUI, Background) {
    class Lose {
        constructor() {
            this.sprites = {};
        }
        create() {
            this.background = new Background(this.game);
            this.gui = new GUI(this.game, this.game.LEVEL);
            this.gui.loseGame();
        }
        update(){
            this.background.control();
        }
    }
    return new Lose();
});
