import { ApiProperty } from '@nestjs/swagger';
import { Warrior } from '../model/warrior.interface';
import { IsAlphanumeric, IsBoolean, IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class WarriorDto implements Warrior {

  @ApiProperty({ required: false })
  readonly id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsAlphanumeric()
  readonly pseudo: string;

  @ApiProperty({ type: 'number', required: false, default: 0 })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  readonly level: number;

  @ApiProperty({ type: 'boolean', required: false, default: false })
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
