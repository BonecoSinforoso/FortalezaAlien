class Cena03 extends Phaser.Scene
{
    constructor()
    {
        super("Cena03")
    }

    create()
    {
        if (!musica) {
            musica = this.sound.add('musica');
            musica.play({ loop: true });
        }
        
        this.add.image(0, 0, "fundoMenu").setOrigin(0, 0)
        
        var btn_menu = this.add.image(400, 400, "btn_menu")
        btn_menu.setInteractive()
        btn_menu.on("pointerdown", ()=>this.scene.start("preload"))
        btn_menu.setScale(0.25);

        var parabens = this.add.text(10, 10, "Parabéns!" , { font: "64px Arial"});
        parabens.setPosition(270, 200);
        parabens.setColor("#ffff00");
    }
}