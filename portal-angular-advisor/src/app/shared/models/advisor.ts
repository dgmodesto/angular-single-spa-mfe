import { Address } from 'src/app/shared/models/address';

export class Advisor {
  constructor() {
    this.address = new Address();
  }


  id!: string;
  name!: string;
  document!: string;
  enable!: boolean;
  address!: Address;
}
