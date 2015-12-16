'use strict';
import queryObjectFactoryBuilderModule from 'inject!./qqueryObjectFactoryBuilder';

describe('queryObjectFactoryBuilder', () => {
  let queryObjectFactoryBuilder, queryObjectFactory, inputs;
  beforeEach(() => {});

  describe('build', () => {
    it('should call queryDatasourceBuilder.buildFromSchema with the schema given');
  });

  describe('queryObjectFactory', () => {
    describe('datasource', () => {
      it('should be a shallow read-only object. (can modify its properties, but not it.)');
      it('should be the value returned from queryDatasourceBuilder.buildFromSchema');
    });

    describe('schema', () => {
      it('should be readonly');
      it('should be the schema given to build');
    });

    describe('build', () => {
      describe('when snapshot is true', () => {
        it('should call readOnlyObjectBuilder.buildDeepCopy with the datasource');
        it('should return the results of buildDeepCopy');
      });

      describe('when snapshot is falsey', () => {
        it('should call readOnlyObjectBuilder.build with the datasource');
        it('should return the results of readOnlyObjectBuilder.build');
      });
    });
  });
});