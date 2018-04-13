cc.Class({
    extends: cc.Component,

    properties: {
        startGameBtn: {
            default: null,
            type: cc.Sprite,
            displayName: 'StartGameButton',
        },
    },

    // use this for initialization
    onLoad: function () {
		this.startGameBtn.node.on('touchend', function ( event ) {
			cc.director.loadScene("MainBg")
			this.node.destroy()
		});
    },

});
