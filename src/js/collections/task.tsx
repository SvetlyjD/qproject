import Collection from '@core/components/abstract/collection';
import { BASEURL, PORT } from '@core/generated/config';
import TaskModel from '../models/task';

export class TaskCollection extends Collection {
  get model() {
    return TaskModel;
  }

  get config() {
    return {
      load: {
        request: { url: `${BASEURL}:${PORT}/issues/list` },

      },
    };
  }
} 

export default TaskCollection;