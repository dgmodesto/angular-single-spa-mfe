export function emitEvent(name, data) {
  dispatchEvent(
    new CustomEvent(name, {
      detail: data,
    })
  );
}

export function listenEvent(name, cb) {
  window.addEventListener(name, cb);
}

export function setLoginAuth(hashAuth: string) {
  var authObject = {
    token: hashAuth,
  };

  window.localStorage.setItem("auth-info", JSON.stringify(authObject));
}

export function getLoginAuth() {
  var authJson = window.localStorage.getItem("auth-info");
  console.log("get info json", authJson);

  if (authJson) return;

  var authObject = JSON.parse(authJson);
  console.log("get info object", authObject);

  return authObject;
}

export function verifyIfHasPermissionByClaim(nameClaim: string, valueClaim: string) {
  let user = obterUsuario();

  if (!user.claims) {
    return false;
  }

  let userClaims = user.claims.find(
    (x) => x.type === nameClaim
  );

  if (!userClaims) {
    return false;
  }

  let valoresClaim = userClaims.value as string;

  if (!valoresClaim.includes(valueClaim)) {
    return false;
  }

  return true;
}

  function obterUsuario(): any {
    const res = localStorage.getItem('dgmodesto.user');

    if (res) {
      return JSON.parse(res);
    } else {
      return null;
    }
  }

  function salvarDadosLocaisUsuario(response: any): void {
    this.salvarTokenUsuario(response.accessToken);
    this.salvarUsuario(response.userToken);
  }

  function limparDadosLocaisUsuario(): void {
    localStorage.removeItem('dgmodesto.token');
    localStorage.removeItem('dgmodesto.user');
  }

  function obterTokenUsuario(): string | null {
    return localStorage.getItem('dgmodesto.token');
  }

  function salvarTokenUsuario(token: string): void {
    localStorage.setItem('dgmodesto.token', token);
  }

  function salvarUsuario(user: string): void {
    localStorage.setItem('dgmodesto.user', JSON.stringify(user));
  }
