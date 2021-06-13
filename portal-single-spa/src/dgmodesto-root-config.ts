import { registerApplication, start } from "single-spa";

// registerApplication({
//   name: "@single-spa/welcome",
//   app: () =>
//     System.import(
//       "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
//     ),
//   activeWhen: (location) => location.pathname === '/',
// });


registerApplication({
  name: "@dgmodesto/portal-angular-auth",
  app: () =>
    System.import(
      "@dgmodesto/portal-angular-auth"
    ),
  activeWhen: (location) => location.pathname.startsWith("/angular-auth")
});



registerApplication({
  name: "@dgmodesto/portal-angular-container",
  app: () =>
    System.import(
      "@dgmodesto/portal-angular-container"
    ),
  activeWhen: ['/']
});

registerApplication({
  name: "@dgmodesto/portal-angular-customer",
  app: () =>
    System.import(
      "@dgmodesto/portal-angular-customer"
    ),
  activeWhen: (location) => location.pathname.startsWith("/angular-customer")
});


registerApplication({
  name: "@dgmodesto/portal-angular-advisor",
  app: () =>
    System.import(
      "@dgmodesto/portal-angular-advisor"
    ),
  activeWhen: (location) => location.pathname.startsWith("/angular-advisor")
});



start({
  urlRerouteOnly: true,
});
