# Pokédex - Teste Técnico

## Sobre o Projeto

Este projeto foi desenvolvido como parte de um teste técnico com o objetivo de criar uma aplicação web que funcione como uma **Pokédex**, utilizando a **PokeAPI**. O foco principal é permitir a busca, listagem e visualização de detalhes dos Pokémon, além de fornecer uma interface amigável e intuitiva.

## Tecnologias Utilizadas

- **Vue.js 3** com **Composition API**
- **Vite** como bundler
- **TypeScript** para tipagem estática
- **PokeAPI** para o consumo de dados dos Pokémon
- **CSS** para a estilização
- **Axios** para realizar requisições HTTP
- **i18n** para internacionalização
- **Prettier** e **ESLint** para garantir o formato e qualidade do código

## Funcionalidades Implementadas

### 1. Listagem de Pokémon

- Exibe uma lista paginada de Pokémon, mostrando suas **imagens**, **nomes** e **números**.
- Suporta **paginação** com controle do número de Pokémon exibidos por página.

### 2. Detalhes do Pokémon

- Ao clicar em um Pokémon da lista, um modal exibe:
  - **Estatísticas**: HP, Attack, Defense, Special Attack, Special Defense e Speed.
  - **Tipos de Pokémon**: Exibe os tipos com cores correspondentes.
  - **Cadeia de Evolução**: Exibe a cadeia de evolução com imagens e nomes.

### 3. Busca e Filtro

- Implementada busca por **nome** ou **número** de Pokémon.

### 4. Responsividade

- A aplicação é **responsiva** e adaptada para diferentes dispositivos (desktop e mobile).

### 5. Internacionalização (i18n)

- Suporte a múltiplos idiomas, permitindo a alternância entre diferentes línguas.

### 6. Configurações de Prettier e ESLint

- Configurações para garantir o formato consistente do código e boas práticas de desenvolvimento.

### 7. Modo Escuro/Claro (pendente)

- Implementação de alternância entre temas escuro e claro.

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

```
├── public
├── src
│   ├── assets
│   ├── components
│   ├── hooks
│   ├── views
│   ├── App.vue
│   ├── main.ts
│   └── router.ts
├── package.json
└── README.md
```

## Melhorias Futuras

- **Implementar filtro por tipos de Pokémon**.
- **Finalizar a implementação do modo Dark/Light**.
- **Adicionar testes automatizados com Jest ou Vitest**.
- **Otimização do desempenho da aplicação**.

## Deploy

O deploy da aplicação está disponível no [Vercel/Netlify](#).

## Considerações Finais

Este projeto foi uma excelente oportunidade para explorar Vue.js 3 com Composition API, TypeScript, e implementar um design responsivo com foco em UX. Além disso, foi configurado suporte para i18n e boas práticas com Prettier e ESLint para manter a qualidade do código.