class Cena01 extends Phaser.Scene
{
    constructor()
    {
        super("Cena01")
    }

    create()
    {
        //this.add.image(400, 300, "fundo")
        var fundo = this.add.image(0, 0, "fundo").setOrigin(0, 0)
        fundo.setScale(2.7)

        var chao = this.physics.add.staticGroup();
        chao.create(0, 520, "chao").setOrigin(0, 0).refreshBody();
        var chao2 = this.physics.add.staticGroup();
        chao2.create(400, 520, "chao").setOrigin(0, 0).refreshBody();
        //chao.create(0, 500, "chao").setOrigin(0,0).setScale(2).refreshBody();

        var chave = this.physics.add.staticGroup();
        chave.create(750, 275, "chave").setScale(3).refreshBody();

        player = this.physics.add.sprite(400, 470, "player");

        var _inimigo = this.physics.add.staticGroup();
        _inimigo.create(500, 500, "inimigo");

        var _faca = this.physics.add.staticGroup();
        _faca.create(600, 500, "faca");
       
        // this.rochas = this.physics.add.staticGroup({
        //     key: "rocha",
        //     repeat: 2,
        //     setXY: { x: 200, y: 490, stepX: 200}
        // });
        // this.baus = this.physics.add.staticGroup({
        //     key: "bau",
        //     repeat: 3,
        //     setXY: { x: 50, y: 480, stepX: 220}
        // });

        this.plataformas = this.physics.add.staticGroup({
            key: "plataforma",
            repeat: 2,
            setXY: { x: 200, y: 400, stepX: 250, stepY: -50}
        });
        this.inimigos = this.physics.add.staticGroup({
            key: "inimigo",
            repeat: 2,
            setXY: { x: 200, y: 365, stepX: 250, stepY: -50}
        });
        this.facas = this.physics.add.staticGroup({
            key: "faca",
            repeat: 2,
            setXY: { x: 150, y: 360, stepX: 250, stepY: -50}
        });

        this.plataformas.children.iterate(function (plataforma, index) {
            plataforma.setScale(1.75); // Defina o valor desejado para a escala
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
        
        //asd -------------------
        //this.physics.add.collider(this.baus, chao)
        this.physics.add.collider(player, chao)
        this.physics.add.collider(player, chao2)
        this.physics.add.collider(player, this.plataformas)

        //on collision -----------------
        //this.physics.add.collider(player, this.rochas, this.colisaoPlayerRocha, null, this)
        //this.physics.add.collider(player, this.baus, this.colisaoPlayerBau, null, this)
        this.physics.add.collider(player, _inimigo, this.ColisaoPlayerInimigo, null, this)
        this.physics.add.collider(player, this.inimigos, this.ColisaoPlayerInimigo, null, this)
        this.physics.add.collider(player, _faca, this.ColisaoPlayerFaca, null, this)
        this.physics.add.collider(player, this.facas, this.ColisaoPlayerFaca, null, this)
        this.physics.add.collider(player, chave, this.ColisaoPlayerChave, null, this)

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

    ColisaoPlayerInimigo(player, inimigo)
    {
        this.scene.start("Cena01");
    }

    ColisaoPlayerFaca(player, faca)
    {
        pontuacao += 10
        faca.disableBody(true,true)
        pontuacaoUI.setText("Pontuação: " + pontuacao);
    }

    ColisaoPlayerChave(player, chave)
    {
        if (pontuacao == 40) this.scene.start("preload");
        else this.scene.start("Cena01");
    }

    // colisaoPlayerRocha(player, rocha)
    // {
    //     pontuacao--
    //     pontuacaoUI.setText("Pontuação: " + pontuacao);

    //     if(pontuacao <= 0) this.scene.start("Cena01")
    // }

    // colisaoPlayerBau(player, bau)
    // {
    //     pontuacao += 20
    //     bau.disableBody(true,true)
    //     pontuacaoUI.setText("Pontuação: " + pontuacao);
    //     if(this.baus.countActive(true) == 0)
    //     {
    //         this.scene.start("preload")
    //     }
    // }
}