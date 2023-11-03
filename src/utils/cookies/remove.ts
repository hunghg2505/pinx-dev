import { isArray } from './isArray';
import { set } from './set';
import { toArray } from './toArray';

export function remove(names: string | string[]) {
  // eslint-disable-next-line prefer-rest-params
  const namesV: any = isArray(names) ? names : toArray(arguments);
  for (let i = 0, l = names.length; i < l; i++) {
    // @ts-ignore
    set(namesV[i], '', -1);
  }
  return names;
}
