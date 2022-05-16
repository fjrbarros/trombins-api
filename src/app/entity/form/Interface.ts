import { EnglishLevel, AvailabilityDayWeek } from '../../entity/form/Enums';

export interface IRequestGetForm {
  name?: string;
  fullTimeWork?: boolean;
  collage?: boolean;
  english?: EnglishLevel;
  availability?: AvailabilityDayWeek;
  read?: boolean;
  page?: number;
  perPage?: number;
}
