import { IsString, IsNotEmpty, IsDateString, IsBoolean, IsOptional } from 'class-validator';

export class CreatePublicationDto {
  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsDateString()
  dateToPublish: string;

  @IsBoolean()
  @IsOptional()
  published: boolean;

  @IsString()
  @IsNotEmpty()
  socialMedia: string;
}

