import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { WarriorsService } from '../service/warriors.service';
import { WarriorDto } from '../dto/warrior.dto';
import { Response } from 'express';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino/dist';

interface CreatedWarriorDto {
  warriorId: number;
}

@Controller(WarriorsController.PATH)
export class WarriorsController {
  private static readonly PATH: string = '/api/v1/warriors';

  constructor(
    private readonly warriorsService: WarriorsService,
    @InjectPinoLogger(WarriorsController.name)
    private readonly log: PinoLogger,
  ) {}

  @Post()
  async create(
    @Res() res: Response,
    @Body() warrior: WarriorDto,
  ): Promise<Response<CreatedWarriorDto>> {
    this.log.debug({ message: 'Creating warrior...', body: warrior });
    let warriorId;
    try {
      warriorId = await this.warriorsService.create(warrior).then(w => w.id);
    } catch (e) {
      this.handleError(e, 'Failed to create a warrior');
    }

    res.setHeader('location', WarriorsController.PATH + `/${warriorId}`);
    return res.json({ warriorId });
  }

  @Get(':id')
  getById(@Param('id', new ParseIntPipe()) id: number): Promise<WarriorDto> {
    this.log.debug({ message: `Retrieving warrior with id ${id}` });
    try {
      return this.warriorsService.getById(id);
    } catch (e) {
      this.handleError(e, 'Failed to get warrior');
    }
  }

  @Put(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() warrior: WarriorDto,
  ): Promise<WarriorDto> {
    this.log.debug({
      message: `Updating warrior with id ${id}`,
      body: warrior,
    });
    try {
      return this.warriorsService.update(id, warrior);
    } catch (e) {
      this.handleError(e, 'Failed to create a warrior');
    }
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    this.log.debug({ message: `Deleting warrior with id ${id}` });
    try {
      return this.warriorsService.delete(id);
    } catch (e) {
      this.handleError(e, 'Failed to delete a warrior');
    }
  }

  private handleError(error: Error, defaultMessage: string) {
    this.log.error({ message: defaultMessage, detail: error });
    throw error instanceof HttpException
      ? error
      : new InternalServerErrorException(defaultMessage, error.message);
  }
}
