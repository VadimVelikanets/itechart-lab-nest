import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.model';
import { EAuth } from './constants';
import { Logger } from 'winston';

@Injectable()
export class AuthService {
  private readonly logger = new Logger();
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginUserDto) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  async registration(dto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(dto.email);
    if (candidate) {
      throw new HttpException(EAuth.USER_EXIST, HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.userService.create({
      ...dto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  async authorization(req, res) {
    try {
      const user = await this.userService.getUserById(req.user.id);
      if (!user) {
        throw new HttpException(EAuth.USER_NOT_EXIST, HttpStatus.BAD_REQUEST);
      }
      const token = this.jwtService.sign({ id: user.id }, { expiresIn: '24h' });
      return res.json({
        id: user.id,
        email: user.email,
        username: user.username,
        token: token,
      });
    } catch (e) {
      this.logger.error(e);
    }
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: LoginUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: EAuth.WRONG_AUTH });
  }
}
