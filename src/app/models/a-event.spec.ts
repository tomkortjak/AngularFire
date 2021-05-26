import { AEvent } from './a-event';

describe('AEvent', () => {
  it('should create an instance', () => {
    expect(new AEvent('defqon ' + this.aEvents.length, new Date(), new Date(), 'best hardstyle event',
      Math.floor(Math.random() * 3), true, Math.floor(Math.random() * 50),  Math.floor(Math.random() * 5000))).toBeTruthy();
  });
});
