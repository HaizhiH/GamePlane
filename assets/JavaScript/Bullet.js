cc.Class({
    extends: cc.Component,

    properties: {
		
    },

    onLoad: function () {
    },

    update: function () {
	this.node.x = this.node.x + 20
	if(this.node.x > this.node.parent.width / 2){
		this.node.destroy()
	}
    },

    onCollisionStay: function (other, self) {
		this.node.destroy()
    },

});
