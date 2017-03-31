import {
  Map,
  Record as ImmutableRecord
} from 'immutable';

// immutable 3.8.1
export function recordBaseClass(): ClassDecorator {
  return (target: Function): Function => {
    const recordBaseProto = target.prototype;
    const recordProto = ImmutableRecord({}).prototype;

    const recordBaseProps =
      Object.getOwnPropertyNames(recordBaseProto)
      .filter(x => x !== 'constructor');
    for (const prop of recordBaseProps) {
      recordProto[prop] = recordBaseProto[prop];
    }

    recordProto._name = '';
    recordProto._keys = [];
    recordProto._defaultValues = {};
    Object.defineProperty(recordProto, 'size', {
      get() {
        return this._keys.length;
      }
    });

    const Record = function(): void {
      if (!(this instanceof Record)) {
        return new Record();
      }

      this._map = Map();
    };

    Record.prototype = recordProto;
    Record.prototype.constructor = Record;
    return Record;
  };
}