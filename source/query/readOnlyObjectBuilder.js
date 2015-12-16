'use strict';
import clone from '../objectUtilities/clone';
import deepFreeze from '../objectUtilities/deepFreeze';

function buildDeepCopy(datasource){
  let baseData = clone.execute(datasource);
  deepFreeze.execute(baseData);
  return baseData;
}

function build(datasource){
  let readOnly = Object.create(datasource);
  Object.freeze(readOnly);
  return readOnly;
}

export default { build, buildDeepCopy };