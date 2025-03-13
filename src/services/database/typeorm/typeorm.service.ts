import {
  BadRequestException,
  ConflictException,
  HttpException,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { catchError, from, map, mergeMap, Observable, throwError } from 'rxjs';
import {
  DeepPartial,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';

import { PaginatedResult } from '@/common/dtos/paginated-result.dto';
import { RepositoryPort } from '@/common/interfaces/repository.port';
import { Criteria, QueryFilter } from '@/common/interfaces/types';
import { paginate } from '@/common/operators/paginate';
import { formatCriteria } from '@/common/utils/format.utils';

export class TypeOrmService<T extends ObjectLiteral>
  implements RepositoryPort<T>
{
  private readonly logger = new Logger(TypeOrmService.name);

  constructor(protected readonly repository: Repository<T>) {}

  create(data: DeepPartial<T>): Observable<T> {
    this.logger.log(`Creating entity...`);
    const entity = this.repository.create(data);
    return from(this.repository.save(entity)).pipe(
      catchError((error: unknown) => {
        this.logger.error(`Error Creating entity`, error);

        return throwError(() => new ConflictException('Entity already exists'));
      }),
    );
  }

  update(id: string, data: DeepPartial<T>): Observable<T> {
    this.logger.log(`Updating Entity by ID: ${id}`);

    return this.findOne({ id } as unknown as Criteria<T>).pipe(
      mergeMap((entity) => {
        const updates = this.repository.create({ ...entity, ...data });
        return from(this.repository.save(updates));
      }),
      catchError((error) => {
        this.logger.error(`Error updating entity ID: ${id}`, error);

        if (error instanceof NotFoundException) return throwError(() => error);

        return throwError(
          () =>
            new UnprocessableEntityException(
              `Could not update entity ID: ${id} | data compromised`,
            ),
        );
      }),
    );
  }

  findOne(criteria: Criteria<T>) {
    const criteriaString = formatCriteria(criteria);

    this.logger.log(`Find entity by ${criteriaString}`);
    const notFoundMesage = `Entity with ${criteriaString} not found`;

    return from(
      this.repository.findOneBy(criteria as FindOptionsWhere<T>),
    ).pipe(
      map((entity) => {
        if (!entity) {
          this.logger.warn(notFoundMesage);
          throw new NotFoundException(notFoundMesage);
        }

        return entity;
      }),
      catchError(() => {
        return throwError(() => new NotFoundException(notFoundMesage));
      }),
    );
  }

  findAll(query: QueryFilter<T>): Observable<PaginatedResult<T>> {
    const { limit = 10, page = 1, ...where } = query;

    this.logger.log(`Filtered items with, page: ${page}, limit: ${limit}`);

    this.logger.debug(where);

    return from(
      this.repository.findAndCount({
        where: where as FindOptionsWhere<T>,
        skip: (page - 1) * limit,
        take: limit,
      }),
    ).pipe(
      paginate({ limit, page }),
      map((values) => {
        this.logger.log(`${values.data.length}} items generated !`);
        return values;
      }),
      catchError((error: Error) => {
        this.logger.error(error.message);
        return throwError(() => new BadRequestException(error.message));
      }),
    );
  }

  remove(criteria: Criteria<T>) {
    const criteriaString = formatCriteria(criteria);

    this.logger.log(`Removing entities by ${criteriaString}`);

    return from(this.repository.delete(criteria as FindOptionsWhere<T>)).pipe(
      map((result) => {
        const count = result.affected ?? 0;
        if (!count)
          throw new NotFoundException(
            `Entity with ${criteriaString} not found`,
          );

        this.logger.log(
          `${count} ${count > 1 ? 'Entities' : 'Entity'} with ${criteriaString} removed`,
        );
        return;
      }),
      catchError((error: HttpException) => {
        const message = `Entity with ${criteriaString} not deleted`;
        this.logger.warn(message);
        return throwError(() => error);
      }),
    );
  }
}
