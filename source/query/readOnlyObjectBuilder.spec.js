'use strict';
import readOnlyObjectBuilderModule from 'inject!./readOnlyObjectBuilder';

describe('readOnlyObjectBuilder', () => {
  let inputs, readOnlyObjectBuilder;

  beforeEach(() => {
    inputs = {
      mockClone: jasmine.createSpyObj('clone', ['execute']),
      mockDeepFreeze: jasmine.createSpyObj('deepFreeze', ['execute']),
      mockDatasource: { foo: 'thing', id: 'datasource'},
      mockClonedDatasource: { id: 'clonedDatasource' }
    };

    inputs.mockClone.execute.and.returnValue(inputs.mockClonedDatasource);

    readOnlyObjectBuilder = readOnlyObjectBuilderModule({
      '../objectUtilities/clone': inputs.mockClone,
      '../objectUtilities/deepFreeze': inputs.mockDeepFreeze
    }).default;

  });

  describe('buildDeepCopy', () => {
    it('should call clone with the given datasource', () => {
      readOnlyObjectBuilder.buildDeepCopy(inputs.mockDatasource);
      expect(inputs.mockClone.execute).toHaveBeenCalledWith(inputs.mockDatasource);
    });

    it('should call deepFreeze.execute with the clone of datasource', () => {
      readOnlyObjectBuilder.buildDeepCopy(inputs.mockDatasource);
      expect(inputs.mockDeepFreeze.execute).toHaveBeenCalledWith(inputs.mockClonedDatasource);
    });

    it('should return the clone of datasource', () => {
      let results = readOnlyObjectBuilder.buildDeepCopy(inputs.mockDatasource);
      expect(results).toBe(inputs.mockClonedDatasource);
    });
  });

  describe('build', () => {
    it('should return an object with the prototype set to the datasource', () => {
      let results = readOnlyObjectBuilder.build(inputs.mockDatasource);
      let noConstructor = function(){};
      noConstructor.prototype = inputs.mockDatasource;
      expect(results instanceof noConstructor).toBe(true);
    });

    it('should return an object that is frozen', () => {
      let results = readOnlyObjectBuilder.build(inputs.mockDatasource);
      expect(Object.isFrozen(results)).toBe(true);
    });
  });
});
