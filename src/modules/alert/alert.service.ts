import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alert } from './alert.entity';
import { Repository } from 'typeorm';
import { NotificationGateway } from '../notification/notification.gateway';

import { MailerConfigService } from '../mailer-config/mailer-config.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AlertService {
  constructor(
    @InjectRepository(Alert)
    private readonly alertRepository: Repository<Alert>,
    private readonly notificationGateway: NotificationGateway,
    private readonly mailerService: MailerConfigService,
    private readonly authService: AuthService,
  ) {}

  public async create(alert: Partial<Alert>): Promise<Alert> {
    const newAlert = this.alertRepository.create(alert);

    const savedAlert = await this.alertRepository.save(newAlert);

    this.notificationGateway.server.emit('alert', {
      message: savedAlert.message,
      severity: savedAlert.severety,
    });

    const users = await this.authService.findAll();

    await Promise.all(
      users.map((user) =>
        this.mailerService.sendEmail({
          from: process.env.USER_SMTP!,
          to: user.email,
          subject: savedAlert.message,
          text: savedAlert.message,
          html: `
            <h1>${savedAlert.message}</h1>
            <p> Por favor verifique el dispositivo con serial number: ${savedAlert.device.serialNumber!}</p>
            <p>severity: ${savedAlert.severety}</p>
          `,
        }),
      ),
    );

    return savedAlert;
  }

  public async findAll(): Promise<Alert[]> {
    return this.alertRepository.find({ relations: ['device', 'metric'] });
  }

  public async findById(id: number): Promise<Alert> {
    const alert = await this.alertRepository.findOne({
      where: { id },
      relations: ['device', 'metric'],
    });

    if (!alert) {
      throw new BadRequestException('Alert not found');
    }

    return alert;
  }
}
