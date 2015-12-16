'use strict';
import queryDatasourceBuilder from './queryDatasourceBuilder';
import readOnlyObjectBuilder from './readOnlyObjectBuilder';

function build(schema){
  let datasource = queryDatasourceBuilder.buildFromSchema(schema);

  return {
    get datasource(){ return datasource; },
    get schema(){ return schema; },
    build: ({snapshot}) =>
      snapshot ? readOnlyObjectBuilder.buildDeepCopy(datasource) : readOnlyObjectBuilder.build(datasource)
  };
}

export default {build};