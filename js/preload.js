var player
var pontuacao = 0
var tecla
var pontuacaoUI = "0"
var puloc

class preload extends Phaser.Scene
{
    constructor()
    {
        super("preload")
    }

    preload()
    {

        //miriangostosa
        this.load.image("bau","/assets/bau.png")
        this.load.image("playBT","/assets/btn_play.png")
        //this.load.image("chao","/assets/chao.png")
        //this.load.image("fundo","/assets/fundo.png")
        this.load.image("jogadorCapa","/assets/jogadorCapa.png")
        this.load.image("rocha","/assets/rocha.png")
        //this.load.spritesheet("player", "assets/dude.png", { frameWidth: 32, frameHeight: 48 })

        //me
        this.load.image("chao","/assets/_chao.png")
        this.load.image("fundo", "/assets/_fundo.png")
        this.load.image("btn_play", "/assets/_btn_play.png")
        this.load.spritesheet("player", "assets/_player.png", { frameWidth: 25, frameHeight: 35})
        this.load.image("plataforma","/assets/_plataforma.png")
        this.load.image("inimigo","/assets/_inimigo.png")
        this.load.image("faca","/assets/_faca.png")
        this.load.image("chave","/assets/_chave.png")

        this.load.audio("audioFundo", "/assets/nota4.wav")
        this.load.audio("audioPulo", "/assets/aud_pulo.wav")
    }

    create()
    {
        // if (!puloc) {
        //     puloc = this.sound.add("audioPulo");
        //     puloc.play({ loop: true });
        // }

        //this.audioS = 

        //this.add.image(400, 300, "fundo") //background        
        //this.add.image(600, 300, "jogadorCapa") //leprechaun
        //this.add.image(0, 500, "chao").setOrigin(0,0) //chao

        //this.playBT = this.add.image(350, 225, "playBT") //botao        
        //this.playBT.setInteractive() //set butao como interativo
        //this.playBT.on("pointerdown", ()=>this.scene.start("Cena01")) //quando clicado, leva pra cena 01

        var fundo = this.add.image(0, 0, "fundo").setOrigin(0, 0) //background
        fundo.setScale(2.7)

        var btn_play = this.add.image(400, 300, "btn_play")
        btn_play.setInteractive()
        btn_play.on("pointerdown", ()=>this.scene.start("Cena01"))

        //var hitArea = new Phaser.Geom.Rectangle(0, 0, 100, 100);
        //btn_play.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);
    }
}