import { TaskStatus } from '../model/task-status';

export class FilterAndSearchDto {
  status?: TaskStatus;
  search?: string;
}
