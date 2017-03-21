/**
 * MicroEvent - to make any js object an event emitter (server or browser)
 * 
 * - pure javascript - server compatible, browser compatible
 * - dont rely on the browser doms
 * - super simple - you get it immediatly, no mistery, no magic involved
 *
 * - create a MicroEventDebug with goodies to debug
 *   - make it safer to use
*/

var MicroEvent	= function(){};
MicroEvent.prototype	= {
	on : function(types, listener){
		types = types.trim().split(/\s+/)
		types.forEach((type) => {
			this._listeners = this._listeners || {};
			this._listeners[type] = this._listeners[type]	|| [];
			this._listeners[type].push(listener);
		})
		
	},
	 
	addListener: function(){
		return this.on.apply(this, arguments)
	},
	addEventListener: function(){
		return this.on.apply(this, arguments)
	},

	onece: function(type, listener){
		function proxy() {
            listener.apply(this, arguments);
            this.off.call(this, type, proxy);
        }
        return this.on.call(this, type, proxy)
	},

	off	: function(types, listener){
		this._listeners = this._listeners || {};
		types = types.trim().split(/\s+/)
		types.forEach((type) => {
			if( type in this._listeners === false  )	return;
			if(!listener){
				delete this._listeners[type]
			}else{
				this._listeners[type].splice(this._listeners[type].indexOf(listener), 1);
			}
		})
	},
	 
	removeListener: function(){
		return this.off.apply(this, arguments)
	},
	removeEventListener: function(){
		return this.off.apply(this, arguments)
	},

	trigger	: function(types /* , args... */){
		var args = Array.prototype.slice.call(arguments, 1);
		this._listeners = this._listeners || {};
		types = types.trim().split(/\s+/)
		var result = []
		types.forEach((type) => {
			if( type in this._listeners === false  )	return;
			let tevents = this._listeners[type]
			for(var i = 0, len=tevents.length; i <len ; i++){
				let res = tevents[i].apply(this, args);
				if (res !== undefined) 
					result.push(res);
			}
		})
		return result.length === 1 ? result[0] : result;
		
	},
	
	 
	fireEvent: function(){
		return this.trigger.apply(this, arguments)
	}
	 
};

var inArray = function (arr, val) {
    for (var i = 0, len = arr.length; i < len; i++) {
        if (val === arr[i]) {
            return i;
        }
    }
    return -1;
}
/**
 * mixin will delegate all MicroEvent.js function in the destination object
 *
 * - require('MicroEvent').mixin(Foobar) will make Foobar able to use MicroEvent
 *
 * @param {Object} the object which will support MicroEvent
*/
MicroEvent.mixin = function(destObject, proplist){
	var prototype	= MicroEvent.prototype;
	if( typeof destObject === 'function' ){
		destObject = destObject.prototype
	}
	for(let p in prototype){
		if(proplist){
			if(inArray(proplist, p)) destObject[p] = prototype[p];
		} else {
			destObject[p] = prototype[p];
		}
		
	}
	return destObject;
}

MicroEvent.createObserver = function() {
	var Observer = {}
	return MicroEvent.mixin(Observer)
}

export default MicroEvent
// export in common js
// if( typeof module !== "undefined" && ('exports' in module)){
// 	module.exports	= MicroEvent;
// }
