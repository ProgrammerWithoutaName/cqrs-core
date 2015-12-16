'use strict';
import queryObjectFactoryBuilder from './queryObjectFactoryBuilder';

function build({schema, commands}){
  const queryObjectFactory = queryObjectFactoryBuilder.build(schema);

  return {
    get datasource(){ return queryObjectFactory.datasource; },
    get commands(){ return commands; },
    getEntity: () => queryObjectFactory.build(),
    getSnapshot: () => queryObjectFactory.build({ snapshot: true })
  };
}

export default {build};
