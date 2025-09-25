import { BadRequestException, Injectable } from '@nestjs/common';
import { Device } from './entities/device.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDeviceDto } from './dtos/create-device.dto';

@Injectable()
export class DeviceService {
  @InjectRepository(Device)
  private readonly deviceRepository: Repository<Device>;

  public async create(deviceData: CreateDeviceDto): Promise<Device> {
    try {
      const exists = await this.deviceRepository.findOne({
        where: { serialNumber: deviceData.serialNumber },
      });

      if (exists) {
        throw new BadRequestException(
          `Device with serial number ${deviceData.serialNumber} already exists`,
        );
      }

      const device = this.deviceRepository.create(deviceData);
      return await this.deviceRepository.save(device);
    } catch (error) {
      throw new BadRequestException(error.message || 'Error creating device');
    }
  }
  public async findAll(): Promise<Device[]> {
    return await this.deviceRepository.find({
      relations: ['metric', 'alerts'],
    });
  }

  public async findById(id: string): Promise<Device> {
    if (!id) {
      throw new BadRequestException('ID is required');
    }

    const device = await this.deviceRepository.findOne({
      where: { id },
      relations: ['metrics', 'alerts'],
    });

    if (!device) {
      throw new BadRequestException('Device not found');
    }

    return device;
  }
}
