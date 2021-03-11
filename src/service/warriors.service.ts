import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WarriorEntity } from '../model/warrior.entity';
import { Repository } from 'typeorm/index';
import { WarriorDto } from '../dto/warrior.dto';

export class WarriorsServiceException extends Error {
  readonly cause: Error;

  constructor(message: string, cause: Error) {
    super(message);
    this.cause = cause;
  }
}

export class WarriorNotFoundException extends NotFoundException {
  constructor(warriorId: number) {
    super(`Warrior with id '${warriorId}' does not exist`, 'Not found');
  }
}

export class UniquePseudoException extends BadRequestException {
  constructor(pseudo: string, warriorId: number) {
    const message = `Pseudo '${pseudo}' already exist`;
    if (warriorId) {
      super(message, 'Cannot update warrior');
    } else {
      super(message, 'Cannot create warrior');
    }
  }
}

@Injectable()
export class WarriorsService {
  constructor(
    @InjectRepository(WarriorEntity)
    private readonly warriorsRepository: Repository<WarriorEntity>,
  ) {}

  async create(warriorDto: WarriorDto): Promise<WarriorDto> {
    await this.validatePseudo(warriorDto.pseudo, null);

    try {
      const warriorEntity = WarriorsService.toWarriorEntity(null, warriorDto);
      const created = await this.warriorsRepository.save(warriorEntity);
      return WarriorsService.toWarriorDto(created);
    } catch (e) {
      throw new WarriorsServiceException('Failed to create warrior', e);
    }
  }

  async getById(id: number): Promise<WarriorDto> {
    try {
      const warrior = await this.warriorsRepository.findOneOrFail(id);
      return WarriorsService.toWarriorDto(warrior);
    } catch (e) {
      throw new WarriorNotFoundException(id);
    }
  }

  async update(id: number, warriorDto: WarriorDto): Promise<WarriorDto> {
    await this.getById(id);
    await this.validatePseudo(warriorDto.pseudo, id);
    const warriorEntity = WarriorsService.toWarriorEntity(id, warriorDto);

    let updated: WarriorDto;
    try {
      updated = await this.warriorsRepository.save(warriorEntity);
    } catch (e) {
      throw new WarriorsServiceException('Failed to update warrior', e);
    }

    return WarriorsService.toWarriorDto(updated);
  }

  async delete(id: number): Promise<void> {
    const warrior = await this.getById(id);
    try {
      await this.warriorsRepository.delete(warrior);
    } catch (e) {
      throw new WarriorsServiceException('Failed to delete warrior', e);
    }
  }

  private static toWarriorDto(w: WarriorEntity): WarriorDto {
    return new WarriorDto(w.id, w.pseudo, w.level, w.active);
  }

  private static toWarriorEntity(id: number, dto: WarriorDto): WarriorEntity {
    return new WarriorEntity(id, dto.pseudo, dto.level, dto.active);
  }

  private async validatePseudo(pseudo: string, id?: number): Promise<void> {
    const warriorEntity = await this.warriorsRepository.findOne({
      where: [{ pseudo: pseudo }],
    });
    if (warriorEntity && warriorEntity.id !== id) {
      throw new UniquePseudoException(pseudo, id);
    }
  }
}
