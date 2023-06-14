class Cena03 extends Phaser.Scene
{
    constructor()
    {
        super("Cena03")
    }

    create()
    {
        //this.add.image(400, 300, "fundo")
        var fundo = this.add.image(0, 0, "fundoMenu").setOrigin(0, 0)
        
        var btn_menu = this.add.image(400, 300, "btn_menu")
        btn_menu.setInteractive()
        btn_menu.on("pointerdown", ()=>this.scene.start("preload"))
        btn_menu.setScale(0.1);


        var parabens = this.add.text(10, 10, "Parabéns" , { font: "50px Arial"});
        parabens.setPosition(300, 200);
        parabens.setColor("#ffff00");

    }
}