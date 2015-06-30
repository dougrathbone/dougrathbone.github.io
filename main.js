function MetricsFlagger (){
	this.loaded = false;
	this.widgetIdList = ['Scorecard','odr','rcmd'];
	this.flagiconSrc = "https://s3-us-west-2.amazonaws.com/edp-icons/not-flagged.png";
	
	this.loadFlags = function(){
		if (this.loaded===true) {
			this.logMessage("skipping load, as already loaded");
			return;
		}
		
		var widgets = this.findWidgets();
		this.logMessage("attempting to fetch "+widgets.length+" widgets");
		for (var x = 0; x<widgets.length;x++){
			this.attachFlag(widgets[x]);
		}
	}
	
	this.findWidgets = function(){
		var widgetList = [];
		
		// Search through our widget list looking for the id's of all the containers.
		for(var x = 0; x< this.widgetIdList.length;x++){
			// try and pull the contain from the current DOM
			var widgetContainer = document.getElementById(this.widgetIdList[x]);
			console.log(widgetContainer);
			if (widgetContainer == null){
				this.logMessage("Found element '"+this.widgetIdList[x]+"'");
				continue;
			}
			this.logMessage("Found widget container "+widgetContainer);
			widgetList.push(widgetContainer);
		}
		return widgetList;
	}
	
	this.attachFlag = function(containerDomElement){
		this.logMessage("attaching to dom element" +containerDomElement.id);
		
		var top = containerDomElement.offsetTop;
		var rightCorner = containDomElement.offsetLeft + containDomElement.offsetWidth;
		this.logMessage("element is at top: "+top+" and right: "+rightCorner);
		
		var flagIcon = document.createElement("img");
		flagIcon.src = this.flagiconSrc;
		flagIcon.style="position:absolute; top:"+(top+10)+"px;left:"+rightcorner-10+"px;";
		
		containerDomElement.insertBefore(flagIcon, containerDomElement.firstChild);
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
