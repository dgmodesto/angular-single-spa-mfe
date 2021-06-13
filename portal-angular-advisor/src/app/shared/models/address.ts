export class Address {
  public id!: string;
  public publicPlace!: string;
  public number!: string;
  public complement!: string;
  public district!: string;
  public cep!: string;
  public city!: string;
  public state!: string;
  public clientId!: string;
}

export class CepSearch {
  public cep!: string;
  public logradouro!: string;
  public complemento!: string;
  public bairro!: string;
  public localidade!: string;
  public uf!: string;
}
