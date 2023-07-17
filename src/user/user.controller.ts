import { Controller, Delete, Get, Param, ParseIntPipe, Patch, UseGuards, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { LoggedUser } from 'src/decorator/user.decorator';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-ser.dto';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch(':id')
  async update(@LoggedUser() user: User, @Param('id', ParseIntPipe) id: number, @Body() userDTO: CreateUserDto) {
    return this.userService.update(user.id, id, userDTO);
  }

  @Delete(':id')
  async delete(@LoggedUser() user: User, @Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(user.id, id);
  }
}
