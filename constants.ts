
import { TimeZone } from './types';

export const TIMEZONES: TimeZone[] = [
  { name: 'UTC', identifier: 'Etc/UTC' },
  { name: 'London', identifier: 'Europe/London' },
  { name: 'Paris', identifier: 'Europe/Paris' },
  { name: 'Dubai', identifier: 'Asia/Dubai' },
  { name: 'New York', identifier: 'America/New_York' },
  { name: 'Los Angeles', identifier: 'America/Los_Angeles' },
  { name: 'Tokyo', identifier: 'Asia/Tokyo' },
  { name: 'Sydney', identifier: 'Australia/Sydney' },
  { name: 'Moscow', identifier: 'Europe/Moscow' },
  { name: 'Beijing', identifier: 'Asia/Shanghai' },
  { name: 'São Paulo', identifier: 'America/Sao_Paulo' },
  { name: 'Johannesburg', identifier: 'Africa/Johannesburg' },
  { name: 'Cairo', identifier: 'Africa/Cairo' },
  { name: 'Chicago', identifier: 'America/Chicago' },
  { name: 'Denver', identifier: 'America/Denver' },
  { name: 'Hong Kong', identifier: 'Asia/Hong_Kong' },
  { name: 'Singapore', identifier: 'Asia/Singapore' },
  { name: 'Berlin', identifier: 'Europe/Berlin' },
  { name: 'Rome', identifier: 'Europe/Rome' },
  { name: 'Toronto', identifier: 'America/Toronto' },
];

export const PRESELECTED_TARGETS: string[] = ['Europe/London', 'Asia/Tokyo', 'America/New_York', 'Asia/Dubai'];
