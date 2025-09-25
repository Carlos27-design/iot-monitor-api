import { AlertService } from '../alert/alert.service';
import { DeviceMetricService } from '../device-metric/device-metric.service';
import { Device } from '../device/entities/device.entity';
import { DeviceService } from './../device/device.service';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class SimulationService implements OnModuleInit {
  constructor(
    private readonly deviceService: DeviceService,
    private readonly deviceMetricService: DeviceMetricService,
    private readonly alertService: AlertService,
  ) {}

  async onModuleInit() {
    this.startSimulationLoop();
  }

  private async startSimulationLoop() {
    const devices = await this.deviceService.findAll();

    const loop = async () => {
      for (const device of devices) {
        const metrics = this.generateRandomMetric(device);
        for (const metric of metrics) {
          const savedMetric = await this.deviceMetricService.create(metric);

          if (savedMetric.metric === 'battery' && savedMetric.valueNum < 20) {
            await this.alertService.create({
              device: savedMetric.device,
              metric: savedMetric,
              message: 'Low battery level',
              severety: 'High',
              alertType: 'Battery',
              resolved: false,
            });
          }
        }
      }
      setTimeout(loop, 10000); // espera 10s antes de la próxima iteración
    };

    loop();
  }

  private generateRandomMetric(device: Device) {
    return [
      {
        device: device,
        metric: 'temperature',
        valueNum: this.randomFloat(0, 40),
      },
      {
        device: device,
        metric: 'humidity',
        valueNum: this.randomFloat(0, 100),
      },
      {
        device: device,
        metric: 'battery',
        valueNum: this.randomFloat(0, 100),
      },
    ];
  }

  private randomFloat(min: number, max: number): number {
    return parseFloat(Math.random() * (max - min) + min.toFixed(2));
  }
}
