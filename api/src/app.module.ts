import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { AppController } from './app.controller';
import { AuthModule } from './core/auth/auth.module';
import { UserModule } from './core/user/user.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
  ],
  controllers: [
    AppController
  ],
  providers: [
    
  ],
  exports: [],
})
export class AppModule { }