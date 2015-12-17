import eventQueueFactoryModule from 'inject?./externalDefinitions!./eventQueueFactory';

describe('eventQueueFactory', () => {
  let eventQueueFactory;
  let eventQueue;
  let externalDefinitions;
  let mockQueue;

  beforeEach(() => {
    externalDefinitions = {
      Queue: function Queue() {
        mockQueue = this;
        mockQueue.push = () => {};
        mockQueue.flush = () => {};
        spyOn(mockQueue, 'push');
        spyOn(mockQueue, 'flush');
      }
    };

    // loading es6 module default.
    eventQueueFactory = eventQueueFactoryModule({
      './externalDefinitions': externalDefinitions
    }).default;

    eventQueue = eventQueueFactory.build();
  });

  describe('pushEvent', () => {
    let given;
    let inputs;
    beforeEach(() => {
      inputs = {
        eventName: 'foo',
        eventData: { id: 'things' }
      };
      eventQueue.pushEvent(inputs);
      [given] = mockQueue.push.calls.mostRecent().args;
    });
    it('should push an event with the given name', () => {
      expect(given.eventName).toBe(inputs.eventName);
    });

    it('should push an event with the given data', () => {
      expect(given.eventData).toBe(inputs.eventData);
    });

    it('should not pass on the given object to the event queue', () => {
      expect(given).not.toBe(inputs);
    });
  });

  describe('hasEvents', () => {
    it('should return the value of queue.any', () => {
      mockQueue.any = true;
      expect(eventQueue.hasEvents).toBe(mockQueue.any);
    });
  });

  describe('eventCount', () => {
    it('should return the value of queue.length', () => {
      mockQueue.length = 42;
      expect(eventQueue.eventCount).toBe(mockQueue.length);
    });
  });

  describe('flushEvents', () => {
    let givenEventHandler;
    let inputs;

    beforeEach(() => {
      inputs = {
        event: jasmine.createSpyObj('', ['event']),
        eventData: { id: 'stuff' }
      };
      inputs.event.eventName = 'foo';

      eventQueue.registerEventHandler(inputs.event);
      eventQueue.flushEvents();
      [givenEventHandler] = mockQueue.flush.calls.mostRecent().args;
    });

    it('should throw an error if the event is not defined', () =>
      expect(() => givenEventHandler({ eventName: 'nonExist', eventData: {} })).toThrow()
    );

    it('should call the registered event handler with the given data if defined', () => {
      givenEventHandler({ eventName: inputs.event.eventName, eventData: inputs.eventData });
      const [givenData] = inputs.event.event.calls.mostRecent().args;
      expect(givenData).toBe(inputs.eventData);
    });
  });
});
