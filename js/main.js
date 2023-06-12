const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene:[preload, Cena01],
    physics:{
        default:"arcade",
        arcade:
        {
            gravity:{y: 500},
            debug: false
        }
    }
}

var game = new Phaser.Game(config)