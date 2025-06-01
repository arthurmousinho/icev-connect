import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { AppController } from './app.controller';
import { AuthModule } from './core/auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    
  ],
  exports: [],
})
export class AppModule { }