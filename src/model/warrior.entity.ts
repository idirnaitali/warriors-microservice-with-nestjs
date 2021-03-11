import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Warrior } from './warrior.interface';

@Entity()
export class WarriorEntity implements Warrior {
  @PrimaryGeneratedColumn()
  readonly id: number;
  @Column({ unique: true })
  readonly pseudo: string;
  @Column()
  readonly level: number;
  @Column({ nullable: true })
  readonly active: boolean;

  constructor(id: number, pseudo: string, level: number, active: boolean) {
    this.id = id;
    this.pseudo = pseudo;
    this.level = level;
    this.active = active;
  }
}
