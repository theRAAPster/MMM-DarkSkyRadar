/* Magic Mirror
 * Module: MMM-DarkSkyRadar
 */

Module.register("MMM-DarkSkyRadar",{

	defaults: {
		height: "600px",
		width: "350px",
		zoomLevel: 6,
		updateInterval: 15 * 60 * 1000,
	},

	start: function () {
		this.scheduleUpdate();
	},

	getStyles: function() {
		return ["MMM-DarkSkyRadar.css"];
	},
	
	getDom: function() {
		let iframe = document.createElement("IFRAME");
		iframe.id = "mmdarkskyradarframe";
		iframe.classList.add("iframe");
		iframe.style = "border:0;";
		iframe.width = this.config.width;
		iframe.height = this.config.height;
		iframe.scrolling = "no"
		
		let lat = this.config.lat;
		let lon = this.config.lon;
		let zoom = this.config.zoomLevel;
		
		iframe.src = `https://darksky.net/map-embed/@radar,${lat},${lon},${zoom}.js?embed=true&timeControl=false&fieldControl=false&defaultField=radar`;

		return iframe;
	},

	scheduleUpdate: function(delay) {
		var nextLoad = this.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}

		var self = this;
		setInterval(function() {
			self.updateData();
		}, nextLoad);
	},

	updateData: function() {
		this.updateDom(0);
	}
});
