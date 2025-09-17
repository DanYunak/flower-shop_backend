import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { JWT_SECRET } from '../config';
import { AuthDto } from './dto/authDto';
import { LoginResponseDto } from './dto/loginResponseDto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    async createUser(authDto: AuthDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ where: { username: authDto.username } })

        if (user) {
            throw new HttpException('User with this username already exists', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const newUser = new UserEntity()
        Object.assign(newUser, authDto)

        return await this.userRepository.save(newUser)
    }

    async login(authDto: AuthDto): Promise<LoginResponseDto> {
        const user = await this.userRepository.findOne({ 
            where: { username: authDto.username },
            select: ['id', 'username', 'password']
         })

        if (!user) {
            throw new HttpException('Credentials are invalid', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const isPasswordCorrect = await compare(authDto.password, user.password)

        if (!isPasswordCorrect) {
            throw new HttpException('Credentials are invalid', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        delete user.password

        return {
            ...user,
            token: this.generateJwt(user)
        }
    }

    generateJwt(user: UserEntity): string {
        return sign({
            id: user.id,
            username: user.username,
        }, JWT_SECRET)
    }

    findById(id: number): Promise<UserEntity> {
        return this.userRepository.findOne({ where: { id } })
    }
}
