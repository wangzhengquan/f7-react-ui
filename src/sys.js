export default {

	getSys (){
		 var u = navigator.userAgent;
		 var dType;
		 if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || u.indexOf('iPhone') > -1 || u.indexOf('iPad') > -1){
			 dType = 'ios';
		 }else if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1){
			 dType = 'android';
		 }else{
			 dType = 'pc';
		 }
		 return dType;
	}
	 
}