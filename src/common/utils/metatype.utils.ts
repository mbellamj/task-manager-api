/* eslint-disable @typescript-eslint/no-unsafe-function-type */
export function validateMetaType(metatype: Function): boolean {
  const types: Function[] = [String, Boolean, Number, Array, Object];
  return !types.includes(metatype);
}
