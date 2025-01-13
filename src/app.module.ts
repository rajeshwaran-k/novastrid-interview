import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
@Module({
  imports: [AuthModule,     MikroOrmModule.forRoot(),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
