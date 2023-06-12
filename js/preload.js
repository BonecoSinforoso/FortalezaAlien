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
        var fundo = this.add.image(0, 0, "fundo").setOrigin(0, 0)
        fundo.setScale(2.7)

        var btn_play = this.add.image(400, 300, "btn_play")
        btn_play.setInteractive()
        btn_play.on("pointerdown", ()=>this.scene.start("Cena01"))

        //var hitArea = new Phaser.Geom.Rectangle(0, 0, 100, 100);
        //btn_play.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);
    }
}