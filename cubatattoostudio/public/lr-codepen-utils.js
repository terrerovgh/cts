// Utilidades mínimas para el efecto de scrubbing, tomadas del gist de referencia
window.utils = {
  isTouch: function() {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  },
  addClass: function(el, className) {
    if (el && !el.classList.contains(className)) el.classList.add(className);
  },
  getVh: function() {
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  },
  interpolateRange: function(progress, inMin, inMax, outMin, outMax) {
    return outMin + ((progress - inMin) * (outMax - outMin)) / (inMax - inMin);
  },
  getUID: function() {
    return Math.random().toString(36).substr(2, 9);
  },
  getCustomCssVar: function(name, numeric, root) {
    let val = getComputedStyle(root ? document.documentElement : document.body).getPropertyValue(name);
    if (numeric) return parseFloat(val);
    return val;
  },
  getElCustomCssVar: function(el, name, numeric) {
    let val = getComputedStyle(el).getPropertyValue(name);
    if (numeric) return parseFloat(val);
    return val;
  },
  nextTick: function(fn, ctx, delay) {
    setTimeout(fn.bind(ctx), delay || 0);
  }
};
