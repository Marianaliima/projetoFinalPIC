

## Sobre o Projeto

Documentação API **Loja de Cupcakes** 




## Tecnologias utilizadas:
| Ferramenta | Descrição |
| --- | --- |
| `javascript` | Linguagem de programação |
| `nodejs` | Ambiente de execução do javascript|
| `express` | Framework NodeJS |
| `dotenv` | Dependência para proteger dados sensíveis do projeto|
| `mongoose` | Dependência que interage com o MongoDB para a conexão da database, criação do model e das collections|
| `nodemon` | Dependência que observa as atualizações realizadas nos documentos para rodar o servidor automaticamente|
| `npm ou yarn` | Gerenciador de pacotes|
| `MongoDb` | Banco de dado não relacional orietado a documentos|
| `MongoDb Compass` | Interface gráfica para verificar se os dados foram persistidos|
 `Insomnia ou Postman` | Interface gráfica para realizar os testes|

<br>
<br>

## 📁 Arquitetura 

```
 📁 ProjetoFinal
   |
   |-  📁 src
   |    |
   |    |- 📁 data
   |         |- 📄 database.js
   |
   |    |- 📁 controllers
   |         |- 📄 cadastroController.js
  
   |
   |    |- 📁 models
   |         |- 📄 cadastros.js
  
   |
   |    |- 📁 routes
   |         |- 📄 cadastrosRoutes.js 

   |
   |- 📄 .env
   |- 📄 .env.example
   |- 📄 .gitignore
   |- 📄 package
   |- 📄 server.js

```

<br>
<br>

## Contrato

### Requisitos e rotas cadastros
- [x ]  **[GET] "/cadastro"** Deverá retornar todos os itens
- [x ]  **[POST] "/cadastro"** Deverá criar um novo cadastro
- [x ]  **[PATCH] "/cadastro/[ID]"** Deverá atualizar informação específica  de um cadastro por id e retornar o   cadastro alterado.
- [x ]  **[DELETE] "/cadastro/[ID]"** Deverá deletar um cadastro por id específico e retornar uma mensagem de confirmação






<br>
<br>

### Dados para Collection cadastro

- id: autogerado e obrigatório
- item: texto e obrigatório
- valor: texto e obrigatório
- criadoEm: data gerada automaticamente e obrigatório


### API deve retornar seguinte JSON:

```jsx
[
  {
    "criadoEm": "2021-07-04T17:37:31.227Z",
    "_id": "60e1f588d6c5b309003bd8c4",
    "item": "cupcake de milho",
    "valor": "6.00",
    "__v": 0
}
]
```
<br>
<br>




