import ArrayHelper from './array'
import Type from './type'
var ObjectHelper = {}

var EmptyFn = function () {};
var each = function(obj, fn) {
	if (Array.isArray(obj)) {
		for (var i = 0, len = obj.length; i < len; i++) {
			if (fn.call(obj[i], obj[i], i) === false) {
				break;
			}
		}
	} else {
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				if (fn.call(obj[key], obj[key], key) === false) {
					break;
				}
			}
		}
	}
}

var _mixInternal = function(rc, sp, override, deep, wl){
   var property,
   	   src,
   	   target;

   if (rc) {
       for (property in sp) {
    	   if(sp.hasOwnProperty(property)){
    		   src = sp[property];
        	   target = rc[property];
        	   if (wl) {
                   src = wl.call(sp, property, src);
               }
        	   if(deep && src && (ArrayHelper.isArray(src)|| Type.isPlainObject(src)) ){
        		   target = target ? target : Type.isArray(src)? [] : {};
        		   rc[property] = target;
        		   _mixInternal(target, src, override, deep);
        	   }else{
        		   if(src !== undefined && (override || target == null || target == undefined) ){
        			   rc[property] = src;
        		   }
        			  
        	   }
    	   }
       }
   }

   return rc;
}
	    
var mix = function(rc, sp, override, deep, wl){
   if (override === undefined) {
	   override = true;
   }
   if (wl && (typeof wl !== 'function')) {
       var originalWl = wl;
       wl = function (name, val) {
    	  // console.log('inarray',name, originalWl, Ufo.inArray(name, originalWl));
           return ArrayHelper.inArray(name, originalWl) ? val : undefined;
       };
   }
   return _mixInternal(rc, sp, override, deep, wl);
}

var clone = function(obj, wl){
   var cloneObj = {};
   mix(cloneObj, obj, true, true, wl);
   return cloneObj;
   
}


var extend = function(subclass, superclass, proto) {
	if(arguments.length === 2 && Type.isPlainObject(superclass)){
		proto = superclass;
		superclass = null;
	}
	 
	if (superclass) {
		EmptyFn.prototype = superclass.prototype;
		var subProto = new EmptyFn();
		subclass.prototype = mix(subProto, subclass.prototype); 
		subclass.prototype.constructor = subclass
		subclass.superclass = superclass.prototype;
	} 
	 
	if(proto) mix(subclass.prototype, proto)
}

ObjectHelper.mix = mix
ObjectHelper.each = each
ObjectHelper.clone = clone
ObjectHelper.extend = extend


export default ObjectHelper