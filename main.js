function MetricsFlagger (){
	this.loaded = false;
	this.widgetIdList = ['Scorecard','odr','rcmd'];
	this.flagiconSrc = "https://s3-us-west-2.amazonaws.com/edp-icons/not-flagged.png";
	
	this.loadFlags = function(){
		if (this.loaded===true) {
			this.logMessage("skipping load, as already loaded");
			return;
		}
		
		this.logMessage("loading css");
		var link = document.createElement("link");
		link.setAttribute("rel","stylesheet");
		link.setAttribute("href","https://dougrathbone.github.io/flagger.css");
		var head = document.getElementsByTagName("head")[0];
		head.appendChild(link);
		
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
			if (widgetContainer == null){
				this.logMessage("Found element '"+this.widgetIdList[x]+"'");
				continue;
			}
			this.logMessage("Found widget container "+widgetContainer.id);
			widgetList.push(widgetContainer);
		}
		return widgetList;
	}
	
	this.attachFlag = function(containerDomElement){
		this.logMessage("attaching to dom element: " +containerDomElement.id);
		
		var top = containerDomElement.offsetTop;
		var rightCorner = containerDomElement.offsetLeft + containerDomElement.offsetWidth;
		this.logMessage("element is at top: "+top+" and right: "+rightCorner);
		
		var flagIcon = document.createElement("img");
		flagIcon.src = this.flagiconSrc;
		flagIcon.style.position = "absolute";
		flagIcon.style.top = top+10+"px";
		flagIcon.style.left = rightCorner-22+"px";
		flagIcon.className="flagIcon";
		
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
