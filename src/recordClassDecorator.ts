import { META_KEY } from './common';

export function recordClass(): ClassDecorator {
  return (target: Function): void => {
    const proto = target.prototype;

    if (proto[META_KEY]) {
      const meta = proto[META_KEY];
      const props = {};
      for (const prop in meta) {
        if (meta.hasOwnProperty(prop)) {
          props[prop] = meta[prop];
        }
      }

      delete proto[META_KEY];
      updateRecordProto(proto, props);
    }
  };
}

// immutable 3.8.1
function updateRecordProto(proto: any, props: Object): void {
  const keys =
    Object.keys(props)
    .filter(x => !proto._keys.some(y => y === x));

  keys.forEach(key => {
    proto._keys.push(key);
    setProp(proto, key);
  });

  for (const prop in props) {
    if (props.hasOwnProperty(prop)) {
      proto._defaultValues[prop] = props[prop];
    }
  }
}

function setProp(proto: any, name: string) {
  Object.defineProperty(proto, name, {
    get() {
      return this.get(name);
    },
    set(value) {
      if (!this.__ownerID) {
        throw new Error('Cannot set on an immutable record.');
      }
      this.set(name, value);
    }
  });
}