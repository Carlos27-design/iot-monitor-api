import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DeviceMetricService } from './device-metric.service';
import { DeviceMetric } from './device-metric.entity';
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('device-metric')
export class DeviceMetricController {
  constructor(private readonly deviceMetricService: DeviceMetricService) {}

  @Get()
  @Auth()
  findAll(): Promise<DeviceMetric[]> {
    return this.deviceMetricService.findAll();
  }

  @Get('device/:deviceId')
  @Auth()
  findByDeviceId(@Param('deviceId') deviceId: string): Promise<DeviceMetric[]> {
    return this.deviceMetricService.findByDeviceId(deviceId);
  }

  @Post()
  @Auth()
  create(@Body() metric: Partial<DeviceMetric>): Promise<DeviceMetric> {
    return this.deviceMetricService.create(metric);
  }
}
