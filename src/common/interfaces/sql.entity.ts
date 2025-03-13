import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class SQLEntity {
  /**
   * Unique identifier for the entity, generated as a UUID.
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Create date and time for the promotion.
   * Stored as a timestamp.
   */
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  /**
   * Update date and time for the promotion.
   * Stored as a timestamp.
   */
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
