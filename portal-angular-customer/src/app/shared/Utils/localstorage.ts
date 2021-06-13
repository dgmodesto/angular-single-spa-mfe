export class LocalStorageUtils {

  public obterUsuario(): any {

    const res = localStorage.getItem('dgmodesto.user');

    if (res) {

      return JSON.parse(res);
    }
    else {
      return null;
    }
  }

  public salvarDadosLocaisUsuario(response: any): void {
    this.salvarTokenUsuario(response.accessToken);
    this.salvarUsuario(response.userToken);
  }

  public limparDadosLocaisUsuario(): void {
    localStorage.removeItem('dgmodesto.token');
    localStorage.removeItem('dgmodesto.user');
  }

  public obterTokenUsuario(): string | null {
    return localStorage.getItem('dgmodesto.token');
  }

  public salvarTokenUsuario(token: string): void {
    localStorage.setItem('dgmodesto.token', token);
  }

  public salvarUsuario(user: string): void {
    localStorage.setItem('dgmodesto.user', JSON.stringify(user));
  }

}
