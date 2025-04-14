import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserModel } from './model/userModel';
import { sendErrorResponse } from '../utils/util';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  public async createUser(userDetail: UserModel, @Res() response: any) {
    try {
      const userExists = await this.userRepo.findOne({
        where: { emailId: userDetail.emailId },
      });

      if (userExists) {
        return sendErrorResponse(response, HttpStatus.CONFLICT, {
          message: 'User already exists with the provided email.',
          data: userDetail.emailId,
        });
      }

      const userData = this.buildUserEntity(userDetail);
      const savedUser = await this.userRepo.save(userData);

      return response.status(HttpStatus.CREATED).json({
        success: true,
        message: 'User created successfully',
        data: savedUser,
      });
    } catch (err) {
      return sendErrorResponse(response, HttpStatus.INTERNAL_SERVER_ERROR, {
        message: 'Unable to create user.',
        data: err.message,
      });
    }
  }

  private buildUserEntity(userDetail: UserModel): UserEntity {
    const userData = new UserEntity();
    userData.firstName = userDetail.firstName;
    userData.lastName = userDetail.lastName;
    userData.emailId = userDetail.emailId;
    userData.role = userDetail.role;
    return userData;
  }
}