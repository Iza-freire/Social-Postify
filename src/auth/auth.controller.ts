import { Body, Controller, Post } from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegistrerDTO } from './dto/auth-register.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){ }

    @Post("signin")
    async signin(@Body() body: AuthLoginDTO){
        const { email, password } = body;
       return this.authService.signin(email, password);
    }

     @Post("user")
    async signup(@Body() body: AuthRegistrerDTO){
        return this.authService.signup(body);
    }
}
