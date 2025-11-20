import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  IsDateString,
  IsBoolean,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsOptional()
  @IsString()
  profile?: string;

  @IsNotEmpty()
  @IsEnum(['admin', 'user', 'employee'])
  user_type: 'admin' | 'user' | 'employee';

  @IsOptional()
  @IsEnum(['Permanent', 'Contract'])
  employee_type?: 'Permanent' | 'Contract';

  @IsNotEmpty()
  @IsString()
  company: string;

  @IsOptional()
  @IsEnum(['active', 'deactive'])
  status?: 'active' | 'deactive';

  @IsOptional()
  @IsDateString()
  dob?: string;

  @IsOptional()
  @IsEnum(['male', 'female'])
  gender?: 'male' | 'female';

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  @IsString()
  present_address?: string;

  @IsOptional()
  @IsString()
  permanent_address?: string;

  @IsOptional()
  @IsString()
  user_designation?: string;
}
