define(function () {
    class AssetsLoader {
        start() { 
            //add ALL sprites here
            this.game.load.json('levelsConfig', 'dev/Scenes/Levels/levelsConfig.json');

            this.game.load.image('newGameButton', 'assets/newGameButton.png');
            this.game.load.image('selectLevel', 'assets/selectLevel.png');
            this.game.load.image('levelsHolder', 'assets/levelsHolder.png');
            this.game.load.image('availableLevel', 'assets/availableLevel.png');
            this.game.load.image('unavailableLevel', 'assets/unavailableLevel.png');
            this.game.load.image('activeStar', 'assets/activeStar.png');
            this.game.load.image('inactiveStar', 'assets/inactiveStar.png');
            this.game.load.image('scoreButton', 'assets/scoreButton.png');
            this.game.load.image('title', 'assets/title.png');
            this.game.load.image('panel', 'assets/panel.png');
            this.game.load.image('warning', 'assets/warning.png');
            this.game.load.image('muteBtn', 'assets/muteBtn.png');
            this.game.load.image('ban', 'assets/ban.png');

            this.game.load.image('score', 'assets/score.png');
            this.game.load.image('scoreBackButton', 'assets/back.png');          
            this.game.load.image('playerName', 'assets/playerName.png');       

            this.game.load.image('teamred', 'assets/teamred.png');
            this.game.load.image('cloud_1', 'assets/cloud_1.png');
            this.game.load.image('background_2', 'assets/background_2.png');
            this.game.load.image('background_1', 'assets/background_1.png');
            this.game.load.image('backButton', 'assets/backButton.png');
            this.game.load.spritesheet('gunman', 'assets/gunman.png', 94.3, 94, 21);
            this.game.load.spritesheet('zombie', 'assets/zombie.png', 100, 100, 14);
            this.game.load.image('bullet', 'assets/bullet.png');
            this.game.load.image('platforms','assets/ground1.png');
            this.game.load.image('ground2','assets/ground2.png');
            this.game.load.image('ground3','assets/ground3.png');
            this.game.load.image('boxes','assets/box.png');
            this.game.load.image('stars','assets/star.png');
            this.game.load.image('heard','assets/heard.png');
            this.game.load.image('starsScore','assets/StarsScore.png');
            this.game.load.image('starsScore','assets/heard.png');
            this.game.load.image('loseGame','assets/lose.png');
            this.game.load.image('okButton','assets/okButton.png');
            this.game.load.image('cancelButton','assets/cancelButton.png');

            this.game.load.image('puddles','assets/puddle.png');
            this.game.load.image('signs','assets/sign.png');

            this.game.load.image('winsign','assets/winsign.png');
            this.game.load.image('winPanel','assets/levelClean.png');
            this.game.load.image('resStar1','assets/star1.png');
            this.game.load.image('resStar2','assets/star2.png');
            this.game.load.image('resStar3','assets/star3.png');
            this.game.load.image('nextLevelButton','assets/nextLevel.png');
            this.game.load.image('mainMenuButton','assets/mainMenu.png');
            this.game.load.image('restartLevelButton','assets/restartLevel.png');
            // Audio load
            this.game.load.audio('bgSong', ['assets/audio/teamred-song-1.mp3','assets/audio/teamred-song-1.ogg']);
            this.game.load.audio('gunshot', ['assets/audio/gunshot.mp3','assets/audio/gunshot.ogg']);
            this.game.load.audio('zombieDeath', ['assets/audio/zombie-death.mp3','assets/audio/zombie-death.ogg']);
            this.game.load.audio('star', ['assets/audio/star.mp3','assets/audio/star.ogg']);
            this.game.load.audio('jump', ['assets/audio/jump.mp3','assets/audio/jump.ogg']);
            this.game.load.audio('hit', ['assets/audio/hit.mp3','assets/audio/hit.ogg']);
            this.game.load.audio('levelComplete', ['assets/audio/level-complete.mp3','assets/audio/level-complete.ogg']);
            this.game.load.audio('heroDeath', ['assets/audio/human-male-scream.mp3','assets/audio/human-male-scream.ogg']);

            this.game.load.spritesheet('dragon','assets/dragon.png',90,66,4);
            this.game.load.start();
        }
        create() {
            this.game.load.onLoadStart.add(this.loadStart, this);
            this.game.load.onFileComplete.add(this.fileComplete, this);
            this.game.load.onLoadComplete.add(this.loadComplete, this);
            this.text = this.game.add.text(32, 32, '', { fill: '#ffffff' });
            this.start();
        }
        fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
           this.text.setText("Loading ..." + progress);
        }
        loadStart() {
            this.text.setText("Loading ...");
        }
        loadComplete() {
            this.game.state.start("Menu");
        }
    }
    return new AssetsLoader();
});
