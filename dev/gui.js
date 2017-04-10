define(function () {
    class GUI {
        constructor(game, level) {
            this.game = game;
            this.sprites = {};
            this.centerX = this.game.world.centerX;
            this.centerY = this.game.world.centerY;
            this.LEVEL=level;
            this.levelConfig = this.game.cache.getJSON('levelsConfig')[this.LEVEL];
            this.maxAvailableLevel = 1;
            this.curentZKScore=0;
            this.curentSScore=0;
            this.starCount = 0;
            this.playerName =  prompt('Enter your name');
            this.player = {'name' : this.playerName, 'levels' : 1, 'stars' : 0, 'total' : 0};
            localStorage.setItem( this.playerName, this.player);
        }
        menu() {

            this.sprites['newGameButton'] = this.game.add.button(this.centerX - 105, this.centerY-100,
                'newGameButton', this.startGame, this);
            this.sprites['selectLevel'] = this.game.add.button(this.centerX - 105, this.centerY,
                'selectLevel', this.selectLevel, this);
            this.sprites['newGameButton'] = this.game.add.button(this.centerX - 105, this.centerY + 100,
                'scoreButton', this.startGame, this);

            this.sprites['title'] = this.game.add.sprite(this.centerX - 320, this.centerY - 280, 'title');

           // this.text = this.game.add.text(32, 32, 'Use arrows to moving; F - fire', { fill: '#ffffff' });
        }

        level() {
           // this.level++;
            this.sprite = this.game.add.button(this.centerX - 600, this.centerY - 350, 'backButton', this.goBack, this);
            this.sprite.fixedToCamera = true;
            //generating heards
            this.heards=this.game.add.physicsGroup();
            for (let i = 0; i <=4 ; i++) {
                this.heards.create(this.game.width-225+i*40,100, 'heard');
            }
            this.heards.fixedToCamera = true;
            //stars score image
            this.starsScore=this.game.add.sprite(1060, 10, 'starsScore');
            this.starsScore.fixedToCamera = true;
            //stars score text
            this.starsScoreText = this.game.add.text(1170, 37,'0', { fill: '#ffffff', font: 'bold 30px Skranji-Bold' });
            this.starsScoreText.fixedToCamera = true;
        }
        startGame() {
            this.game.state.start("Level");
        }

        selectLevel(){
            this.game.state.start("SelectLevel");
        }

        goBack() {
            this.game.state.start("Menu");
            this.game.world.setBounds(-300, 0, 1920, 720);
        }
        loseGame(){
            this.game.world.setBounds(-300, 0, 1920, 720);
            this.sprites['loseGame'] = this.game.add.sprite(464, 250, 'loseGame');
            this.sprites['restartGame'] = this.game.add.button(530, 390,'okButton', this.startGame, this);
            this.sprites['closeGame'] = this.game.add.button(690, 390,'cancelButton', this.goBack, this);
        }
        winGame(){
            this.game.world.setBounds(-300, 0, 1920, 720);
            this.sprites['winPanel']=this.game.add.sprite(400, 90, 'winPanel');
            this.sprites['mainMenu'] = this.game.add.button(480, 570,'mainMenuButton', this.goBack, this);
            this.sprites['restGame'] = this.game.add.button(605, 570,'restartLevelButton', this.startGame, this);
            this.sprites['nextLevel'] = this.game.add.button(730, 570,'nextLevelButton', this.startGame, this);
            this.zombieKilledText = this.game.add.text(720, 338,'0', { fill: '#000000', font: 'bold 36px Skranji-Bold' });
            this.starsScoreText = this.game.add.text(720, 386,'0', { fill: '#000000', font: 'bold 36px Skranji-Bold' });
            this.totallScoreText = this.game.add.text(720, 434,'0', { fill: '#000000', font: 'bold 36px Skranji-Bold' });
            this.bestScoreText = this.game.add.text(720, 482,'0', { fill: '#000000', font: 'bold 36px Skranji-Bold' });
            this.maxScore = this.levelConfig['stars'].length+this.levelConfig['platforms'].length*5;
            let max = this.game.score>this.game.starsScoreNum?this.game.score:this.game.starsScoreNum;
            this.game.time.events.repeat(Phaser.Timer.SECOND/max*1.5, max, this.writeRes, this);
            if(this.maxAvailableLevel == this.level.LEVEL){
                this.maxAvailableLevel = this.level.LEVEL + 1;
            }
            console.log(this.level.LEVEL);
            console.log(this.maxAvailableLevel);
        }
        writeRes(){
            if (this.curentZKScore<this.game.score){
                this.curentZKScore++;
                this.zombieKilledText.setText(this.curentZKScore);
            }
            if (this.curentSScore<this.game.starsScoreNum){
                this.curentSScore++;
                this.starsScoreText.setText(this.curentSScore);
            }
            this.totallScoreText.setText(this.curentZKScore*5+this.curentSScore);
            if (this.curentZKScore*5+this.curentSScore>=0.25*this.maxScore){
                this.sprites['resStar1'] = this.game.add.sprite(500, 235, 'resStar1');
                localStorage.setItem(this.player.stars, 1);
            }
            if (this.curentZKScore*5+this.curentSScore>=0.5*this.maxScore){
                this.sprites['resStar2'] = this.game.add.sprite(591, 209, 'resStar2');
                localStorage.setItem(this.player.stars, 2);
            }
            if (this.curentZKScore*5+this.curentSScore>=0.75*this.maxScore){
                this.sprites['resStar3'] = this.game.add.sprite(701, 235, 'resStar3');
                localStorage.setItem(this.player.stars, 3);
            }

        }
    }
    return GUI;
});
