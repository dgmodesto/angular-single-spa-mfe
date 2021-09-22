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
  - <script src="https://unpkg.com/zone.js"></script>
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
  - <script type="systemjs-importmap">
      {
        "imports": {
          "portal-angular-customer": "//localhost:4200/main.js",
        }
      }
    </script>

### Para ver sua aplicação é necessário registrá-la no projeto root no arquivo nomedaorganizacao-root-config.ts

- exemplo:
  - registerApplication({
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
    - `<template id="single-spa-layout"> <single-spa-router> <nav class="topnav"> <application name="@dgmodesto/portal-angular-container"></application> </nav> <div class="main-content"> <route path="/angular-customer/customer/list"> <application name="@dgmodesto/portal-angular-customer"></application> </route> </div> <div class="main-content"> <route path="/angular-advisor/advisor/list"> <application name="@dgmodesto/portal-angular-advisor"></application> </route> </div> </single-spa-router> </template>`

### Após criar um projeto do tipo parcel é neccesário incluir o sguinte modulo

- BrowserAnimationsModule
  - import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
- Se isso não for feito sempre que o componente tentar ser desmontado no DOM receber o seguinte erro:
  - single-spa-angular-parcel.js:13 NullInjectorError: R3InjectorError(AppModule)[AnimationEngine -> AnimationEngine -> AnimationEngine]: NullInjectorError: No provider for AnimationEngine!

#

# Aqui estão algumas perguntas que busquei responder a também minhas pesquisas, espero que ajude

- O que o single-spa faz?

  - Single-SPA é um roteador de nível superior.
  - Quando uma rota está ativa, ele baixa e executa o código para essa rota.
  - O código para um rota é chamado de "aplicativo" e cada um pode (opcionalmente) estar em seu próprio repositório git, ter seu próprio processo de CI e ser implantado separadamente.
  - Os aplicativos podem ser escritos na mesma estrutura ou podem ser implementados em estruturas diferentes.

- O aplicativo pai/raiz e filhos são obrigatórios?

  - Não. É recomendado enfaticamente que seu aplicativo single-spa-config ou root não use nenhuma estrutura de IU JavaScript (React, Angular).
  - Em nossa experiência, um módulo JavaScript simples é melhor para o single-spa-config e apenas os aplicativos registrados realmente usam estruturas de IU (React,Angular, Vue, etc).
  - Por que?
    - Você acaba criando uma estrutura que tem todas as desavantagens dos microserviços sem nenhuma das vantagens:
      - seus aplicativos estão acoplados e você precisa alterar vários aplicativos ao mesmo tempo para fazer atualizações.
      - Bons microserviços são completamente independentes e esse padrão quebra isso.

- Qual é o impacto no desempenho?

  - Quando configurado da maneira recomendada, o desempenho do código e o tamanho do pacote serão quase idênticos aos de um único aplicativo que foi divido em código.
  - As principais diferenças serão a adição da biblioteca de single-spa (e SystemJs, se você optar por usá-la).
  - Outras diferenças se resumem principalemente à diferença entre um pacote de código (webpack / roolup / etc.) e os modulos ES no navegador.

- O que são mapas de importação?

  - Os mapas de importação melhoram a experiência do desenvolvedor de módulo ES no navegador, permitindo que você escreva algo como "import React from 'react'" vez de precisar usar uma URL abosluta ou relativa para sua instrução de importação.
  - O mesmo também se aplica a importação está atualmente em processo de aceitação como um padrão da web e, no momento da escrita, foi implementada no Chrome, e um polyfill para navegadores >= IE11 foi implementado por SystemJs >= 3.0.

- Devo usar microserviços de front-end?
  - Se você já passou por algumas das dores de cabeça que um repositório monolítico apresenta, você deve realmente considerá-lo.
  - Além disso, se sua organização estiver configurada em um modelo do tipo Spotify (por exemplo, onde há squads autônomas que possuem recursos full-stack), os microserviços no frontend se encaixarão muito bem em sua configuração.
  - No entanto, se você está apenas começando e tem um projeto pequeno ou uma equipe pequena, recomendamos que você use um monolito (ou seja, não microserviços até chegar ao ponto em que o dimensionamento (por exemplo, dimensionamento organizacional, dimensionamento de recursos, etc) está ficando difícil.
- Cada aplicativo de single-spa pode ter seu próprio repositório git?

  - Sim. Você pode até dar a eles seu próprio package.json, webpack config e processo de CI/CD, usando SystemJs para reuni-los no navegador.

- Os aplicativos de single-spa podem ser implantados de forma independente?
  - Sim. Consulte a próxima seção sobre CI/CD.
- Como é o pocesso de CI/CD?

  - Em outras palavras, como faço para construir e implantar um aplicativo de single-spa?
  - Com a configuração recomendada, o processo geralmente flui assim:
    - 1. Reúna seu código e carregue-o em um CDN.
    - 2. Atualize o mapa de importação do seu ambiente de desenvolvimento para apontar para a nova URL.
      - Em outras palavras, seu mapa de importação costumava dizer "styleguide": "cdn.com/styleguide/v1.js" e agora deveria dizer "styleguide": "cdn.com/styleguide/v2.js"
  - Algumas opções sobre como atualizar seu mapa de inportação incluem:
    - O servidor renderiza o seu index.html com o mapa de importação embutido.
      - Isso não significa que todos os seus elementos DOM precisam ser renderizados pelo servidor, mas apenas <script type="systemhs-importmap"> elemento.
      - Fornece uma API que atualiza uma tabela de banco de dados ou um arquivo local para o servidor.
    - Tenha seu próprio mapa de importação em um CDN e use import-map-deployer ou similar para atualizar o mapa de importação durante seu processo de CI.
      - Este método tem um pequeno impacto no desempenho, mas geralmente é mais fácil de configurar se você ainda não tiver uma configuração renderizada pelo servidor.
      - Você também pode pré-carregar o arquivo de mapa de importação para ajudar a fornecer um pequeno aumento de velocidade.

- O single-spa requer considerações adicionais de segurança?

  - Não. O single-spa não adiciona, desvia ou tenta contornar quaisquer medidas de segurança JavaScript do navegador.
    - As necessidades de segurança de seus aplicativos são as mesmas que se você não usasse single-spa
  - Fora disso, os aplicativos da web podem usar os seguintes recursos que têm suas próprias considerações de segurança com as quais você pode precisar se familiarizar:
    - Importações dinâmicas do módulo ES6
      - Os aplicativos baseados em Webpack usam a implementação de importações dinâmicas^ do Webpack
    - Compartilhamento de recursos de origem cruzada (CORS)
    - Política de segurança de conteúdo (CSP)
      - As importações de módulos se relacionam especificamente com o CSP script-src
    - Os mapas de importação também são regidos por CSP.
      - Consulte também "Fornecimento de metadados fora de banda para cada módulo"

- Single-SPA tem diferentes categorias de microfrontends.
- Depende de onde e como você irá usar cada um deles. No entanto há recomendações

- Há 3 tipos de microfrontends que podemos criar com single-spa
  - Aplicativo
    - Encaminhamento
      - tem múltiplas rotas
    - API
      - Api declarativa
    - Renderiza UI
      - Renderiza UI
    - Ciclos de vida
      - Ciclos de vida gerenciados pelo single-spa
    - Quando usar
      - bloco de construção do núcleo
  - Parcel
    - Encaminhamento
      - não tem rota
    - API
      - API Imperativa
    - Renderiza UI
      - Renderiza UI
    - Ciclos de vida
      - Ciclos de vida gerenciados personalizados
    - Quando usar
      - necessário apenas com frameworks
  - Utilitário
    - Encaminhamento
      - não tem rotas
    - API
      - exporta uma interface pública
    - Renderiza UI
      - pode ou não renderizar UI
    - Ciclos de vida
      - módulo externo: nenhum ciclo de vida direto do single-spa
    - Quando usar
      - útil para compartilhar uma lógica comum ou criar um serviço.
- Layout Engine

  - O single-spa-layout pacote npm é um complemento opcional para o single-spa.
  - O mecanismo de layout fornece uma API de roteamento que controla suas rotas de nível superior, aplicativos e elementos dom.
  - O uso de layout de single-spa torna mais fácil realizar o suguinte:
    - Posicionamento de DOM o ordenação de aplicativos
    - Carregando UIs quando os aplicativos são baixados.
    - Rotas padrão para páginas não encontradas /404.
    - Transições entre rotas (implementação pendentes)
    - Renderização do lado do servidor de aplicativos de single-spa
    - Páginas de erro.
  - No navegador, o mecanismo de layout executa duas tarefas principais:
    - 1. Gerar configuração de registros de single-spa a partir de um elemento HTML e/ou objeto JSON.
    - 2. Ouça os eventos de roteamento para garantir que todos os elementos DOM sejam dispostos corretamente antes que os aplicativos de single-spa sejam montados.
  - No servidor, o mecanismo de layout execua duas tarefas:
    - 1. Construa um objeto de layout de servidor a partir de um modelo HTML.
    - 2. Envie um documento HTML (cabeçalhos e corpo de resposta HTTP) ao navegador, com base no objeto de layout do servidor e na rota atual.

- CSS

  - Em uma arquitetura microfrontend, é importante ter CSS compartilhado e CSS específico de microfrontend.
    - Deve haver apenas uma cópia de todos CSS compartilhados, e CSS específico para um microfrontend deve ter o escopo definido para que os nomes das classes não colidam entre os microfrontends.
  - CSS Compartilhado
    - É melhor para o desempenho e a experiência do desenvolvedor ter algum CSS compartilhado.
      - Frequentemente, o CSS compartilhado faz parte de um "guia de estilo" ou "sistema de design"
    - Às vezes, o sistema de design é criado internamente por uma empresa e, outras vezes, é um sistema de design de código aberto que está disponível no npm (Material UI, Bootstrap, Semantic UI, etc).
      - Para ambos os casos, é importante que haja apenas uma única cópia do CSS na página a qualquer momento.
      - Ao usar a configuração recomendada, isso é feito seguindo as técnicas nesta documentação.
    - Além de compatilhar estilos de componentees, o guia de estilo ou sistema de design também geralmente inlcui redefinições CSS e classes de utilitários.
  - Sistema de design interno
    - A recomendação para sisteas de design internos é criar um microfrontend utilitário (geralmente denominado @your-org-name/styleguide).
      - Contidos no microfrontend do utilitário estão os componentes CSS e JavaScript compartilhados que estão disponíveis para todos os outros microfrontends usarem.
    - Outros microfrontends podem acessar componentes JavaScript compartilhados por meio de importações cross-microfrontend e aplicar classes CSS globais compartilhadas a seus componentes da maneira normal (<div class="bold">).
    - Aqui esão alguns exemplos:
      - https://github.com/react-microfrontends/styleguide
      - https://github.com/vue-microfrontends/styleguide
      - https://github.com/polyglot-microfrontends/styleguide
    - A alternativa para criar um microfrontend utilitário para seu guia de estilo é publicá-lo no npm.
      - A desvantagem dessa abordagem é qu ela torna mais fácil ter cópias duplicadas do guia de estilo e também ter diferentes versões do guia de estilo.
      - Os pacotes NPM não são implementaveis de forma independente, nem são singletons, mas para um guia de estiloo é frequentemente desejável gerenciá-lo centralmente e podem ser implementados separadamente dos microfrontends que os utilizam.
  - Sistema de design de terceiros
    - Ao usar um sistema de design de terceiros, como Material UI, Bootstrap, Semantic, etc, é importante que apenas uma cópia e versão do sistema de design seja carregada na página.
    - Para fazer isso, aqui estão duas opções de implementação.
      - 1.  Adicione as bibliotecas do sistema de design ao seu mapa de importação SystemJs e, em seguida, marque-as como externas.
        - Como alternativa, faça o equivalente com federação de módulo.
      - 2.  Crie um microfrontend de utilitário (frequentemente chamado @your-org-name/styleguide que contém todos os componentes CSS e JavaScript compartilhados.
        - Reexporte os componentes do sistema de design para que todos os outros microfrontends possam acessá-los por meio de importações de microfrontend cruzados
          - import { Button } from '@your-org-name/styleguide'
    - Uma vez que o sistema de design esteja devidamente compartilhado, todos os seus componentes CSS e JavaScript serã incluídos apenas uma vez na página da Web.
      - O código que usa os componentes do sistema de design permanece inalterado.
  - Propriedades personalizadas CSS
    - Os navegadores suportam propriedades personalizadas CSS (ás vezes chamadas de variáveis CSS), que facilitam o compartilhamento de CSS entre microfronteds.
    - Qualquer variável CSS aplicada ao :root pseudoelemento é acessível a qualquer outro microfronted.
      - exemplo:
        - Em seu guia de estilo / sistema de design
          - :root { --azul: #0000ff }
        - Em um microfrontend individual
          - cor: var(--azul)
    - Nenhuma configuração extra é necessária para que isso funcione, pois isso é integrado ao navegador.
  - CSS com escopo
    - Para todos os CSS específicos para um determinado microfronted ou componente, é preferível definir o escopo do CSS.
    - Em geral, as classes CSS são globais por padrão, mas "escopo" se refere ao encapsulamento do CSS de forma que ele se aplique apenas a um componente ou microfronted.
    - Os snippets de código abaixo demonstram algumas maneiras de como isso é possível.
    - exemplo:
      - Não é recomendado classe css sem escopo.
        - .settings { cor: blue }
      - Definido pelo sufixo de todas as classes css com um hash exclusivo.
        - Isso geralmente é feito por ferramentas de construção, particulamente Módulos CSS via css-loader do Webpack (https://webpack.js.org/loader/css-loader/)
        - .settings-33432fwre342kl { cor: blue }
      - Definido pelo sufixo de todas as classes CSS com um hash exclusivo e também adicionando um prefixo exclusivo (como o nome do microfrontend) para classes.
        - Esta é uma variante do anterior, exceto garante nenhma colisão de hashes gerados.
          - .app1\_\_settings-24j234kl3j4k3l2j { cor: blue }
      - Escopo via seletor de contêiner.
        - As aplicações de single-spa geralmente são embalados em um div qu se paraee com isto: "<div id="single-spa-application:@org-name/project-name"> </div>
        - Podemos fazer nossa classe CSS se aplicar apenas a um microfronted, prefixando-o com esse id.
        - Execute CSS escape("single-spa-application:@org-name/project-name");
          - no console do navegador para escapar de quaisquer caracteres especiais no ID, para garantir que o seletor de contêiner funcione.
          - <div id="single-spa-application:@org-name/project-name">
            <div class="settings"></div>
            </div>
          - .settings[data-df65s76dfs] { color: blue; }
      - Escopo vis seletor de contêiner
        - As aplicações de single-spa geralmente são embalados em uma div que se parece com isto <div id="single-spa-application:@org-name/project-name"></div>
        - Podemos fazer nossa classe CSS se aplicar apenas a um microfronted, prefixando-o com esse id.
        - Execute CSS.
          - escape("single-spa-application:@org-name/project-name");
            - no console do navegador para escapar de quaisquer caracteres especiais no ID, para garantir que o seletor de contêiner funcione.
          - <div id="single-spa-application:@org-name/project-name">
            <div class="settings"></div>
            </div>

          - #single-spa-application\:\@org-name\/project-name .settings { color: blue; }
  - Shadow DOM
    - Shadow DOM é uma API de navegador para CSS de escopo.
      - Ele foi projetado para ser usado para ser usado por Web Components e é mencionado aqui comoutra opção viável para definir o escopo de CSS.
    - Abaixo estão algumas notas sobre Shadow DOM podem ser relevantes para microfronteds:
      - O Shadow DOM evita que qualquer CSS global caia em cascata na Shadow Root, o que significa que você não pode facilmente ter CSS global compartilhado.
      - As propriedades personalizadas CSS de fora da Shadow DOM não podem ser acessados por seletores CSS fora da Shadow Root.
      - Os eventos que se propagam de uma Shadow Root são redirecionados para cada limite de sombra.
  - Desmontando CSS

    - Em grandes sistemas com dezenas de microfrontends, pode se tornar importante para o desempenho em desmontar o CSS à medida que você navega entre as páginas.
      - Isso é feito removendo os elementos <style> e <link> do DOM.
    - Por padrão, a maioria das ferramentas carrega e monta o CSS uma vez e o deixa lá indefinidamente (nunca desmonta).
      - No entanto, existem alguns recursos para desmontar CSS que não está mais sendo usado e remontá-lo quando for necessário novamente.
    - Para conseguir isso, os aplicativos e pacotes single-spa devem remover <link> e os <styles> elementos dentro de sua função de ciclo de vida de desmontagem:
    - Este código é um exemplo da mecânica de montagem + desmontagem + remontagem de CSS.

      - Na prática, isso geralmente é feito por meio de ferramentas como css-loader, style-loader ou single-spa-css (em vez de manualmente)

        - const style = document.createElement('style');
          style.textContent = `.settings {color: blue;}`;
          export const mount = [
          async () => {
          document.head.appendChild(styleElement);
          },
          reactLifecycles.mount,
          ]

        export const unmount = [
        reactLifecycles.unmount,
        async () => {
        styleElement.remove();
        }
        ]

    - Para ajudar a fazer isso, a biblioteca single-spa-css implementa funções de montagem e desmontagem para você.

  - SASS, PostCSS, Less, Stylus, etc
    - SASS, PostCSS, Less, Stylus e outras ferramentas de construção CSS são compátiveis com single-spa e microfrontend;
    - Essas ferramentas são executadas em tempo de consrução para produzir arquivos CSS básicos.
      - Toda a documentação nesta página se aplica aos arquivos CSS de saída criados pelo SASS e outros pré-processadores CSS.
    - Como cada microfrontend tem sua própria construção, isso significa que há várias construções SASS (ou pré-processador) ocorrendo - uma por microfrontend.
      - Como resultado, as variáveis SASS não são compartilháveis por meio de importações de microfrontend cruzado, uma vez que as importações de microfrontends cruzados ocorrem em tempo de execução.
      - Em vez disse, para compartilhar variáveis SASSS, você precisará publicá-las em um registro do NPM e instalá-las individualmente em cada microfrontend.
      - Como os pacotes npm não podem ser implantados de forma independente (separadamente dos pacotes que os utiliza), as alterações nas variáveis precisarão ser atualizadas e implantadas em cada microfrontend individualmente.
      - Algo a ser observado é que a implementação do navegador das propriedades customizadas CSS ocorre no tempo de execução e, portanto, as propriedades customizadas cSS nativas são compartilháveis por natureza entre microfrontends.
    - O SASS e outras ferramentas de construção geralmente produzem CSS global em vez de CSS com escopo.
      - Esse comportamento pode ser indesejável em uma arquittura de microfrontends porque pode resultar em colisões de nmes de classe CSS entre seus microfrontends.
      - Para evitar isso, você pode usar módulos SASS (ou semelhantes) para definir o escopo do CSS.
  - Recursos de CSS do Webpack
    - Abaixo está uma lista de plug-ins e carregadores Webpack comumente usados que podem ajudar no carregamento do CSS:
      - css-loader facilita o uso de módulos CSS e o manuseio adequado de @import() arquivo CSS.
      - style-loader facilita a montagem de CSS por meio de <style> elementos.
        - Isso geralmente é usado no modo de desenvolvimento, mas não na produção.
      - postcss-loader é semelhante aos módulos CSS, mas passa casos de uso mais avançados que requerem PostCSS.
      - sass-loader pode ser usado para compilar SASS para CSS.
      - single-spa-css pode ser usado para detectar automaticamente quais arquivos CSS carregar durante a função mount de ciclo de vida de seu aplicativo ou pacote de single-spa.
  - single-spa-css
    - O single-spa-css pacote npm implementa funões auxiliares para carregar, montar e desmontar CSS.
      - Ele faz isso adicionando <link rel="stylesheet"> elementos ao DOM para montar o CSS e removendo o <link> do DOM quando for a hora de desmontar o CSS.
    - instalação
      - npm install single-spa-css
      - yarn add single-spa-css

- Aplicações - (Application)
  - Os aplicativos são declarativos
    - Os aplicativos usam uma API declarativa chamada registerApplication.
    - Sua configuração de single-spa (ás vezes também chamada de configuração raiz) define os aplicativos antecipadamente e define as condições para quando cada aplicativo está ativo, mas não os monta diretamente.
  - Os aplicativo têm ciclos de vida gerenciados
    - Single-SPA gerencia os aplicativos registratdos e e responsável por todos os seus ciclos de vida.
    - Isso evita que você precise escrever um monte de lógica sobre quando os aplicativos devem ser montados e desmontados;
    - O single-spa cuida disso para você.
    - Tudo o que um single-spa precisa para fazer esse trabalho funcionar automaticamente é uma função de atividade que descreve quando seu aplicativo deve estar ativo.
  - Aplicativos e sua interface pública
    - Os aplicativos devem exportar seus ciclos de vida para que possam ser gerenciados por single-spa, mas também podem exportar métodos, valores, componentes, parcelas adicionais ou mais como parte de sua interface pública.
    - É comum usar essas exportações dentro de outro aplicativo para que você possa criar módulos altamente coesos com baixo acoplamento.
- Parcelas - (Parcel)
  - Os pacotes são imperativos
    - Os pacotes existemde várias maneiras como uma saida de emergência do fluxo declarativo normal.
    - Eles existem principalmente para permitir que você reutilize partes da interface do usuário em aplicativos quando esses aplicativos são escritos em várias estruturas.
  - Você gerencia os ciclos de vida das parcelas
    - Quando você chama mountParcel ou mountRootParcel (consulte API), o pacote é montado imediatamente e retona o objeto pacote.
    - Você precisa chamar o método unmount no pacote manualmente quando o componente que chama é mountParcel desmontado.
  - Os pacotes são mais adequados para compartilhar partes da IU entre estruturas
    - Criar um pacoteé tao fácil quanto usar os auxiliares de single-spa para essa estrutura em um componente IU específico.
    - Isso retorna um objeto (parcelConfig) que um single-spa pode usar para criar e montar um pacote.
    - Como o single-spa pode montar um pacote em qualquer lugar, isso oferece uma maneira de compartilhar componentes UI entre estruturas.
    - Não deve ser usado se a IU compartilhada estiver sendo usada em outro aplicativo da mesma estrutura.
    - Por exemplo:
      - App 1 é escrito em Vue e contém toda a IU e lógica para criar um usuário.
      - App 2 é escrito em React e precisa criar um usuário.
      - Usar um pacote de single-spa permite que você empacote seu componente Vue do App1 de uma maneira que o fará funcionar dentro do App2, apesar das diferentes estrturuas.
      - Pense nos pacotes como uma implementação específica de um single-spa de componentes da web.
- Utilitários - (Utilitities)
  - Como os Utilitários se relacionam com um single-spa?
    - Um é um módulo no navegador que (geralmente) tem seu próprio repositório e processo de CI.
    - Ele exporta uma interface pública de funções e variáveis que qualquer outro microfrontend pode importar e usar.
    - Um microfrontend utilitário é como qualquer outro microfrontend, exceto que não serve como um pacote ou aplicativo de single-spa.
  - Módulos utilitários compatilhar lógica comum
    - Módulos utilitários são um ótimo lugar para compartilhar lógicas comuns.
    - Em vez de cada aplicativo criar sua própria implementação de lógica comum, você pode usar um objeto JavaScript simples (utilitário single-spa) para compartilhar essa lógica.
    - Por exemplo: Autorização.
    - Como cada aplicativo sabe qual usuário está conectado?
    - Você pode fazer com que cada aplicativo pergunte ao servidor ou leia um JwT, mas isso cria trabalho duplicado em cada aplicativo.
    - Usar o padrão de módulo de utilitário permitira criar um módulo que implementa a lógica de autorização.
    - Este módulo exportaria quaisquer métodos necessários e, em seguida, seus outros aplicativos de single-spa poderiam usar esses métodos de autorização importando-os.
    - Essa abordagem também funciona bem para a busca de dados.
  - Exemplos de Microfronted de utilitário
    - Os itens a seguir são comumente implementados como um Microfrontend Utilitário:
      - Serviços de Notificação
      - Guia de estilo / biblioteca de componentes
      - Serviço de rastreamento de erros
      - Serviço de autorização
      - Busca de dados.
