import { WarriorDto } from './warrior.dto';

describe('WarriorDto', () => {
  it('should be defined', () => {
    expect(new WarriorDto(null, 'pseudo', 0, false)).toBeDefined();
  });
});
