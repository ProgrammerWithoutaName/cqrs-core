'use strict';

// Pulled from Mozilla
function deepFreeze(obj){

  // Retrieve the property names defined on obj
  var propNames = Object.getOwnPropertyNames(obj);

  // Freeze properties before freezing self
  propNames.forEach(name => {
    var prop = obj[name];

    // Freeze prop if it is an object
    if (typeof prop === 'object' && prop !== null && !Object.isFrozen(prop)){
      deepFreeze(prop);
    }
  });

  // Freeze self
  return Object.freeze(obj);
}

export default {execute: deepFreeze};