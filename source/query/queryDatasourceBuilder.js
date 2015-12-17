function buildFromSchema(schema) {
  const newObject = {};
  const schemaProperties = Object.keys(schema);
  schemaProperties.forEach(property => newObject[property] = undefined);
  return newObject;
}

export default { buildFromSchema };
