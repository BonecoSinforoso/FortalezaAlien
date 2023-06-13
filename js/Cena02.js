var laserObject;

class Cena02 extends Phaser.Scene
{
    constructor()
    {
        super("Cena02")
    }

    create()
    {

        //this.add.image(400, 300, "fundo")
        var fundo = this.add.image(0, 0, "fundo2").setOrigin(0, 0)
        fundo.setScale(2.7)

        this.chaolab = this.physics.add.staticGroup({
            key: "chao2",
            repeat: 5,
            setXY: { x: 80, y: 540, stepX: 150, stepY: 0}
        });

        var mesa1 = this.physics.add.staticGroup();
        mesa1.create(150, 476, "mesa1").setScale(1.5).refreshBody();
        
        var prateleira = this.physics.add.staticGroup();
        prateleira.create(450, 476, "prateleira").setScale(1.5).refreshBody();

        var ativador = this.physics.add.staticGroup();
        ativador.create(780, 280, "ativador").refreshBody();

        var teste = this.physics.add.staticGroup();
        teste.create(100, 50, "ChaveTeste").setScale(0.02).refreshBody();

        var porta = this.physics.add.staticGroup();
        porta.create(750, 484, "porta").setScale(2.5).refreshBody();

        var cientista = this.physics.add.staticGroup();
        cientista.create(50, 495, "cientista").setScale(0.12).refreshBody();

        var laser = this.physics.add.staticGroup();
        laserObject = laser.create(670, 410, "laser").setScale(0.13).refreshBody();
        laserObject.setAngle(-90);
        var novaLarguraColisao = 1;
        var alturaColisao = 200;
        laserObject.setSize(novaLarguraColisao, alturaColisao);

        player = this.physics.add.sprite(400, 470, "player");

        var _faca = this.physics.add.staticGroup();
        _faca.create(600, 500, "bateria");

        this.plataformas = this.physics.add.staticGroup({
            key: "chao2",
            repeat: 2,
            setXY: { x: 230, y: 400, stepX: 250, stepY: -50}
        });

        this.facas = this.physics.add.staticGroup({
            key: "bateria",
            repeat: 2,
            setXY: { x: 180, y: 366, stepX: 250, stepY: -50}
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

        this.physics.add.collider(player, _faca, this.ColisaoPlayerFaca, null, this)
        this.physics.add.collider(player, teste, this.ColisaoPlayerTeste, null, this)
        this.physics.add.collider(player, this.facas, this.ColisaoPlayerFaca, null, this)
        this.physics.add.collider(player, ativador, this.ColisaoPlayerAtivador, null, this)
        this.physics.add.collider(player, laser, this.ColisaoHandler, null, this)
        this.physics.add.collider(player, porta, this.ColisaoPlayerPorta, null, this)
        

        pontuacao = 0
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
    }

    ColisaoPlayerFaca(player, faca)
    {
        pontuacao += 10
        faca.disableBody(true,true)
        pontuacaoUI.setText("Pontuação: " + pontuacao);
    }

    ColisaoPlayerAtivador(player, ativador)
    {
        if (pontuacao >= 40)
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
    
    ColisaoPlayerTeste(player, teste, laserObjeto) 
    {

        teste.disableBody(true,true);
        laserObject.disableBody(true, true);

    }

    ColisaoPlayerPorta(player, porta) 
    {

        this.scene.start("Cena01");

    }

}