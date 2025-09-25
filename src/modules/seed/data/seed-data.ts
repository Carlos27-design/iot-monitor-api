import { Device } from 'src/modules/device/entities/device.entity';

interface seedDeviceData {
  name: string;
  serialNumber: string;
  status: string;
}

interface seedData {
  devices: seedDeviceData[];
}

export const initialData: seedData = {
  devices: [
    { name: 'Temperature Sensor 1', serialNumber: 'SN-001', status: 'online' },
    { name: 'Humidity Sensor 2', serialNumber: 'SN-002', status: 'online' },
    { name: 'Pressure Sensor 3', serialNumber: 'SN-003', status: 'online' },
    { name: 'Door Camera 4', serialNumber: 'SN-004', status: 'online' },
    { name: 'Security Alarm 5', serialNumber: 'SN-005', status: 'online' },
    { name: 'Smoke Detector 6', serialNumber: 'SN-006', status: 'online' },
    { name: 'Water Leak Sensor 7', serialNumber: 'SN-007', status: 'online' },
    { name: 'Motion Sensor 8', serialNumber: 'SN-008', status: 'online' },
    { name: 'Light Sensor 9', serialNumber: 'SN-009', status: 'online' },
    { name: 'CO2 Sensor 10', serialNumber: 'SN-010', status: 'online' },
    { name: 'Temperature Sensor 11', serialNumber: 'SN-011', status: 'online' },
    { name: 'Humidity Sensor 12', serialNumber: 'SN-012', status: 'online' },
    { name: 'Pressure Sensor 13', serialNumber: 'SN-013', status: 'online' },
    { name: 'Door Camera 14', serialNumber: 'SN-014', status: 'online' },
    { name: 'Security Alarm 15', serialNumber: 'SN-015', status: 'online' },
    { name: 'Smoke Detector 16', serialNumber: 'SN-016', status: 'online' },
    { name: 'Water Leak Sensor 17', serialNumber: 'SN-017', status: 'online' },
    { name: 'Motion Sensor 18', serialNumber: 'SN-018', status: 'online' },
    { name: 'Light Sensor 19', serialNumber: 'SN-019', status: 'online' },
    { name: 'CO2 Sensor 20', serialNumber: 'SN-020', status: 'online' },
  ],
};
