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
