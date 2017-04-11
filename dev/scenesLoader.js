define(['assetsLoader', 'menu', 'selectLevel', 'lose', 'win', 'score', 'level'],
 function (AssetsLoader, Menu, SelectLevel, Lose, Win, Score, ...levels) {

    const game = new Phaser.Game(1280, 720, Phaser.CANVAS, "game");

    //delete loading placeholder
    document.getElementById('loading').style.display = 'none';

    //add all scenes below, all resources are loaded in AssetsLoader
    game.state.add("AssetsLoader", AssetsLoader);
    game.state.add("Menu", Menu);
    game.state.add("Score", Score);
    game.state.add("SelectLevel", SelectLevel);
    game.state.add("Level", levels[0]);
    game.state.add("Lose",Lose);
    game.state.add("Win",Win);
    game.state.start("AssetsLoader");

});
