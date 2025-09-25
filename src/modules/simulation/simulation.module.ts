import { Module } from '@nestjs/common';
import { SimulationService } from './simulation.service';
import { DeviceModule } from '../device/device.module';
import { DeviceMetricModule } from '../device-metric/device-metric.module';
import { AlertModule } from '../alert/alert.module';

@Module({
  imports: [DeviceModule, DeviceMetricModule, AlertModule],
  providers: [SimulationService],
})
export class SimulationModule {}
