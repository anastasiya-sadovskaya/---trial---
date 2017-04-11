requirejs.config({
    baseUrl: '',
    paths: {
        menu: 'dev/Scenes/menu',
        selectLevel: 'dev/Scenes/selectLevel',
        lose: 'dev/Scenes/lose',
        win: 'dev/Scenes/win',
        level: 'dev/Scenes/Levels/level',
        assetsLoader: 'dev/assetsLoader',
        hero: 'dev/hero',
        zombies: 'dev/zombies',
        background: 'dev/background',
        audio: 'dev/audio',
        environment: 'dev/environment',
        gui: 'dev/gui',
        score: 'dev/Scenes/score'
    }
});

requirejs(['dev/scenesLoader']);
