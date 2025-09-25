import { Module } from '@nestjs/common';
import { DeviceModule } from './device/device.module';

import { AlertModule } from './alert/alert.module';
import { NotificationModule } from './notification/notification.module';
import { DeviceMetricModule } from './device-metric/device-metric.module';
import { SeedModule } from './seed/seed.module';
import { SimulationModule } from './simulation/simulation.module';
import { MailerConfigModule } from './mailer-config/mailer-config.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DeviceModule,
    DeviceMetricModule,
    AlertModule,
    AuthModule,
    NotificationModule,
    SeedModule,
    SimulationModule,
    MailerConfigModule,
  ],
})
export class ModulesModule {}
