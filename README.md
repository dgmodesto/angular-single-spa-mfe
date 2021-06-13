# Micro Frontends - Angular Single SPA

### observações:
  - Há três tipos de projetos que podem ser criados com single-spa
    - single-spa application / parcel
    - in-browser utility module (styleguide, api cache, etc)
    - single-spa root config
  - O single-spa para o angular não suporta o live-reload no ambiente de desenvolvimento, então é necessário informar que o live-reload será falso.


### Criar projeto com single-spa
  - npx create-single-spa

### É necessário incluir a configuração de zone no projeto
  - incluir no arquivo index.html
    -  <script src="https://unpkg.com/zone.js"></script>
  - incluir no arquivo main.single-spa.ts
    - import 'zone.js/dist/zone';


### Após criar o projeto angular com o single-spa é necessário 
  - instalar os seguintes pacotes:
    - npm i -D @angular-builders/custom-webpack
    - npm install --save-dev webpack-config-single-spa webpack-merge
    - npm i
      - é necessário reeinstalar os modulos pra a aplicação pegar as referências da biblioteca single-spa.
  - altere o script start para:
    - ng serve --port 4201 --live-reload false
  - execute o projeto:
    - npm start
  
### Para ver sua aplicação é necessário importá-á no projeto root config no arquivo index.ejs
  - exemplo:
    - 
    <script type="systemjs-importmap">
      {
        "imports": {
          "portal-angular-customer": "//localhost:4200/main.js",
        }
      }
    </script>

### Para ver sua aplicação é necessário registrá-la no projeto root no arquivo nomedaorganizacao-root-config.ts
  - exemplo:
    - 
      registerApplication({
        name: "@dgmodesto/portal-angular-customer",
        app: () =>
          System.import(
            "@dgmodesto/portal-angular-customer"
          ),
        activeWhen: (location) => location.pathname.startsWith("/angular-customer")
      });


### No app.module do seu microfrontend será necessário setar a URL_BASE do seu projeto
  - exemplo:
    - providers: [{ provide: APP_BASE_HREF, useValue: '/angular-customer' }],


### Para utilizar system.import
  - - É necessário instalar as seguintes libs
		- systemjs
		- @type/systemjs
		- ir ao arquivo tsconfig.app.json e incluir no types:
			- "types": ["systemjs"]


### Para se trabalhar com um microfrontend como header e tratar o roteamento é necessário fazer o seguinte:
  - no projeto root-config, no arquivo nomedaempres-root-config.ts, inclua no header a configuração de roteamento do single-spa
    - exemplo:
      -  <template id="single-spa-layout">
            <single-spa-router>
              <nav class="topnav">
                <application name="@dgmodesto/portal-angular-container"></application>
              </nav>
              <div class="main-content">
                <route path="/angular-customer/customer/list">
                  <application name="@dgmodesto/portal-angular-customer"></application>
                </route>
              </div>
              <div class="main-content">
                <route path="/angular-advisor/advisor/list">
                  <application name="@dgmodesto/portal-angular-advisor"></application>
                </route>
              </div>
            </single-spa-router>
          </template>
    