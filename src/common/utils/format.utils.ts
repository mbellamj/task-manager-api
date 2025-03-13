import { Criteria } from '../interfaces/types';

export function formatCriteria<T>(criteria?: Criteria<T>) {
  if (!criteria) return '';

  return Object.entries(criteria).reduce((acc, [key, value], index, array) => {
    return (
      acc +
      `${key}: ${value as string}` +
      (index < array.length - 1 ? ' and ' : '')
    );
  }, '');
}

export function parseCriteria<T>(criteriaString?: string) {
  if (!criteriaString) return {} as Criteria<T>;
  return { targetId: criteriaString };
}
