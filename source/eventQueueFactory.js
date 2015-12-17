import externals from './externalDefinitions';

function build() {
  const events = new Map();
  const queue = new externals.Queue();

  return {
    registerEventHandler: ({ eventName, event }) => events.set(eventName, event),
    pushEvent: ({ eventName, eventData }) => queue.push({ eventName, eventData }),
    flushEvents: () => queue.flush(event => events.get(event.eventName)(event.eventData)),
    get hasEvents() { return queue.any; },
    get eventCount() { return queue.length; }
  };
}

export default { build };
