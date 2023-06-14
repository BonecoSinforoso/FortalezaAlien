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
        this.load.image("chao2","/assets/LabTileset/Lab/chao2.png")
        this.load.image("mesa1","/assets/LabTileset/Lab/862-0.png")
        this.load.image("prateleira","/assets/LabTileset/Lab/1005-0.png")
        this.load.image("plataforma2","/assets/LabTileset/Lab/952-0.png")
        this.load.image("ativador","/assets/LabTileset/Lab/961-0.png")
        this.load.image("laser","/assets/LabTileset/Lab/laser3.png")
        this.load.image("ChaveTeste","/assets/LabTileset/Lab/chaveBoa.png")
        this.load.image("porta","/assets/LabTileset/Lab/555-0.png")
        this.load.image("cientista","/assets/LabTileset/Lab/cientista.png")
        this.load.image("bateria","/assets/LabTileset/Lab/859-1.png")
        this.load.image("janela","/assets/LabTileset/Lab/572-5.png")
        this.load.image("barreira","/assets/LabTileset/Lab/931-0.png")
        this.load.image("fundo", "/assets/_fundo.png")
        this.load.image("fundoMenu", "/assets/_fundoMenu.jpg")
        this.load.image("fundo2", "/assets/LabTileset/Backgrounds/984-0.png")
        this.load.image("btn_play", "/assets/_btn_play02.png")
        this.load.spritesheet("player", "assets/_alien.png", { frameWidth: 25, frameHeight: 35})
        this.load.image("plataforma","/assets/_plataforma.png")
        this.load.image("inimigo","/assets/_inimigo.png")
        this.load.image("faca","/assets/_faca.png")
        this.load.image("chave","/assets/_chave.png")
        this.load.image("btn_menu","/assets/btn_menu.png")
        this.load.image("txt_titulo","/assets/txt_titulo.png")
    }

    create()
    {
        this.add.image(0, 0, "fundoMenu").setOrigin(0, 0)
        var titulo = this.add.image(145, 200, "txt_titulo").setOrigin(0, 0)
        titulo.setScale(1.5)

        var btn_play = this.add.image(400, 400, "btn_play")
        btn_play.setInteractive()
        btn_play.on("pointerdown", ()=>this.scene.start("Cena02"))

        pontuacao = 0;
    }
}