import querySourceBuilderModule from 'inject?./queryObjectFactoryBuilder!./querySourceBuilder';

describe('querySourceBuilder', () => {
  let querySourceBuilder;
  let inputs;

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
      const expectedSchema = { id: 'schema' };
      querySourceBuilder.build({ schema: expectedSchema });
      const [schema] = inputs.mockQueryObjectFactoryBuilder.build.calls.mostRecent().args;
      expect(schema).toBe(expectedSchema);
    });
  });

  describe('querySource', () => {
    describe('commands', () => {
      it('should be an object containing the commands that were given to querySourceBuilder.build()', () => {
        const commands = [0, 1];
        const returned = querySourceBuilder.build({ schema: {}, commands });

        expect(returned.commands).toBe(commands);
      });
    });

    describe('datasource', () => {
      it('should be the datasource of queryObjectFactory', () => {
        const returned = querySourceBuilder.build({ schema: {}, commands: [] });
        expect(returned.datasource).toBe(inputs.mockDatasource);
      });
    });

    describe('getEntity', () => {
      it('should be the return value of queryObjectFactory.build({ datasource})', () => {
        const querySource = querySourceBuilder.build({ schema: {}, commands: [] });
        const queryEntity = querySource.getEntity();

        expect(queryEntity).toBe(inputs.mockQueryObject);
      });
    });

    describe('getSnapshot', () => {
      it('should call queryObjectFactory.build with snapshot set to true', () => {
        const querySource = querySourceBuilder.build({ schema: {}, commands: [] });
        querySource.getSnapshot();

        const [{ snapshot }] = inputs.mockQueryObjectFactory.build.calls.mostRecent().args;
        expect(snapshot).toBe(true);
      });

      it('should be the return value of queryObjectFactory.build()', () => {
        const querySource = querySourceBuilder.build({ schema: {}, commands: [] });
        const queryEntity = querySource.getSnapshot();

        expect(queryEntity).toBe(inputs.mockQueryObject);
      });
    });
  });
});
