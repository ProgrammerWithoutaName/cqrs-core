'use strict';
import querySourceBuilderModule from 'inject?./queryObjectFactoryBuilder!./querySourceBuilder';

describe('querySourceBuilder', () => {
  let querySourceBuilder, inputs;

  beforeEach(() => {
    inputs = {
      mockQueryObjectFactoryBuilder: jasmine.createSpyObj('queryObjectFactoryBuilder', ['build']),
      mockQueryObjectFactory: jasmine.createSpyObj('queryObjectFactory', ['build']),
      mockDatasource: { id: 'queryObjectDatasource' },
      mockQueryObject: { id: 'queryObject' }
    };

    inputs.mockQueryObjectFactory.datasource = inputs.mockDatasource;
    inputs.mockQueryObjectFactoryBuilder.build.and.returnValue(inputs.mockQueryObjectFactory);
    inputs.mockQueryObjectFactory.build.and.returnValue(inputs.mockQueryObject);

    querySourceBuilder = querySourceBuilderModule({
      './queryObjectFactoryBuilder': inputs.mockQueryObjectFactoryBuilder
    }).default;
  });

  describe('build', () => {
    it('should take a schema describing the object that is passed to queryObjectFactoryBuilder', () => {
      let expectedSchema = {id: 'schema'};
      querySourceBuilder.build({schema: expectedSchema});
      let [ schema ] = inputs.mockQueryObjectFactoryBuilder.build.calls.mostRecent().args;
      expect(schema).toBe(expectedSchema);
    });

  });

  describe('querySource', () => {

    describe('commands', () => {
      it('should be an object containing the commands that were given to querySourceBuilder.build()', () => {
        let commands = [0, 1];
        let returned = querySourceBuilder.build({schema: {}, commands});

        expect(returned.commands).toBe(commands);
      });
    });

    describe('datasource', () => {
      it('should be the datasource of queryObjectFactory', () => {
        let returned = querySourceBuilder.build({schema: {}, commands: []});
        expect(returned.datasource).toBe(inputs.mockDatasource);
      });
    });

    describe('getEntity', () => {

      it('should be the return value of queryObjectFactory.build({datasource})', () => {
        let querySource = querySourceBuilder.build({schema: {}, commands: []});
        let queryEntity = querySource.getEntity();

        expect(queryEntity).toBe(inputs.mockQueryObject);
      });
    });

    describe('getSnapshot', () => {

      it('should call queryObjectFactory.build with snapshot set to true', () => {
        let querySource = querySourceBuilder.build({schema: {}, commands: []});
        querySource.getSnapshot();

        let [{ snapshot }] = inputs.mockQueryObjectFactory.build.calls.mostRecent().args;
        expect(snapshot).toBe(true);
      });

      it('should be the return value of queryObjectFactory.build()', () => {
        let querySource = querySourceBuilder.build({schema: {}, commands: []});
        let queryEntity = querySource.getSnapshot();

        expect(queryEntity).toBe(inputs.mockQueryObject);
      });
    });
  });

});