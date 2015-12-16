/*
we need to export something that allows you to define what to use for promises, and what to use for the queue structure.
 */
import eventQueueFactory from './eventQueueFactory';
import querySourceBuilder from './query/querySourceBuilder';

export default { eventQueueFactory, querySourceBuilder };