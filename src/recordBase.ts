import {
  Iterable,
  Map
} from 'immutable';
import { recordBaseClass } from './recordBaseClassDecorator';

export interface IRecord {

  new(): IRecord & RecordBase;

  set(key: string, value: any): this;
  delete(key: string): this;
  remove(key: string): this;
  clear(): this;
  update(updater: (value: any) => this): this;
  update(key: string, updater: (value: any) => any): this;
  update(key: string, notSetValue: any, updater: (value: any) => any): this;
  merge(...iterables: Array<Iterable<string, any>>): this;
  merge(...iterables: Array<{[key: string]: any}>): this;
  mergeWith(
    merger: (previous?: any, next?: any, key?: string) => any,
    ...iterables: Array<Iterable<string, any>>
  ): this;
  mergeWith(
    merger: (previous?: any, next?: any, key?: string) => any,
    ...iterables: Array<{[key: string]: any}>
  ): this;
  mergeDeep(...iterables: Array<Iterable<string, any>>): this;
  mergeDeep(...iterables: Array<{[key: string]: any}>): this;
  mergeDeepWith(
    merger: (previous?: any, next?: any, key?: string) => any,
    ...iterables: Array<Iterable<string, any>>
  ): this;
  mergeDeepWith(
    merger: (previous?: any, next?: any, key?: string) => any,
    ...iterables: Array<{[key: string]: any}>
  ): this;
  setIn(keyPath: any[], value: any): this;
  setIn(KeyPath: Iterable<any, any>, value: any): this;
  deleteIn(keyPath: any[]): this;
  deleteIn(keyPath: Iterable<any, any>): this;
  removeIn(keyPath: any[]): this;
  removeIn(keyPath: Iterable<any, any>): this;
  updateIn(
    keyPath: any[],
    updater: (value: any) => any
  ): this;
  updateIn(
    keyPath: any[],
    notSetValue: any,
    updater: (value: any) => any
  ): this;
  updateIn(
    keyPath: Iterable<any, any>,
    updater: (value: any) => any
  ): this;
  updateIn(
    keyPath: Iterable<any, any>,
    notSetValue: any,
    updater: (value: any) => any
  ): this;
  mergeIn(
    keyPath: Iterable<any, any>,
    ...iterables: Array<Iterable<string, any>>
  ): this;
  mergeIn(
    keyPath: any[],
    ...iterables: Array<Iterable<string, any>>
  ): this;
  mergeIn(
    keyPath: any[],
    ...iterables: Array<{[key: string]: any}>
  ): this;
  mergeDeepIn(
    keyPath: Iterable<any, any>,
    ...iterables: Array<Iterable<string, any>>
  ): this;
  mergeDeepIn(
    keyPath: any[],
    ...iterables: Array<Iterable<string, any>>
  ): this;
  mergeDeepIn(
    keyPath: any[],
    ...iterables: Array<{[key: string]: any}>
  ): this;
  withMutations(mutator: (mutable: this) => any): this;
  asMutable(): this;
  asImmutable(): this;
}

@recordBaseClass()
export abstract class RecordBase {

  private readonly _name: string | null;
  private readonly _keys: string[];
  private readonly _defaultValues: any;
  private readonly size: number;
  private _map: Map<string, any>;

  protected initValues(values: any): void {
    this._map = this._map.withMutations(map => {
      for (const prop in values) {
        if (values.hasOwnProperty(prop)) {
          if (!this._keys.some(x => x === prop)) {
            throw new Error(`Value with name ${prop} is not part of this record.`);
          }
          map.set(prop, values[prop]);
        }
      }
    });
  }
}

const ExtendedRecordBase = <IRecord> <any> (RecordBase);
export { ExtendedRecordBase as Record };