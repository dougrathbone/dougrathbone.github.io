alert("hello");

function MetricsFlagger (){
	var loaded =false;
	var widgetIdList = ['Scorecard','odr','rcmd'];
	
	this.loadFlags = function(){
		if (loaded) return;
		
		var widgets = this.findWidgets();
		for (var x = 0; x<widgets.length;x++){
			this.logMessage("attaching to widget " + widgets[x]);
			this.attachFlag(widgets[x]);
		}
	}
	
	this.findWidgets = function(){
		var widgetList = [];
		
		// Search through our widget list looking for the id's of all the containers.
		for(var x = 0; x< widgetIdList.length;x++){
			// try and pull the contain from the current DOM
			var widgetContainer = document.getElementById(widgetIdList[x]);
			if (typeof widgetContainer == 'undefined'){
				this.logMessage("Found element '"+widgetIdList[x]+"'");
				widgetList.push(widgetContainer);
			}
		}
		return widgetList;
	}
	
	this.attachFlag = function(containerDomElement){
		this.logMessage("attaching to dom element" +containerDomElement);
	}
	
	this.logMessage = function(message){
		if (!console) return;
		console.log(message);
	}
}
var flagApp = new MetricsFlagger();
flagApp.loadFlags();
