var laserObject;
var barreiraObject;

class Cena02 extends Phaser.Scene
{
    constructor()
    {
        super("Cena02")
    }

    create()
    {
        var fundo = this.add.image(0, 0, "fundoMenu").setOrigin(0, 0)
        fundo.setScale(0.5)

        var inimigo = this.physics.add.staticGroup();
        inimigo.create(160, 360, "inimigo");

        var inimigo2 = this.physics.add.staticGroup();
        inimigo2.create(260, 360, "inimigo");

        var inimigo3 = this.physics.add.staticGroup();
        inimigo3.create(420, 310, "inimigo");

        var inimigo4 = this.physics.add.staticGroup();
        inimigo4.create(520, 500, "inimigo");

        this.chaolab = this.physics.add.staticGroup({
            key: "chao2",
            repeat: 5,
            setXY: { x: 80, y: 540, stepX: 150, stepY: 0}
        });

        var ativador = this.physics.add.staticGroup();
        ativador.create(780, 280, "ativador").refreshBody();

        var teste = this.physics.add.staticGroup();
        teste.create(100, 50, "ChaveTeste").setScale(0.02).refreshBody();

        var porta = this.physics.add.staticGroup();
        porta.create(750, 484, "porta").setScale(2.5).refreshBody();

        var barreira = this.physics.add.staticGroup();
        barreiraObject = barreira.create(670, 222, "barreira").setScale(1.5).refreshBody();

        var laser = this.physics.add.staticGroup();
        laserObject = laser.create(670, 410, "laser").setScale(0.13).refreshBody();
        laserObject.setAngle(-90);
        var novaLarguraColisao = 1;
        var alturaColisao = 200;
        laserObject.setSize(novaLarguraColisao, alturaColisao);

        player = this.physics.add.sprite(30, 500, "player");

        var _bateria = this.physics.add.staticGroup();
        _bateria.create(600, 500, "bateria");

        this.plataformas = this.physics.add.staticGroup({
            key: "chao2",
            repeat: 2,
            setXY: { x: 230, y: 400, stepX: 250, stepY: -50}
        });

        this.baterias = this.physics.add.staticGroup({
            key: "bateria",
            repeat: 1,
            setXY: { x: 200, y: 366, stepX: 270, stepY: -50}
        });

        this.plataformas.children.iterate(function (plataforma, index) {
            plataforma.setScale(1); // Defina o valor desejado para a escala
            plataforma.refreshBody(); // Atualize a área de colisão de acordo com a nova escala
        });
        
        this.anims.create({
            key: "esquerda",
            frames: this.anims.generateFrameNumbers("player", { start: 7, end: 0 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: "parado",
            frames: [ { key: "player", frame: 8 } ],
            frameRate: 20
        });
    
        this.anims.create({
            key: "direita",
            frames: this.anims.generateFrameNumbers("player", { start: 9, end: 16 }),
            frameRate: 10,
            repeat: -1
        });
        
        this.physics.add.collider(player, this.chaolab)
        this.physics.add.collider(player, this.plataformas)
        this.physics.add.collider(player, barreira)

        this.physics.add.collider(player, inimigo, this.ColisaoPlayerInimigo, null, this)
        this.physics.add.collider(player, _bateria, this.ColisaoPlayerBateria, null, this)
        this.physics.add.collider(player, teste, this.ColisaoPlayerTeste, null, this)
        this.physics.add.collider(player, this.baterias, this.ColisaoPlayerBateria, null, this)
        this.physics.add.collider(player, ativador, this.ColisaoPlayerAtivador, null, this)
        this.physics.add.collider(player, laser, this.ColisaoHandler, null, this)
        this.physics.add.collider(player, porta, this.ColisaoPlayerPorta, null, this)

        pontuacao = 30
        pontuacaoUI = this.add.text(10, 10, "Pontuação: " + pontuacao, { font: "30px Arial"});

        tecla = this.input.keyboard.createCursorKeys();
    }

    update()
    {
        if (tecla.left.isDown)
        {
            player.setVelocityX(-150);    
            player.anims.play("esquerda", true);
        }
        if (tecla.right.isDown)
        {
            player.setVelocityX(150);    
            player.anims.play("direita", true);
        }

        if ((tecla.left.isDown && tecla.right.isDown) || (!tecla.left.isDown && !tecla.right.isDown))
        {
            player.setVelocityX(0);
            player.anims.play("parado");
        }
    
        if (tecla.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-400);
        }

        if (pontuacao >= 60)
        {
            barreiraObject.x = 738;
            barreiraObject.y = 190;
            barreiraObject.setAngle(-90);

            barreiraObject.body.enable = false;
        }
    }

    ColisaoPlayerBateria(player, bateria)
    {
        pontuacao += 10
        bateria.disableBody(true, true)
        pontuacaoUI.setText("Pontuação: " + pontuacao);
    }

    ColisaoPlayerAtivador(player, ativador)
    {
        if (pontuacao >= 60)
        {
            var plataforma3 = this.physics.add.staticGroup();
            plataforma3.create(100, 100, "chao2").setScale(1).refreshBody();
            this.physics.add.collider(player, plataforma3)
            
            var plataforma4 = this.physics.add.staticGroup();
            plataforma4.create(400, 200, "chao2").setScale(1).refreshBody();
            this.physics.add.collider(player, plataforma4)
        }
        else this.scene.start("Cena02");
    }

    ColisaoHandler(player, laser) 
    {
        this.scene.start("Cena02");
    }

    ColisaoPlayerInimigo(player, inimigo)
    {
        this.scene.start("Cena02");
    }
    
    ColisaoPlayerTeste(player, teste) 
    {
        teste.disableBody(true, true);
        laserObject.disableBody(true, true);
    }

    ColisaoPlayerPorta(player, porta)
    {
        this.scene.start("Cena03");
    }
}