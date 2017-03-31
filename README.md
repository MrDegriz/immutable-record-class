# immutable-record-class
Typescript lib to create immutable.js record class with inheritance support

`immutable-record-class` it is lib that combine power of [Typescript](https://github.com/Microsoft/TypeScript) interfaces with [Immutable.js Records](https://facebook.github.io/immutable-js/docs/#/Record) and and most important **support inheritance**.
 
## Table of Contents
 
 - [Installation](#installation)
 - [Usage](#usage)
 
## Installation
 
The single module dependency is Immutable.js [package](https://www.npmjs.com/package/immutable) version 3.7.x - 3.8.x.

To start using just install immutable@3.8.1 and immutable-record-class.

```sh
npm install --save immutable@3.8.1 immutable-record-class
```

## Usage

At first you need enable decorators in tsconfig file.
Then just import base class of record and two decorators - @recordClass and @recordProp

```typescript
import {
  IRecord,
  Record,
  recordClass,
  recordProp
} from '../dist';
```
For example we create two record classes - base class and inherited class:

```typescript

interface ITestBase extends IRecord {
  readonly id: number;
  readonly name: string;
  changeName(_name: string): this;
}

@recordClass()
class TestBase extends Record implements ITestBase {

  @recordProp(0) // default prop value
  public readonly id: number;
  @recordProp('')
  public readonly name: string;

  constructor(
    _id: number,
    _name: string
  ) {
    super();
    this.initValues({
      id: _id,
      name: _name
    });
  }

  public changeName(_name: string): this {
    return this.set('name', _name);
  }

}

interface ITestInheritor extends ITestBase {
  readonly isOpen: boolean;
  open(): this;
}

@recordClass()
class TestInheritor extends TestBase implements ITestInheritor {

  @recordProp(false)
  public readonly isOpen: boolean;

  constructor(
    _id: number,
    _name: string
  ) {
    super(_id, _name);
  }

  public open(): this {
    return this.set('isOpen', true);
  }

}

let test = new TestInheritor(10, 'TestName');
console.log(test); //TestInheritor { "id": 10, "name": "TestName", "isOpen": false }
console.log(test = test.open()); //TestInheritor { "id": 10, "name": "TestName", "isOpen": true }
console.log(test.isOpen); //true
console.log(test instanceof TestInheritor); //true
console.log(test instanceof TestBase); //true

```

Now you can create inheritable classes with [Immutable.js Records](https://facebook.github.io/immutable-js/docs/#/Record) magic.
