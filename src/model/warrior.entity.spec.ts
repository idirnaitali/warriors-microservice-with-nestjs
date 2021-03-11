import { WarriorEntity } from './warrior.entity';

describe('WarriorEntity', () => {
  it('should be defined', () => {
    expect(new WarriorEntity(null, 'pseudo', 0, false)).toBeDefined();
  });
});
