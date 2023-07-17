import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { PublicationRepository } from './publication.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { PublicationsController } from './publications.controller';

@Module({
  imports: [PrismaModule, AuthModule, UserModule],
  providers: [PublicationService, PublicationRepository],
  controllers: [PublicationController, PublicationsController]
})
export class PublicationModule {}
