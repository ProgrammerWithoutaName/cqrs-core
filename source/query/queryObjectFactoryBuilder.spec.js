import queryObjectFactoryBuilderModule from 'inject!./queryObjectFactoryBuilder';

describe('queryObjectFactoryBuilder', () => {
  let queryObjectFactoryBuilder;
  let inputs;

  beforeEach(() => {
    inputs = {
      mockQueryDatasourceBuilder: jasmine.createSpyObj('queryDatasourceBuilder', ['buildFromSchema']),
      mockReadOnlyObjectBuilder: jasmine.createSpyObj('readOnlyObjectBuilder', ['build', 'buildDeepCopy']),
      mockSchema: { id: 'someSchema' }
    };

    queryObjectFactoryBuilder = queryObjectFactoryBuilderModule({
      './queryDatasourceBuilder': inputs.mockQueryDatasourceBuilder,
      './readOnlyObjectBuilder': inputs.mockReadOnlyObjectBuilder
    }).default;
  });

  describe('build', () => {
    it('should call queryDatasourceBuilder.buildFromSchema with the schema given', () => {
      queryObjectFactoryBuilder.build(inputs.mockSchema);
      expect(inputs.mockQueryDatasourceBuilder.buildFromSchema).toHaveBeenCalledWith(inputs.mockSchema);
    });
  });

  describe('queryObjectFactory', () => {
    let queryObjectFactory;
    let mockDatasource;
    beforeEach(() => {
      mockDatasource = { id: 'someDatasource' };
      inputs.mockQueryDatasourceBuilder.buildFromSchema.and.returnValue(mockDatasource);
      queryObjectFactory = queryObjectFactoryBuilder.build(inputs.mockSchema);
    });

    describe('datasource', () => {
      it('should be the value returned from queryDatasourceBuilder.buildFromSchema', () => {
        expect(queryObjectFactory.datasource).toBe(mockDatasource);
      });

      it('should be a shallow read-only object. (can modify its properties, but not it.)', () => {
        expect(() => queryObjectFactory.datasource = { id: 'something else' }).toThrow();
      });
    });

    describe('schema', () => {
      it('should be the schema given to build', () => {
        expect(queryObjectFactory.schema).toBe(inputs.mockSchema);
      });

      it('should be readonly', () => {
        expect(() => queryObjectFactory.schema = { id: 'something else' }).toThrow();
      });
    });

    describe('build', () => {
      describe('when snapshot is true', () => {
        let results;
        let mockDeepCopy;
        beforeEach(() => {
          mockDeepCopy = { id: 'deepCopy' };
          inputs.mockReadOnlyObjectBuilder.buildDeepCopy.and.returnValue(mockDeepCopy);
          inputs.mockReadOnlyObjectBuilder.build.and.returnValue(mockDatasource);
          results = queryObjectFactory.build({ snapshot: true });
        });

        it('should call readOnlyObjectBuilder.buildDeepCopy with the datasource', () => {
          expect(inputs.mockReadOnlyObjectBuilder.buildDeepCopy).toHaveBeenCalledWith(mockDatasource);
        });

        it('should return the results of buildDeepCopy', () => {
          expect(results).toBe(mockDeepCopy);
        });
      });

      describe('when snapshot is falsey', () => {
        let results;
        let mockReadOnly;
        beforeEach(() => {
          mockReadOnly = { id: 'read only' };
          inputs.mockReadOnlyObjectBuilder.build.and.returnValue(mockReadOnly);
          inputs.mockReadOnlyObjectBuilder.buildDeepCopy.and.returnValue(mockDatasource);
          results = queryObjectFactory.build();
        });

        it('should call readOnlyObjectBuilder.build with the datasource', () => {
          expect(inputs.mockReadOnlyObjectBuilder.build).toHaveBeenCalledWith(mockDatasource);
        });

        it('should return the results of readOnlyObjectBuilder.build', () => {
          expect(results).toBe(mockReadOnly);
        });
      });
    });
  });
});
