define(function () {
    class GUI {
        constructor(game, level) {
            this.game = game;
            this.sprites = {};
            this.centerX = this.game.world.centerX;
            this.centerY = this.game.world.centerY;
            this.LEVEL = level;
            this.levelConfig = this.game.cache.getJSON('levelsConfig')[this.LEVEL];
            this.maxAvailableLevel = 1;
            this.curentZKScore = 0;
            this.curentSScore = 0;
            this.playersCount = 0;
            this.total = 0;
            //this.game.sound.mute = false;
            this.currentTotal = 0;
            this.players = [];
        }
        menu() {

            this.sprites['newGameButton'] = this.game.add.button(this.centerX - 105, this.centerY - 100,
                'newGameButton', this.startGame, this);
            this.sprites['selectLevel'] = this.game.add.button(this.centerX - 105, this.centerY,
                'selectLevel', this.selectLevel, this);
            this.sprites['scoreButton'] = this.game.add.button(this.centerX - 105, this.centerY + 100,
                'scoreButton', this.loadScore, this);

            this.sprites['title'] = this.game.add.sprite(this.centerX - 320, this.centerY - 280, 'title');

            this.sprites['playerName'] = this.game.add.sprite(this.centerX + 250, this.centerY + 80, 'playerName');
            this.sprites['restartLevelButton'] = this.game.add.button(this.centerX + 370,
                this.centerY + 170, 'restartLevelButton', this.selectProfile, this);
            this.text = this.game.add.text(this.centerX + 335, this.centerY + 135, '', { fill: '#000', font: 'bold 30px Skranji-Bold' });
            this.text.setText('');

            if (JSON.parse(localStorage.getItem('defaultName'))) {
                this.text.setText(JSON.parse(localStorage.getItem('defaultName')));
                this.game.playerName = JSON.parse(localStorage.getItem('defaultName'));
            } else {
                this.text.setText('undefined');
                localStorage.setItem('defaultName', JSON.stringify('undefined'));
                this.game.playerName = 'undefined';
            }
            this.muteBtn = this.game.add.button(1200,630, 'muteBtn', this.mute, this);
            this.muteBtn.fixedToCamera = true;
            if(this.game.sound.mute){
                this.sprites['ban'] = this.game.add.button(1200,625, 'ban', this.resumeAudio, this);
                this.sprites['ban'].fixedToCamera = true;
            }

            // this.text = this.game.add.text(32, 32, 'Use arrows to moving; F - fire', { fill: '#ffffff' });
        }
        selectProfile() {
            let name = prompt("New player?");
            this.playersCount++;
            let player = JSON.parse(localStorage.getItem(name));
            if (!player) {
                //let levelRes=[];
                //levelRes[this.LEVEL]={'score': 0, 'numStars':0};
                //localStorage.setItem(name, JSON.stringify({ 'name': name, 'res': levelRes}));
                localStorage.setItem('defaultName', JSON.stringify(name));
                this.game.playerName = name;
            } else {
                this.game.playerName = name;

                //localStorage.setItem(this.game.playerName, JSON.stringify({ 'name': this.game.playerName, 'res': [] }));
                //console.log(JSON.parse(localStorage.getItem(this.game.playerName)));

                localStorage.setItem('defaultName', JSON.stringify(name));
            }
            this.text.setText(name);
        }
        level() {
            // this.level++;
            this.sprite = this.game.add.button(this.centerX - 600, this.centerY - 350, 'backButton', this.warning, this);
            this.sprite.fixedToCamera = true;
            //generating heards
            this.heards = this.game.add.physicsGroup();
            for (let i = 0; i <= 4; i++) {
                this.heards.create(this.game.width - 225 + i * 40, 100, 'heard');
            }
            this.heards.fixedToCamera = true;

            this.levelNum = this.game.add.sprite(50, 630, 'panel');
            this.levelNum.text = this.game.add.text(120, 640, 'LEVEL    ' + this.LEVEL, { fill: '#ffffff', font: 'bold 32px Carter One' });
            this.levelNum.text.stroke = '#000';
            this.levelNum.text.strokeThickness = 6;
            this.levelNum.fixedToCamera = true;
            this.levelNum.text.fixedToCamera = true;
            //stars score image
            this.starsScore = this.game.add.sprite(1060, 10, 'starsScore');
            this.starsScore.fixedToCamera = true;
            //stars score text
            this.starsScoreText = this.game.add.text(1170, 37, '0', { fill: '#ffffff', font: 'bold 30px Skranji-Bold' });
            this.starsScoreText.fixedToCamera = true;
            this.muteBtn = this.game.add.button(1200,630, 'muteBtn', this.mute, this);
            this.muteBtn.fixedToCamera = true;
            if(this.game.sound.mute){
                this.sprites['ban'] = this.game.add.button(1200,625, 'ban', this.resumeAudio, this);
                this.sprites['ban'].fixedToCamera = true;
            }
        }

        warning(){
            //this.game.paused = true;
            this.warningStat = true;
            this.sprites['warningPanel'] = this.game.add.sprite(450, 250, 'warning');
            this.sprites['ok'] = this.game.add.button(this.sprites['warningPanel'].centerX + 50, this.sprites['warningPanel'].position.y + 140, 'cancelButton', this.returnGame, this);
            this.sprites['cancel'] = this.game.add.button(this.sprites['warningPanel'].centerX - 120, this.sprites['warningPanel'].position.y + 140, 'okButton', this.goBack, this);
            this.sprites['warningPanel'].fixedToCamera = true;
            this.sprites['ok'].fixedToCamera = true;
            this.sprites['cancel'].fixedToCamera = true;
        }

        returnGame(){
            this.sprites['warningPanel'].kill();
            this.sprites['ok'].kill();
            this.sprites['cancel'].kill();
            this.warningStat = false;
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

        goBack() {
            this.game.state.start("Menu");
            this.game.world.setBounds(-300, 0, 1920, 720);
        }

        nextLvl() {
            this.game.LEVEL++;
            this.game.state.start("Level");
        }
        reStartGame() {
            this.game.state.start("Level");
        }
        score() {
            this.sprites['score'] = this.game.add.sprite(this.centerX - 220, this.centerY - 350, 'score');
            this.sprites['scoreBackButton'] = this.game.add.button(this.centerX - 30, this.centerY + 190,
                'scoreBackButton', this.goBack, this);
            
            

            for (let i = 0; i < this.playersCount; i++){
                 this.players.push(localStorage.getItem(localStorage.key(i)))
            };

            this.sprites.score.text = this.game.add.text(500, 500, 'this.players[0]', { fill: '#ffffff', font: 'bold 30px Skranji-Bold' });

            //players.sort(function(a,b) {return (a.last_nom > b.last_nom) ? 1 : ((b.last_nom > a.last_nom) ? -1 : 0);} );

            // for (let i=0;i<localStorage.length;i++){
            //     let key=localStorage.key(i);
            //     console.log(key);
            // }
        }
        loadScore() {
            this.game.state.start("Score");
        }
        startGame() {
            this.game.LEVEL = 1;
            this.game.state.start("Level");
        }
        startGameFrom(btn) {
            this.game.LEVEL = btn.level;
            this.game.state.start("Level");
        }
        selectLevel() {
            this.game.state.start("SelectLevel");
        }

        loseGame() {
            this.game.world.setBounds(-300, 0, 1920, 720);
            this.sprites['loseGame'] = this.game.add.sprite(464, 250, 'loseGame');
            this.sprites['restartGame'] = this.game.add.button(530, 390, 'okButton', this.reStartGame, this);
            this.sprites['closeGame'] = this.game.add.button(690, 390, 'cancelButton', this.goBack, this);
        }
        winGame() {
            this.game.world.setBounds(-300, 0, 1920, 720);

            this.sprites['winPanel'] = this.game.add.sprite(400, 90, 'winPanel');
            this.sprites['mainMenu'] = this.game.add.button(480, 570, 'mainMenuButton', this.goBack, this);
            this.sprites['restGame'] = this.game.add.button(605, 570, 'restartLevelButton', this.reStartGame, this);
            this.sprites['nextLevel'] = this.game.add.button(730, 570, 'nextLevelButton', this.nextLvl, this);
            this.zombieKilledText = this.game.add.text(720, 338, '0', { fill: '#000000', font: 'bold 36px Skranji-Bold' });
            this.starsScoreText = this.game.add.text(720, 386, '0', { fill: '#000000', font: 'bold 36px Skranji-Bold' });
            this.totallScoreText = this.game.add.text(720, 434, '0', { fill: '#000000', font: 'bold 36px Skranji-Bold' });
            this.bestScoreText = this.game.add.text(720, 482, '0', { fill: '#000000', font: 'bold 36px Skranji-Bold' });
            this.maxScore = this.levelConfig['stars'].length + this.game.zomdiesCount * 5;
            let max = this.game.score > this.game.starsScoreNum ? this.game.score : this.game.starsScoreNum;
            this.game.time.events.repeat(Phaser.Timer.SECOND / max * 1.5, max, this.writeRes, this);

            //write to localStorage
            let currentScore = this.game.score * 5 + this.game.starsScoreNum;
            this.total = JSON.parse(localStorage.getItem(this.game.playerName['total'])) || 0;
            this.bestScore = currentScore;
            
            let numStars = 0;
            if (currentScore >= 0.75 * this.maxScore) {
                numStars = 3;
            }
            else if (currentScore >= 0.5 * this.maxScore) {
                numStars = 2;
            }
            else if (currentScore >= 0.25 * this.maxScore) {
                numStars = 1;
            }
            let currentUserResults=JSON.parse(localStorage.getItem(this.game.playerName));
            if (currentUserResults){
              if (currentUserResults['res'][this.LEVEL]) {
                  let oldScore = currentUserResults['res'][this.LEVEL]['score'];
                  if (currentScore > oldScore) {
                      this.bestScore = currentScore;
                      //if(this.total != 0){
                      this.total = this.total - oldScore + this.bestScore;
                     // } 
                      //rewrite
                      currentUserResults['res'][this.LEVEL]['score'] = currentScore;
                      currentUserResults['res'][this.LEVEL]['numStars'] = numStars;
                      currentUserResults['total'] = this.total;

                      localStorage.setItem(this.game.playerName, JSON.stringify(currentUserResults));
                  }
                  else {
                      this.bestScore = currentUserResults['res'][this.LEVEL]['score'];
                      this.total = currentUserResults['total'];
                  }

            //   } else if(currentUserResults['total']){
            //         let oldTotal = currentUserResults['total'];
              }else {
                  currentUserResults['res'][this.LEVEL]={'score': currentScore, 'numStars':numStars};
                  this.total = JSON.parse(localStorage.getItem(this.game.playerName['total']));
                  this.total += currentScore;
                  currentUserResults['total'] = this.total;
                  localStorage.setItem(this.game.playerName, JSON.stringify(currentUserResults));
              }

            }
            else{
              let levelRes=[];
              levelRes[this.LEVEL]={'score': currentScore, 'numStars':numStars};
              let total = currentScore;
              localStorage.setItem(this.game.playerName, JSON.stringify({ 'name': this.game.playerName, 'res': levelRes, 'total': total}));
            }

            this.curPlayer = JSON.parse(localStorage.getItem(this.game.playerName));
            var curTotal = 0;
            for (let key in this.curPlayer.res){
                curTotal += this.curPlayer.key;
            }
            this.total = curTotal;
            this.curPlayer.total = this.total;
            localStorage.setItem(this.game.playerName, this.curPLayer);

            if (this.maxAvailableLevel == this.level.LEVEL) {
                this.maxAvailableLevel = this.level.LEVEL + 1;
            }
        }
        writeRes() {
            if (this.curentZKScore < this.game.score) {
                this.curentZKScore++;
                this.zombieKilledText.setText(this.curentZKScore);
            }
            if (this.curentSScore < this.game.starsScoreNum) {
                this.curentSScore++;
                this.starsScoreText.setText(this.curentSScore);
            }
            this.totallScoreText.setText(this.curentZKScore * 5 + this.curentSScore);
            this.bestScoreText.setText(this.bestScore);
            if (this.curentZKScore * 5 + this.curentSScore >= 0.25 * this.maxScore) {
                this.sprites['resStar1'] = this.game.add.sprite(500, 235, 'resStar1');
            }
            if (this.curentZKScore * 5 + this.curentSScore >= 0.5 * this.maxScore) {
                this.sprites['resStar2'] = this.game.add.sprite(591, 209, 'resStar2');
            }
            if (this.curentZKScore * 5 + this.curentSScore >= 0.75 * this.maxScore) {
                this.sprites['resStar3'] = this.game.add.sprite(701, 235, 'resStar3');
            }

        }
    }
    return GUI;
});
