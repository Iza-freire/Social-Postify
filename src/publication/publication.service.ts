import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PublicationRepository } from './publication.repository';
import { CreatePublicationDto } from './dto/publication.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PublicationService {
  constructor(private readonly publicationRepository: PublicationRepository) { }

  async checkDuplicateTitle(title: string) {
    const existingPublication = await this.publicationRepository.getByTitle(title);
    if (existingPublication) {
      throw new ConflictException('Publication with the same title already exists');
    }
  }

  async create(userId: number, publicationDTO: CreatePublicationDto) {
    await this.checkDuplicateTitle(publicationDTO.title);

    const publicationData: Prisma.PublicationCreateInput = {
      User: { connect: { id: userId } },
      image: publicationDTO.image,
      title: publicationDTO.title,
      text: publicationDTO.text,
      dateToPublish: new Date(publicationDTO.dateToPublish),
      published: publicationDTO.published,
      socialMedia: publicationDTO.socialMedia,
      createdAt: new Date(),
    };

    return this.publicationRepository.create(publicationData);
  }

  async get(userId: number, id: number) {
    const publication = await this.publicationRepository.getById(id);

    if (!publication) {
      throw new NotFoundException('Publication not found');
    }

    return publication;
  }

  async getAllByUser(userId: number) {
    return this.publicationRepository.getAllByUser(userId);
  }

  async delete(userId: number, id: number) {
    const publication = await this.publicationRepository.getById(id);

    if (!publication) {
      throw new NotFoundException('Publication not found');
    }

    await this.publicationRepository.delete(id);
    return { message: 'Publication deleted successfully' };
  }

  async update(userId: number, id: number, updatePublicationDto: CreatePublicationDto) {
    const publication = await this.publicationRepository.getById(id);

    if (!publication) {
      throw new NotFoundException('Publication not found');
    }

    const { dateToPublish, ...updateData } = updatePublicationDto;

    const updatedPublication = await this.publicationRepository.update(id, updateData);

    return { message: 'Publication updated successfully', updatedPublication };
  }

}


