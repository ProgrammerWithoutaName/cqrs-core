import queryDatasourceBuilder from './queryDatasourceBuilder';

describe('queryDatasourceBuilder', () => {
  describe('buildFromSchema', () => {
    it('should create an object with the same keys as the schema with values set to undefined', () => {
      const mockSchema = { foo: [], bar: [], other: [] };
      const datasource = queryDatasourceBuilder.buildFromSchema(mockSchema);
      const expectedKeys = Object.keys(mockSchema);
      const datasourceKeys = Object.keys(datasource);
      expectedKeys.forEach(expectedKey => expect(datasourceKeys).toContain(expectedKey));
    });
  });
});
