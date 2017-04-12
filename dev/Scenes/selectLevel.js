define(['gui', 'background', 'audio'], function (GUI, Background, Audio) {
    class SelectLevel {
        constructor() {
            this.sprites = {};
        }

        create() {
            //setting scalable screen
            // this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            // this.game.scale.pageAlignHorizontally = true;

            // if (!this.game.audio)   this.game.audio = new Audio(this.game);
            this.background = new Background(this.game);
            this.gui = new GUI(this.game);
            this.sprites['levelsHolder'] = this.game.add.sprite(this.game.world.centerX - 320, this.game.world.centerY - 214, 'levelsHolder');
            this.sprites['cancelButton'] = this.game.add.button(this.sprites['levelsHolder'].position.x + 595, this.sprites['levelsHolder'].position.y + 45, 'cancelButton', this.backToMenu, this);
            this.levelsList = [];   // List of levels
            this.stars = [];
            this.levelsList.score = [0]; //Array of scores of every level
            let nextLevelActiv = true;
            this.muteBtn = this.game.add.button(1200,630, 'muteBtn', this.gui.mute, this);
            this.muteBtn.fixedToCamera = true;
            if(this.game.sound.mute){
                this.sprites['ban'] = this.game.add.button(1200,625, 'ban', this.gui.resumeAudio, this);
                this.sprites['ban'].fixedToCamera = true;
            }

            for (let i = 0; i < 5; i++) {
                if (localStorage.getItem(this.game.playerName)) {
                    let currentUserResults = JSON.parse(localStorage.getItem(this.game.playerName));
                    if (currentUserResults['res'][i + 1]) {

                        let numStars = currentUserResults['res'][i + 1]['numStars'];
                        let button = this.game.add.button(this.sprites['levelsHolder'].position.x + ((i + 1) * 95),
                            this.sprites['levelsHolder'].position.y + 142, 'availableLevel', this.gui.startGameFrom);
                        button.level = i + 1;
                        this.levelsList[i] = button;

                        for (let j = 0; j < numStars; j++) {
                            this.stars[j] = this.game.add.sprite(this.levelsList[i].position.x + 17 + (j * 17),
                                this.levelsList[i].position.y + 60, 'activeStar');
                        }
                        for (let j = numStars; j < 3; j++) {
                            this.stars[j] = this.game.add.sprite(this.levelsList[i].position.x + 17 + (j * 17),
                                this.levelsList[i].position.y + 60, 'inactiveStar');
                        }
                    }
                    else {
                        if (nextLevelActiv) {
                            let button = this.game.add.button(this.sprites['levelsHolder'].position.x + ((i + 1) * 95),
                                this.sprites['levelsHolder'].position.y + 142, 'availableLevel', this.gui.startGameFrom);
                            button.level = i + 1;
                            this.levelsList[i] = button;

                            for (let j = 0; j < 3; j++) {
                                this.stars[j] = this.game.add.sprite(this.levelsList[i].position.x + 17 + (j * 17),
                                    this.levelsList[i].position.y + 60, 'inactiveStar');
                            }
                        }
                        else {
                            this.levelsList[i] = this.game.add.button(this.sprites['levelsHolder'].position.x + ((i + 1) * 95),
                                this.sprites['levelsHolder'].position.y + 130, 'unavailableLevel');
                        }
                        nextLevelActiv = false;
                    }
                }
                else {
                    if (nextLevelActiv) {
                        let button = this.game.add.button(this.sprites['levelsHolder'].position.x + ((i+1) * 95),
                            this.sprites['levelsHolder'].position.y + 142, 'availableLevel', this.gui.startGameFrom);
                        button.level = i + 1;
                        this.levelsList[i] = button;

                        for (let j = 0; j < 3; j++) {
                            this.stars[j] = this.game.add.sprite(this.levelsList[i].position.x + 17 + (j * 17),
                                this.levelsList[i].position.y + 60, 'inactiveStar');
                        }
                    }
                    else {
                        this.levelsList[i] = this.game.add.button(this.sprites['levelsHolder'].position.x + ((i + 1) * 95),
                            this.sprites['levelsHolder'].position.y + 130, 'unavailableLevel');
                    }
                    nextLevelActiv = false;
                }

                this.text = this.game.add.text(this.levelsList[i].centerX - 10, this.levelsList[i].centerY - 40, i + 1, { font: "32px 'Carter One'", fill: "#fff" });
                this.text.stroke = '#000';
                this.text.strokeThickness = 6;
            }

            for (let i = 5; i < 10; i++) {
                if (this.gui.maxAvailableLevel >= i + 1) {
                    this.levelsList[i] = this.game.add.button((this.sprites['levelsHolder'].position.x - 475) + ((i + 1) * 95), this.sprites['levelsHolder'].position.y + 282, 'availableLevel', this.startGame);
                } else {
                    this.levelsList[i] = this.game.add.button((this.sprites['levelsHolder'].position.x - 475) + ((i + 1) * 95), this.sprites['levelsHolder'].position.y + 270, 'unavailableLevel');
                }
                if (i === 9) {
                    this.text = this.game.add.text(this.levelsList[i].centerX - 20, this.levelsList[i].centerY - 40, i + 1, { font: "32px 'Carter One'", fill: "#fff" });
                } else {
                    this.text = this.game.add.text(this.levelsList[i].centerX - 10, this.levelsList[i].centerY - 40, i + 1, { font: "32px 'Carter One'", fill: "#fff" });
                }
                this.text.stroke = '#000';
                this.text.strokeThickness = 6;
            }
        }
        startGame() {
            this.game.state.start("Level");
        }
        update() {
            this.background.control();
        }

        backToMenu() {
            this.game.state.start("Menu");
        }
    }
    return new SelectLevel();
});
