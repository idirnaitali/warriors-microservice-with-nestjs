import { Warrior } from '../model/warrior.interface';
import {
  IsAlphanumeric,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';

export class WarriorDto implements Warrior {
  readonly id: number;

  @IsNotEmpty()
  @IsAlphanumeric()
  readonly pseudo: string;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  readonly level: number;

  @IsBoolean()
  @IsNotEmpty()
  readonly active: boolean;

  constructor(id: number, pseudo: string, level: number, active: boolean) {
    this.id = id;
    this.pseudo = pseudo;
    this.level = level;
    this.active = active;
  }
}
