define(['gui', 'background', 'audio'], function (GUI, Background, Audio) {
    class Menu {
        constructor() {
            this.sprites = {};
        }
        create() {
            //setting scalable screen
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.pageAlignHorizontally = true;

            if (!this.game.audio)   this.game.audio = new Audio(this.game);
            this.background = new Background(this.game);
            this.gui = new GUI(this.game);
            this.gui.menu();
        }
        update(){
            this.background.control();
        }
    }
    return new Menu();
});
