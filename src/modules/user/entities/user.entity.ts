import { Permission } from '@/common/enums/permission.enum';
import { Role } from '@/common/enums/role.enum';
import { SQLEntity } from '@/common/interfaces/sql.entity';
import { Column, Entity } from 'typeorm';

/**
 * Entity representing a user in the system.
 *
 * The `User` class defines the structure of a user entity, including core attributes like
 * name, surname, email, password, and a list of permissions.
 *
 * This class inherits from `SQLEntity`, which likely includes common fields like `id`,
 * `createdAt`, and `updatedAt` for all entities, ensuring consistency and reuse of base entity fields.
 */
@Entity()
export class User extends SQLEntity {
  /**
   * The unique email address for the user.
   *
   * This field is required and must be a valid email address. It serves as the primary
   * identifier for users, enabling login and communication with them.
   *
   * @example "john.doe@example.com"
   */
  @Column({ unique: true })
  email: string;

  /**
   * The user's name.
   *
   * This field is required and is stored as a plain string.
   *
   * @example John DOE
   */
  @Column()
  name: string;

  /**
   * The user's first name (optional).
   *
   * This field is nullable and can be left empty. If present, it will be stored as a string.
   * It is often used for personalization, such as addressing users in a friendly manner.
   */
  @Column({ nullable: true })
  firstName?: string;

  /**
   * The user's password.
   *
   * This field is required and stores the user's password as a plain string.
   * Passwords must be securely hashed before being stored in the database to prevent
   * unauthorized access and protect user data.
   *
   * @example "hashedpassword123"
   */
  @Column()
  password: string;

  /**
   * The list of roles associated with the user.
   *
   * This field stores the roles that the user has in the system, represented by the
   * `Role` enum. Roles control access to various parts of the system and define
   * the actions the user is allowed to perform.
   */
  @Column({ type: 'enum', array: true, enum: Role, default: [Role.USER] })
  roles: Role[];

  /**
   * The list of permissions associated with the user.
   *
   * This field stores the permissions that the user has in the system, represented by the
   * `Permission` enum. Permissions control access to various parts of the system and define
   * the actions the user is allowed to perform.
   */
  @Column({
    type: 'enum',
    array: true,
    enum: Permission,
    default: [Permission.READ],
  })
  permissions: Permission[];
}
