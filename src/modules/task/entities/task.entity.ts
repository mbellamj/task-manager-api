import { TaskStatus } from '@/common/enums/task-status.enum';
import { SQLEntity } from '@/common/interfaces/sql.entity';
import { Column, Entity } from 'typeorm';

/**
 * Represents a task entity in the database.
 * Inherits common properties (e.g., id, timestamps) from `SQLEntity`.
 */
@Entity()
export class Task extends SQLEntity {
  /**
   * The ID of the tasklist this task belongs to.
   * Stored as a UUID.
   */
  @Column('uuid')
  targetId: string;

  /**
   * The title of the task.
   */
  @Column()
  title: string;

  /**
   * A short description of the task.
   */
  @Column()
  description: string;

  /**
   * A more detailed description of the task.
   * This field is optional.
   */
  @Column({ nullable: true })
  fullDecription?: string;

  /**
   * The status of the task, represented as an enum.
   * Defaults to `PENDING`.
   */
  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.PENDING })
  status: TaskStatus;

  /**
   * The due date of the task.
   * Stored as a timestamp.
   */
  @Column({ type: 'timestamp' })
  dueDate: Date;

  /**
   * The priority of the task.
   * Must be an integer between 1 and 5.
   * Defaults to 3.
   */
  @Column({ type: 'int', default: 3 })
  priority?: number;
}
