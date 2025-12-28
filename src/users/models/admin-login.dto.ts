import { IsString } from 'class-validator';

export class LoginAdminDto {
  @IsString()
  email: string;
  @IsString()
  password: string;
  @IsString()
  device_id: string;
  @IsString()
  device_type: string;
}
