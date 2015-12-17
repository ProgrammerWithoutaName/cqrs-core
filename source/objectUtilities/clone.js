// this exists as a workaround for injecting clone, inject-loader does not handle functions correctly, and somehow
// converts functions to objects.
import clone from 'ramda/src/clone';

export default { execute: clone };
