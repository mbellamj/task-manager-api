import {
  MainSwaggerDocument,
  SwaggerDocument,
} from './common/interfaces/swagger.service';
import { AuthModule } from './modules/auth/auth.module';
import { TaskModule } from './modules/task/task.module';
import { TasklistModule } from './modules/tasklist/tasklist.module';
import { UserModule } from './modules/user/user.module';

const modules: SwaggerDocument[] = [
  {
    module: AuthModule,
    name: 'auth',
    title: 'Authentication module',
    description:
      'Module for authenticating user using passeport, local and jwt strategies',
    tag: 'auth',
  },
  {
    module: UserModule,
    name: 'user',
    title: 'User module',
    description: 'Module for managing user CRUD operations',
    tag: 'users',
  },
  {
    module: TasklistModule,
    name: 'tasklist',
    title: 'Tasklist module',
    description: 'Module for managing tasklists CRUD operations',
    tag: 'tasklists',
  },
  {
    module: TaskModule,
    name: 'task',
    title: 'Task module',
    description: 'Module for managing tasks CRUD operations',
    tag: 'tasks',
  },
];

export const swagger: MainSwaggerDocument = {
  name: 'api',
  tag: 'task-management-api',
  title: 'Task Management API',
  description: 'API for managing users, task lists, and tasks',
  documents: modules,
};
