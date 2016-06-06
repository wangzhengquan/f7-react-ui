let $ = {}
/**
 * Executes the supplied function in the context of the supplied
 * object 'when' milliseconds later. Executes the function a
 * single time unless periodic is set to true.
 *
 * @param fn {Function|String} the function to execute or the name of the method in
 * the 'o' object to execute.
 *
 * @param [when=0] {Number} the number of milliseconds to wait until the fn is executed.
 *
 * @param {Boolean} [periodic] if true, executes continuously at supplied interval
 * until canceled.
 *
 * @param {Object} [context] the context object.
 *
 * @param [data] that is provided to the function. This accepts either a single
 * item or an array. If an array is provided, the function is executed with
 * one parameter for each array item. If you need to pass a single array
 * parameter, it needs to be wrapped in an array.
 *
 * @return {Object} a timer object. Call the cancel() method on this object to stop
 * the timer.
 *
 * @member KISSY
 */
$.later = function(fn, when, periodic, context, data) {
  when = when || 0;
  var m = fn,
    d = data,
    f,
    r;

  if (typeof fn === 'string') {
    m = context[fn];
  }

  if (!m) {
    console.error('method undefined');
  }

  f = function() {
    m.apply(context, d);
  };

  r = (periodic) ? setInterval(f, when) : setTimeout(f, when);

  return {
    id: r,
    interval: periodic,
    cancel: function() {
      if (this.interval) {
        window.clearInterval(r);
      } else {
        window.clearTimeout(r);
      }
    }
  };
}


/**
 * Throttles a call to a method based on the time between calls.
 * @param {Function} fn The function call to throttle.
 * @param {Object} [context] context fn to run
 * @param {Number} [ms] The number of milliseconds to throttle the method call.
 * Passing a -1 will disable the throttle. Defaults to 150.
 * @return {Function} Returns a wrapped function that calls fn throttled.
 * @member KISSY
 */
$.throttle = function(fn, ms, context) {
  ms = ms || 150;

  if (ms === -1) {
    return function() {
      fn.apply(context || this, arguments);
    };
  }

  var last = Date.now();

  return function() {
    var now = Date.now();
    if (now - last > ms) {
      last = now;
      fn.apply(context || this, arguments);
    }
  };
}

/**
 * buffers a call between a fixed time
 * @param {Function} fn
 * @param {Number} ms
 * @param {Object} [context]
 * @return {Function} Returns a wrapped function that calls fn buffered.
 * @member KISSY
 */
$.buffer = function(fn, ms, context) {
  ms = ms || 150;

  if (ms === -1) {
    return function() {
      fn.apply(context || this, arguments);
    };
  }
  var bufferTimer = null;

  function f() {
    f.stop();
    bufferTimer = $.later(fn, ms, 0, context || this, arguments);
  }

  f.stop = function() {
    if (bufferTimer) {
      bufferTimer.cancel();
      bufferTimer = 0;
    }
  };

  return f;
}


/**
 * 自定义的Buffer函数，实现下面的特点：
 * 1. 从来没有执行过或长时间没有执行过，则立即运行（这样确保初始化代码能第一时间执行）
 * 2. 最后一次一定会被执行
 */
$.bufferUnless = function(fn, ms, context) {
  //console.log("buffer context", context);

  var timer, lastStart = 0,
    lastEnd = 0,
    ms = ms || 150;

  function run() {
    //console.log("buffer arguments 1",arguments);
    if (timer) {
      timer.cancel();
      timer = 0;
    }
    lastStart = Date.now();
    fn.apply(context || this, arguments);
    lastEnd = Date.now();
  }

  var rfun = function() {
    if (
      (!lastStart) || // 从未运行过
      (lastEnd >= lastStart && Date.now() - lastEnd > ms) || // 上次运行成功后已经超过ms毫秒
      (lastEnd < lastStart && Date.now() - lastStart > ms * 8) // 上次运行或未完成，后8*ms毫秒
    ) {
      run.apply(context, arguments);
    } else {
      if (timer) {
        timer.cancel();
      }
      timer = $.later(run, ms, 0, context, arguments);
    }
  }

  rfun.stop = function() {
    if (timer) {
      timer.cancel();
      timer = 0;
    }
  }

  return rfun;
}
export default $