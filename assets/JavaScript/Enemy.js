cc.Class({
    extends: cc.Component,

    properties: {

		type: {
				default: 1,
				displayName: 'EnemyType',
		},

		animPlaying: false
    },

    // use this for initialization
    onLoad: function () {
		if (this.type == 1){
			this.hp = 1
		}else if (this.type == 2){
			this.hp = 10
		}else {
			this.hp = 20
		}
    },

	hit: function() {
		var anim = this.getComponent(cc.Animation);
		if(this.type == 2){
			anim.play('Enemy2_Hit');
		}else if (this.type == 3){
			anim.playAdditive('Enemy3_Hit');
		}else{
			this.over()
		}
		anim.on('finished',this.onHitFinished,this)
	},

	onHitFinished: function(){
		if(this.type == 2){
			var anim = this.getComponent(cc.Animation);
			anim.stop('Enemy2_Hit');
		}
	},

	over: function() {
		if(!this.animPlaying){
			this.animPlaying = true
			var anim = this.getComponent(cc.Animation);
			if(this.type == 1){
				anim.play('Enemy1_Destroy');
			}else if (this.type == 2){
				anim.play('Enemy2_Destroy');
			}else{
				anim.play('Enemy3_Destroy');
			}
			anim.on('finished',  this.onFinished,    this);
		}
	},

	onFinished: function () {
		this.node.destroy()
	},

    update: function (dt) {
		this.node.x = this.node.x - 3
		if(this.node.x < - this.node.width / 2){
			this.node.destroy()
		}
    },

    //碰撞产生,即被子弹打到
    onCollisionEnter: function (other, self) {
		this.hp = this.hp - 1
		
		if(this.hp <= 0) {
			this.over()
		}else{
			this.hit()
		}
    },
	
});
