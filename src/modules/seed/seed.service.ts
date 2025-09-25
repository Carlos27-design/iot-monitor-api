import { Injectable } from '@nestjs/common';
import { initialData } from './data/seed-data';
import { DeviceService } from '../device/device.service';

@Injectable()
export class SeedService {
  constructor(private readonly deviceService: DeviceService) {}

  public async insertNewDevice(): Promise<boolean> {
    const devices = initialData.devices;

    const insertPromises = devices.map((device) =>
      this.deviceService.create(device).catch((error) => {
        throw new Error(`Skipping seed`);
      }),
    );

    await Promise.all(insertPromises);

    return true;
  }
}
