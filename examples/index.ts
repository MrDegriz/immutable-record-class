import {
  IRecord,
  Record,
  recordClass,
  recordProp
} from '../dist/immutable-record-class';

interface ITestBase extends IRecord {
  readonly id: number;
  readonly name: string;
  changeName(_name: string): this;
}

@recordClass()
class TestBase extends Record implements ITestBase {

  @recordProp(0)
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
console.log(test);
console.log(test = test.open());
console.log(test.isOpen);
console.log(test instanceof TestInheritor);
console.log(test instanceof TestBase);