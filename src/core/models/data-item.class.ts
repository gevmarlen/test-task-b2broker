/**
 * DataItem class
 */
export class DataItem {
  public child: Child;

  constructor(
    public id: string,
    public int: number,
    public float: number,
    public color: string,
    child: Child,
  ) {
    this.child = new Child(child.id, child.color);
  }
}

class Child {
  constructor(
    public id: string,
    public color: string,
  ) {}
}
