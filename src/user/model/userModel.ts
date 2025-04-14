import { IsEnum, IsString } from 'class-validator';
import { Role } from '../../utils/util';

export class UserModel {
  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsString()
  public emailId: string;

  @IsEnum(Role)
  public role: string;
}