import { registerApplication, start } from "single-spa";
import 'bootstrap/dist/css/bootstrap.css';
import './styles/global.css'

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
  app: () => System.import("@dgmodesto/portal-angular-auth"),
  activeWhen: (location) => location.pathname.startsWith("/angular-auth"),
});

registerApplication({
  name: "@dgmodesto/portal-angular-container",
  app: () => System.import("@dgmodesto/portal-angular-container"),
  activeWhen: ["/portal"],
});

registerApplication({
  name: "@dgmodesto/portal-angular-customer",
  app: () => System.import("@dgmodesto/portal-angular-customer"),
  activeWhen: (location) =>
    location.pathname.startsWith("/portal/angular-customer"),
});

registerApplication({
  name: "@dgmodesto/portal-angular-advisor",
  app: () => System.import("@dgmodesto/portal-angular-advisor"),
  activeWhen: (location) =>
    location.pathname.startsWith("/portal/angular-advisor"),
});

start({
  urlRerouteOnly: true,
});
