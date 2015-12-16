'use strict';

function buildFromSchema(schema){
  let newObject = {};
  let schemaProperties = Object.keys(schema);
  schemaProperties.forEach(property => newObject[property] = undefined);
  return newObject;
}

export default { buildFromSchema };