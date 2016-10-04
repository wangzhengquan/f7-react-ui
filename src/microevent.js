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
	on : function(event, fct){
		this._events = this._events || {};
		this._events[event] = this._events[event]	|| [];
		this._events[event].push(fct);
		// console.log('on', this._events)
	},
	 
	addListener: function(){
		return this.on.apply(this, arguments)
	},
	addEventListener: function(){
		return this.on.apply(this, arguments)
	},

	onece: function(eventName, listener){
		function proxy() {
            listener.apply(this, arguments);
            this.off.call(this, eventName, proxy);
        }
        return this.on.call(this, eventName, proxy)
	},

	off	: function(types, listener){
		this._events = this._events || {};
		types = types.trim().split(' ')
		types.forEach((type) => {
			if( type in this._events === false  )	return;
			if(!listener){
				delete this._events[event]
			}else{
				this._events[event].splice(this._events[event].indexOf(listener), 1);
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
		this._events = this._events || {};
		types = types.trim().split(' ')
		var result = []
		types.forEach((type) => {
			if( type in this._events === false  )	return;
			let tevents = this._events[type]
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

export default MicroEvent
// export in common js
// if( typeof module !== "undefined" && ('exports' in module)){
// 	module.exports	= MicroEvent;
// }
