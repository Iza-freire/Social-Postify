import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Publication, Prisma } from '@prisma/client';

@Injectable()
export class PublicationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getByTitle(title: string): Promise<Publication | null> {
    return this.prisma.publication.findFirst({ where: { title } });
  }

  async create(publicationData: Prisma.PublicationCreateInput): Promise<Publication> {
    return this.prisma.publication.create({ data: publicationData });
  }

  async getById(id: number): Promise<Publication | null> {
    return this.prisma.publication.findUnique({ where: { id } });
  }

  async getAllByUser(userId: number): Promise<Publication[]> {
    return this.prisma.publication.findMany({ where: { userId } });
  }

  async delete(id: number): Promise<Publication> {
    return this.prisma.publication.delete({ where: { id } });
  }

  async update(id: number, updatePublicationData: Prisma.PublicationUpdateInput): Promise<Publication> {
    return this.prisma.publication.update({ where: { id }, data: updatePublicationData });
  }
}

