# Pokédex - Teste Técnico

## Sobre o Projeto

Este projeto foi desenvolvido como parte de um teste técnico, com o objetivo de criar uma aplicação web que funcione como uma **Pokédex**, utilizando a **PokeAPI**. A aplicação permite buscar, listar e visualizar detalhes dos Pokémon de forma responsiva e amigável.

## Tecnologias Utilizadas

- **Vue.js 3** com **Composition API**
- **Vite** como bundler
- **TypeScript** para tipagem estática
- **PokeAPI** para consumo de dados dos Pokémon
- **CSS** para estilização
- **Axios** para requisições HTTP
- **i18n** para internacionalização
- **Prettier** e **ESLint** para garantir a qualidade do código

## Funcionalidades Implementadas

### 1. Listagem de Pokémon

- Exibe uma lista paginada de Pokémon, mostrando suas **imagens**, **nomes** e **números**.
- Suporta **paginação**, permitindo o controle do número de Pokémon exibidos por página.

### 2. Detalhes do Pokémon

- Modal de detalhes que exibe:
  - **Estatísticas**: HP, Attack, Defense, Special Attack, Special Defense e Speed.
  - **Tipos de Pokémon** com cores correspondentes.
  - **Cadeia de Evolução** com imagens e nomes.

### 3. Busca e Filtro

- Busca implementada por **nome** ou **número** de Pokémon.

### 4. Responsividade

- Design **responsivo**, adaptado para diferentes dispositivos, como desktop e mobile.

### 5. Internacionalização (i18n)

- Suporte a múltiplos idiomas com alternância entre línguas.

### 6. Configurações de Prettier e ESLint

- Configurações para garantir um código consistente e boas práticas de desenvolvimento.

### 7. Modo Escuro/Claro (pendente)

- A implementação do modo escuro/claro foi iniciada, mas ainda não finalizada. A funcionalidade está planejada para ser concluída em futuras atualizações.

> **Decisão**: Dado o escopo do teste, a funcionalidade de modo escuro/claro foi parcialmente implementada, priorizando outras áreas funcionais da Pokédex. A finalização será feita para atender às melhores práticas de acessibilidade e experiência do usuário.

## Como Executar o Projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/pokedex-vue.git
   ```

2. Navegue até a pasta do projeto e instale as dependências:

   ```bash
   cd pokedex-vue
   npm install
   ```

3. Execute o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Abra o navegador e acesse: `http://localhost:3000`

## Estrutura do Projeto

```plaintext
├── public
├── src
│   ├── assets
│   ├── components
│   ├── hooks
│   ├── i18n
│   ├── router
│   ├── services
│   ├── views
│   ├── App.vue
│   └── main.ts
├── package.json
└── README.md
```

## Variáveis de Ambiente

Certifique-se de criar um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
VITE_API_URL=https://pokeapi.co/api/v2/
VITE_OTHER_VARIABLE=some_value
```

## Melhorias Futuras

- **Filtro por tipos de Pokémon**: Implementar um sistema de filtro baseado nos tipos de Pokémon.
- **Finalizar o modo Dark/Light**: Completar a alternância entre temas escuro e claro, garantindo uma experiência de uso otimizada.
- **Testes Automatizados**: Implementar testes com **Jest** ou **Vitest** para garantir a qualidade da aplicação.
- **Otimização de Desempenho**: Analisar e otimizar áreas específicas do projeto para garantir uma performance ainda melhor.

## Deploy

O deploy da aplicação está disponível no [Netlify](https://pokedchallenge.netlify.app/).

## Considerações Finais

Este projeto foi uma excelente oportunidade para explorar o uso de Vue.js 3 com Composition API, TypeScript e implementar um design responsivo com foco em UX. Além disso, foi configurado suporte para i18n e implementadas boas práticas com Prettier e ESLint, visando a qualidade e manutenção do código.