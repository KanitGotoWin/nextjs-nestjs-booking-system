import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    return await this.userRepository.create(createUserDto);
  }

  async findAll(): Promise<ResponseUserDto[]> {
    return await this.userRepository.findAll();
  }

  async findOne(id: number): Promise<ResponseUserDto | null> {
    return await this.userRepository.findOne(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<ResponseUserDto> {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.userRepository.remove(id);
  }
}
