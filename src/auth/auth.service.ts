import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRegistrerDTO } from './dto/auth-register.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    private ISSUER = "socialpostify";
    private AUDIENCE = "users";


    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService

    ) { }

    async signup(data: AuthRegistrerDTO) {
        const user = await this.userService.create(data);
        return { id: user.id, email: user.email};
    }

    async signin(email: string, password: string) {
        const user = await this.userService.getByEmail(email)
        if (!user) throw new UnauthorizedException('Email or password not valid.');

        const valid = bcrypt.compareSync(password, user.password)
        if (!valid) throw new UnauthorizedException('Email or password not valid.');

        return this.createToken(user);
    }

    async createToken(user: User) {
        const token = this.jwtService.sign({
            email: user.email
        }, {
            subject: String(user.id),
            issuer: this.ISSUER,
            audience: this.AUDIENCE
        });

        return { token }
    }

    async verifyToken(token: string) {
        try {
            const data = this.jwtService.verify(token, {
                audience: this.AUDIENCE,
                issuer: this.ISSUER,
            });
            return data;
        }
        catch (error) {
            console.log(error);
            throw new BadRequestException(error);
        }
    }
}
