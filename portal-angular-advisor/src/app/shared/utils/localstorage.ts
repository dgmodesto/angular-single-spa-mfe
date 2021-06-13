export class LocalStorageUtils {

  public obterUsuario(): any {

    const res = localStorage.getItem('devio.user');

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
    localStorage.removeItem('devio.token');
    localStorage.removeItem('devio.user');
  }

  public obterTokenUsuario(): string | null {
    return localStorage.getItem('devio.token');
  }

  public salvarTokenUsuario(token: string): void {
    localStorage.setItem('devio.token', token);
  }

  public salvarUsuario(user: string): void {
    localStorage.setItem('devio.user', JSON.stringify(user));
  }

}
