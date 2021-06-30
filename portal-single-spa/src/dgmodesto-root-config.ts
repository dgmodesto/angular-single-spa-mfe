import { registerApplication, start } from "single-spa";

import './styles/global.css'

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
