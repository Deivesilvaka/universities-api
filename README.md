# universities-api

Como usar? 
A primeira coisa é criar e ajustar o arquivo .env na raiz do projeto. 

Nele deve ter os seguintes parametros

``` env
# PORT deve ser a porta para onde a api ira escutar, caso ela não seja inicializada, o padrão será 3333.
PORT = 

# AUTHENTICATION deve ser seu token de segurança para acessar a api, enviando nos headers de cada requisição.
AUTHENTICATION = 

# MONGODB_URI deve ser a uri do banco de dados mongodb.
MONGODB_URI = 

# API_UNIVERSITIES por padrão deve ser assim como esta.
API_UNIVERSITIES = http://universities.hipolabs.com

```

Após isso basta iniciar o projeto com o comando abaixo.

``` bash
npm start
```

a documentação completa para a api é gerada com a biblioteca swagger e pode ser acessada na rota /doc assim que a api ser iniciada.

exemplo:

``` link
http://localhost:3333/doc
```

cada um dos 5 endpoints podem ser testados dentro do swagger, mas aqui estão os exemplos.
obs: Em todas as requisições (com exceção da rota /doc) é necessario enviar nos headers a chave de authenticação que for adicionada no .env.

rotas post

ADIÇÃO DE REGISTRO DE UNIVERSIDADE.

``` link
http://localhost:3333/university/new
```

rota usada para adicionar um novo registro
propriedade para enviar no body

``` js
    /***
     * 
     * Adiciona um novo registro de universidade.
     *
     * @method post
     * 
     * @body 
     * @property {
     *  alpha_two_code: string,
     *  web_pages: [string],
     *  name: string,
     *  country: string,
     *  domains: [string],
     *  state_province: string
     * }
     * 
     * @return {Object}
     **/
```


DELETAR REGISTRO DE UNIVERSIDADE

``` link
http://localhost:3333/university/delete
```

rota do tipo post usada para deletar um registro de universidade

``` js
    /***
     * 
     * Deleta um registro de universidade pelo seu id.
     *
     * @method post
     * 
     * @body 
     * @property { _id: string } identificador da universidade no banco
     * 
     * @return {Object}
     **/
```

ATUALIZAÇÃO DE REGISTRO DE UNIVERSIDADE

``` link
http://localhost:3333/university/update
```

rota do tipo post usada para atualizar dados das universidades

``` js
    /***
     * 
     * atualiza um registro de universidade pelo seu id.
     *
     * @method post
     * 
     * @query 
     * @param _id identificador da universidade no banco
     * 
     * @body
     * @property {
     *  web_pages: [string],
     *  name: string,
     *  domains: [string]
     * }
     * 
     * @return {Object}
     **/
```
para usar essa roda, deve ser enviado somente o registro que deseja alterar, caso envie alguma das propriedade com um valor vazio, será retornado uma mesagem de erro.
caso o _id não seja enviado, a aplicação retornara uma mensagem de erro.

BUSCAR DADOS DE UNIVERSIDADES

``` link
http://localhost:3333/universities
```

rota get utilizada para buscar os registros das universidades

``` js
    /***
     * 
     * Busca um registro de universidade pelo seu id.
     *
     * @method get
     * 
     * @query 
     * @param country pais cujo universidade esta situada
     * @param page numero da pagina de contagem
     * 
     * @return {Object}
     **/
```

o parametro country não pode ser qualquer um, os paises foram pre-selecionados no arquivo de configurações dentro da país config.

``` js
{
    "countries": [
        "argentina",
        "brazil",
        "chile",
        "colombia",
        "paraguai",
        "peru",
        "suriname",
        "uruguay"
    ]
}
```

caso o país desejado não seja enviado, todos os registros serão buscados, caso o país seja enviado, as universidades deste país serão filtradas.
O programa possui um esquema de paginação, então o parametro "page" se refere ao número da pagina atual, pois o máximo de registros retornados da api são um de 20 registros e a paginação nos ajuda a irmos atrás dos próximos.

E po ultimo mas não menos importante

BUSCAR REGISTRO PELO ID

``` link
http://localhost:3333/university/byId
```

rota get utilizada para buscar um registro específico.
o id na qual se refere é o _id, dado criado pelo próprio mongodb quando criamos o registro dentro do banco.

``` js
    /***
     * 
     * Busca um registro de universidade pelo seu id.
     *
     * @method get
     * 
     * @query 
     * @param id identificador da universidade no banco
     * 
     * @return {Object}
     **/
```

o _id é obrigatório, caso ele não seja enviado, a aplicação retornara uma mensagem de erro.

Mais uma vez lembrando, a documentação aberta para testes fica na rota /doc da aplicação.
