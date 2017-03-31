import { META_KEY } from './common';

export function recordProp(value: any): PropertyDecorator {
  return (target: Object, propertyKey: string | symbol): void => {
    if (!target[META_KEY]) {
      target[META_KEY] = {};
    }

    target[META_KEY][propertyKey] = value;
  };
}