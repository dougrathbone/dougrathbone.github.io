function MetricsFlagger (){
	this.loaded = false;
	this.widgetIdList = ['Scorecard','odr','rcmd'];
	
	this.loadFlags = function(){
		if (this.loaded===true) {
			this.logMessage("skipping load, as already loaded");
			return;
		}
		
		var widgets = this.findWidgets();
		for (var x = 0; x<widgets.length;x++){
			this.logMessage("attaching to widget " + widgets[x]);
			this.attachFlag(widgets[x]);
		}
	}
	
	this.findWidgets = function(){
		var widgetList = [];
		
		// Search through our widget list looking for the id's of all the containers.
		for(var x = 0; x< this.widgetIdList.length;x++){
			// try and pull the contain from the current DOM
			var widgetContainer = document.getElementById(this.widgetIdList[x]);
			if (typeof widgetContainer == 'undefined'){
				this.logMessage("Found element '"+this.widgetIdList[x]+"'");
				widgetList.push(widgetContainer);
			}
		}
		return widgetList;
	}
	
	this.attachFlag = function(containerDomElement){
		this.logMessage("attaching to dom element" +containerDomElement);
	}
	
	this.logMessage = function(message){
		console.log(message);
	}
}
MetricsFlagger.prototype.initialize = function(){
	this.loadFlags();
}
console.log("initializing main proto");
var flagApp = new MetricsFlagger();
flagApp.initialize();
console.log("finished initializing");
