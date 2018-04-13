cc.Class({
    extends: cc.Component,

    properties: {

        bullet: {
            default: null,
            type: cc.Prefab,
            displayName: '子弹预加载资源',
        },

		timer:0,
		animPlaying : false,
		isAlive : true
    },
	
	//攻击，创建子弹并发射出去
	hit: function () {
		var bulletLeft = cc.instantiate(this.bullet);
		bulletLeft.parent = this.node.parent
		bulletLeft.x = 20 + this.node.x
		bulletLeft.y = 20 + this.node.y

		var bulletRight = cc.instantiate(this.bullet);
		bulletRight.parent = this.node.parent
		bulletRight.x = 20 + this.node.x
		bulletRight.y = -20 + this.node.y
	},
	

    onLoad: function () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },


    //碰撞产生
    onCollisionEnter: function (other, self) {
		if(other.node.name == 'Bullet'){
			//被自己发出的子弹打到，即移动速度超过子弹的移动速度的情况
		}else{
			//与敌机碰撞，游戏结束
			this.over()
		}
    },

	
	over: function() {
		if(!this.animPlaying){
			this.animPlaying = true
			var anim = this.getComponent(cc.Animation)
			anim.play('Airplane_Destroy');
			anim.on('finished',this.onFinished,this);
		}
	},

	onFinished: function(){
		this.isAlive = false
		this.node.destroy()
	},


    update: function (dt) {
		this.timer = this.timer+1
		if(this.timer == 10){
			this.hit()
		}else if (this.timer > 10){
			this.timer = 0
		}else{
			
		}
    },
});
