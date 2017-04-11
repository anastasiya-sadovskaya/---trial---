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

            // this.text = this.game.add.text(32, 32, 'Use arrows to moving; F - fire', { fill: '#ffffff' });
        }
        selectProfile() {
            let name = prompt("New player?");
            //let player = JSON.parse(localStorage.getItem(name));
            let player = null;
            if (!player) {
                localStorage.setItem(name, JSON.stringify({ 'name': name, 'score': 0, 'level': 1 }));
                localStorage.setItem('defaultName', JSON.stringify(name));
                this.game.playerName = name;
                let player = JSON.parse(localStorage.getItem(name));
                this.game.player = player;
            } else {
                this.game.playerName = name;
                let player = JSON.parse(localStorage.getItem(name));
                this.game.player = player;

                localStorage.setItem(this.game.playerName, JSON.stringify({ 'name': this.game.playerName, 'score': 100, 'level': 1 }));
                console.log(JSON.parse(localStorage.getItem(this.game.playerName)));

                localStorage.setItem('defaultName', JSON.stringify(name));
            }
            this.text.setText(name);
        }
        level() {
            // this.level++;
            this.sprite = this.game.add.button(this.centerX - 600, this.centerY - 350, 'backButton', this.goBack, this);
            this.sprite.fixedToCamera = true;
            //generating heards
            this.heards = this.game.add.physicsGroup();
            for (let i = 0; i <= 4; i++) {
                this.heards.create(this.game.width - 225 + i * 40, 100, 'heard');
            }
            this.heards.fixedToCamera = true;
            //stars score image
            this.starsScore = this.game.add.sprite(1060, 10, 'starsScore');
            this.starsScore.fixedToCamera = true;
            //stars score text
            this.starsScoreText = this.game.add.text(1170, 37, '0', { fill: '#ffffff', font: 'bold 30px Skranji-Bold' });
            this.starsScoreText.fixedToCamera = true;
        }
        score() {
            this.sprites['score'] = this.game.add.sprite(this.centerX - 220, this.centerY - 350, 'score');
            this.sprites['scoreBackButton'] = this.game.add.button(this.centerX - 30, this.centerY + 190,
                'scoreBackButton', this.goBack, this);
        }
        loadScore() {
            this.game.state.start("Score");
        }
        startGame() {
            this.game.state.start("Level");
        }

        selectLevel() {
            this.game.state.start("SelectLevel");
        }

        goBack() {
            this.game.state.start("Menu");
            this.game.world.setBounds(-300, 0, 1920, 720);
        }
        loseGame() {
            this.game.world.setBounds(-300, 0, 1920, 720);
            this.sprites['loseGame'] = this.game.add.sprite(464, 250, 'loseGame');
            this.sprites['restartGame'] = this.game.add.button(530, 390, 'okButton', this.startGame, this);
            this.sprites['closeGame'] = this.game.add.button(690, 390, 'cancelButton', this.goBack, this);
        }
        winGame() {
            this.game.world.setBounds(-300, 0, 1920, 720);

            this.sprites['winPanel'] = this.game.add.sprite(400, 90, 'winPanel');
            this.sprites['mainMenu'] = this.game.add.button(480, 570, 'mainMenuButton', this.goBack, this);
            this.sprites['restGame'] = this.game.add.button(605, 570, 'restartLevelButton', this.startGame, this);
            this.sprites['nextLevel'] = this.game.add.button(730, 570, 'nextLevelButton', this.startGame, this);
            this.zombieKilledText = this.game.add.text(720, 338, '0', { fill: '#000000', font: 'bold 36px Skranji-Bold' });
            this.starsScoreText = this.game.add.text(720, 386, '0', { fill: '#000000', font: 'bold 36px Skranji-Bold' });
            this.totallScoreText = this.game.add.text(720, 434, '0', { fill: '#000000', font: 'bold 36px Skranji-Bold' });
            this.bestScoreText = this.game.add.text(720, 482, '0', { fill: '#000000', font: 'bold 36px Skranji-Bold' });
            this.maxScore = this.levelConfig['stars'].length + this.game.zomdiesCount * 5;
            let max = this.game.score > this.game.starsScoreNum ? this.game.score : this.game.starsScoreNum;
            this.game.time.events.repeat(Phaser.Timer.SECOND / max * 1.5, max, this.writeRes, this);

            //write to localStorage
            let currentScore = this.game.score * 5 + this.game.starsScoreNum;
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

            if (localStorage.getItem('Level' + this.LEVEL)) {
                let oldScore = JSON.parse(localStorage.getItem('Level' + this.LEVEL));
                if (currentScore > oldScore.score) {
                    this.bestScore = currentScore;
                    //rewrite
                    let obj = {};
                    obj.score = currentScore;
                    obj.numStars = numStars;
                    localStorage.setItem('Level' + this.LEVEL, JSON.stringify(obj));
                }
                else {
                    this.bestScore = oldScore.score;
                }

            } else {
                let obj = {};
                obj.score = currentScore;
                obj.numStars = numStars;
                localStorage.setItem('Level' + this.LEVEL, JSON.stringify(obj));
            }

            localStorage.setItem(this.game.playerName, JSON.stringify({ 'name': this.game.playerName, 'score': currentScore, 'level': this.LEVEL + 1 }));


            // if (this.maxAvailableLevel == this.level.LEVEL) {
            //     this.maxAvailableLevel = this.level.LEVEL + 1;
            // }
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
