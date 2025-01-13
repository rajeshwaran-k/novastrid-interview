import {
  IsString,
  IsEmail,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  validateSync,
} from 'class-validator';
import { plainToClass } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';

class UserChatData {
  @IsString()
  @IsNotEmpty()
  chatId: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsDate()
  timestamp: Date;

  @IsEmail()
  senderEmail: string;

  @IsString()
  @IsNotEmpty()
  messageType: string;

  @IsBoolean()
  isRead: boolean;
}

export function validateUserChatData(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(UserChatData, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0 && errors[0]?.constraints) {
    throw new BadRequestException(Object.values(errors[0].constraints!));
  }
  return validatedConfig;
}
