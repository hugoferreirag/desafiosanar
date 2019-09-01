# desafiosanar
<h1>desafio API mundipaggag<h1> <br>

mundipaggag da API do desafio Primeiros passos: <br>
Dentro da raiz do arquivo, criar o arquivo .env, com os dados da conexão do banco de dados, e a chave secreta da mundipag da API, secretKey <br>
```
module.exports = {
authSecret: 'secretkey', 
url: ' https://api.mundipagg.com/core/v1/ ', 
db: {
    <br>
    host:' 127.0.0.1 ',
    banco de dados:' sanar ',
    usuário:' root ',
    senha:' '}
} 
```
Para conectar-se com um base de dados, deve-se ter algum servidor mysql instalado, no meu caso utilizado o xampp, pode ser o padrão mysql, wampp, ou qualquer outro, ele deve estar rodando no sistema, mais seguindo-se com o xampp. <br><br>

faça o download do xampp: https://www.apachefriends.org/pt_br/download.html <br><br>

 Após a instalação, entre em http: // localhost / phpmyadmin / <br>

criar uma base de dados chamada "sanar" <br>
Importar arquivo "sanar.sql" que esta dentro do repositorio do desafio <br>


