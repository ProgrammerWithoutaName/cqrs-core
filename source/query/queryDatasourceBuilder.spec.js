'use strict';
import queryDatasourceBuilder from './queryDatasourceBuilder';

describe('queryDatasourceBuilder', () => {
  describe('buildFromSchema', () => {
    it('should create an object with the same keys as the schema with values set to undefined', () => {
      let mockSchema = { foo: [], bar: [], other: [] };
      let datasource = queryDatasourceBuilder.buildFromSchema(mockSchema);
      let expectedKeys = Object.keys(mockSchema);
      let datasourceKeys = Object.keys(datasource);
      expectedKeys.forEach(expectedKey => expect(datasourceKeys).toContain(expectedKey));
    });
  });
});