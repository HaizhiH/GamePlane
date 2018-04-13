var Player = require('Player')
cc.Class({
    extends: cc.Component,

    properties: {

        bgImg: {
            default: null,
            type: cc.Sprite,
            displayName: '背景图片',
        },

        bgImgCopy: {
            default: null,
            type: cc.Sprite,
            displayName: '背景图片2',
        },

        player: {
            default: null,
            type: Player,
            displayName: '玩家',
        },

        enemy1: {
            default: null,
            type: cc.Prefab,
            displayName: '敌机1号'
        },

        enemy2: {
            default: null,
            type: cc.Prefab,
            displayName: '敌机2号'
        },

        enemy3: {
            default: null,
            type: cc.Prefab,
            displayName: '敌机3号'
        },

		timer : 0
    },

	createEnemy: function (type){
		var enemy = ""
		switch(type){
			case 1:
			enemy = this.enemy1
			break
			case 2:
			enemy = this.enemy2
			break
			case 3:
			enemy = this.enemy3
			break
		}
		var enemyResult = cc.instantiate(enemy);
		enemyResult.parent = this.node.parent
		enemyResult.type = type
		enemyResult.x = this.node.width + enemyResult.width / 2
		enemyResult.y = this.node.height * Math.random()
	},

	gameOver: function() {
		if(this.node != null ){
			cc.director.loadScene("GameOver")
			this.node.destroy()
		}
	},

    onLoad: function () {
        var self = this
        this.player.node.on('touchmove', function ( event ) {
            self.player.node.x = event.getLocationX() - self.node.width/2
            self.player.node.y = event.getLocationY() - self.node.height/2
        });
		
        this.player.node.on('touchstart', function ( event ) {
			self.player.hit()
        });
    },

    update: function (dt) {
        this.bgImg.node.x = this.bgImg.node.x - 2
        this.bgImgCopy.node.x = this.bgImgCopy.node.x - 2
        var line = this.node.width/2 + this.bgImg.node.width/2
        //那张图片超过屏幕，就把这张图片移到屏幕右方继续移动
        if (this.bgImg.node.x <= - line){
            this.bgImg.node.x = line
        }
        if(this.bgImgCopy.node.x <= -line){
            this.bgImgCopy.node.x = line
        }

		if(this.player.isAlive == false){
			//游戏结束逻辑
			this.gameOver()
			return
		}

		//创建敌机
		this.timer = this.timer+1
		if(this.timer % 80 == 0){
			this.createEnemy(1)  //创建1号敌机
		}
		if(this.timer % 160 == 0){
			this.createEnemy(2)
		}
		if(this.timer % 320 == 0){
			this.createEnemy(3)
			this.timer = 0
		}
    },

});
