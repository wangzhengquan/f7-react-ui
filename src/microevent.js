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
	bind	: function(event, fct){
		this._events = this._events || {};
		this._events[event] = this._events[event]	|| [];
		this._events[event].push(fct);
		console.log('on', this._events)
	},
	on: function(){
		return this.bind.apply(this, arguments)
	},
	addListener: function(){
		return this.addListener.apply(this, arguments)
	},

	unbind	: function(event, fct){
		this._events = this._events || {};
		if( event in this._events === false  )	return;
		if(!fct){
			delete this._events[event]
		}else{
			this._events[event].splice(this._events[event].indexOf(fct), 1);
		}
		console.log('off', this._events)
		
	},
	off: function(){
		return this.unbind.apply(this, arguments)
	},
	removeListener: function(){
		return this.unbind.apply(this, arguments)
	},

	trigger	: function(event /* , args... */){
		this._events = this._events || {};
		if( event in this._events === false  )	return;
		for(var i = 0; i < this._events[event].length; i++){
			this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
		}
	},
	fire: function(){
		return this.trigger.apply(this, arguments)
	},
	emit: function(){
		return this.trigger.apply(this, arguments)
	}
};

/**
 * mixin will delegate all MicroEvent.js function in the destination object
 *
 * - require('MicroEvent').mixin(Foobar) will make Foobar able to use MicroEvent
 *
 * @param {Object} the object which will support MicroEvent
*/
MicroEvent.mixin = function(destObject){
	var prototype	= MicroEvent.prototype;
	if( typeof destObject === 'function' ){
		destObject = destObject.prototype
	}
	for(let p in prototype){
		destObject[p] = prototype[p];
	}
	return destObject;
}

export default MicroEvent
// export in common js
// if( typeof module !== "undefined" && ('exports' in module)){
// 	module.exports	= MicroEvent;
// }
