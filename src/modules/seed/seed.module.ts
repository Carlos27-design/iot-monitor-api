import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { DeviceModule } from '../device/device.module';

@Module({
  providers: [SeedService],
  controllers: [SeedController],
  imports: [DeviceModule],
})
export class SeedModule {}
