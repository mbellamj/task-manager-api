import { ClassConstructor } from 'class-transformer';

export type ExtractKey<T> = Extract<
  keyof T,
  { [P in keyof T]: T[P] extends string ? P : never }[keyof T]
>;

export type Criteria<T> = Partial<Pick<T, ExtractKey<T>>>;

export type Partialize<T> = { [P in keyof T]?: Partialize<T[P]> };

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export type ClassOrFunction<T = any> = ClassConstructor<T> | Function;

export type QueryFilter<T> = Partial<T> & {
  page?: number;
  limit?: number;
};
