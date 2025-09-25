import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AlertService } from './alert.service';
import { Alert } from './alert.entity';
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('alert')
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @Post()
  @Auth()
  create(@Body() alert: Partial<Alert>): Promise<Alert> {
    return this.alertService.create(alert);
  }

  @Get()
  @Auth()
  findAll(): Promise<Alert[]> {
    return this.alertService.findAll();
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: number): Promise<Alert> {
    return this.alertService.findById(id);
  }
}
