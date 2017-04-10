define(function () {
    class Background {
        constructor(game) {
            this.game = game;
            this.sprites = {};

            const centerX = this.game.world.centerX;
            const centerY = this.game.world.centerY;



            this.sprites['cloud_1'] = this.game.add.tileSprite(0
                , this.game.height - this.game.cache.getImage('cloud_1').height
                , 30000
                , this.game.cache.getImage('cloud_1').height
                , 'cloud_1');

            this.sprites['background_2'] = this.game.add.tileSprite(0
                , this.game.height - this.game.cache.getImage('background_2').height
                , 30000
                , this.game.cache.getImage('background_2').height
                , 'background_2');

            this.sprites['background_1'] = this.game.add.tileSprite(0
                , this.game.height - this.game.cache.getImage('background_1').height
                , 30000
                , this.game.cache.getImage('background_1').height
                , 'background_1');
        }
        control() {
            //add here some parallax effect
            this.sprites['cloud_1'].tilePosition.x -= 0.5;
        }
    }
    return Background;
});