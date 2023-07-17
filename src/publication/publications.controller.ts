import { Controller, Get, UseGuards } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { LoggedUser } from 'src/decorator/user.decorator';
import { User } from '@prisma/client';

@Controller('publications')
@UseGuards(AuthGuard)
export class PublicationsController {
  constructor(private readonly publicationService: PublicationService) {}

  @Get()
  async getAllByUser(@LoggedUser() user: User) {
    return await this.publicationService.getAllByUser(user.id);
  }
}
