import { BehaviorSubject } from "rxjs";

export class StoreBase<TData> {
  data: BehaviorSubject<TData>;

  constructor(data: TData) {
    this.data = new BehaviorSubject(data);
  }

  getValue() {
    return this.data.getValue();
  }
}
