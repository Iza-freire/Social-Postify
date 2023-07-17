import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { LoggedUser } from 'src/decorator/user.decorator';
import { User } from '@prisma/client';
import { CreatePublicationDto } from './dto/publication.dto';

@Controller('publication')
@UseGuards(AuthGuard)
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Post()
  async create(@LoggedUser() user: User, @Body() publicationDTO: CreatePublicationDto) {
    return await this.publicationService.create(user.id, publicationDTO);
  }

  @Get(":id")
  async get(@LoggedUser() user: User, @Param("id", ParseIntPipe) id: number) {
    return await this.publicationService.get(user.id, id);
  }

  @Delete(":id")
  async delete(@LoggedUser() user: User, @Param("id", ParseIntPipe) id: number) {
    return await this.publicationService.delete(user.id, id);
  }

  @Put(":id")
  async update(@LoggedUser() user: User, @Param("id", ParseIntPipe) id: number, @Body() updatePublicationDto: CreatePublicationDto) {
    return await this.publicationService.update(user.id, id, updatePublicationDto);
  }
}



