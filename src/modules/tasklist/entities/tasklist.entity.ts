import { Column, Entity } from 'typeorm';

import { SQLEntity } from '@/common/interfaces/sql.entity';

/**
 * Represents a task list entity.
 *
 * This entity stores information about a task list, including the user who owns it
 * and its unique name.
 */
@Entity()
export class Tasklist extends SQLEntity {
  /**
   * The ID of the user who owns this task list.
   *
   * @remarks This is a foreign key referencing the `User` entity.
   */
  @Column('uuid')
  targetId: string;

  /**
   * The unique name of the task list.
   *
   * @remarks Task list names must be unique per user.
   */
  @Column()
  name: string;
}
