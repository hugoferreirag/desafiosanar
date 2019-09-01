# desafiosanar


<h6> Primeiros passos: <br>
Dentro da raiz do arquivo, criar o arquivo .env, com os dados da conexão do banco de dados, e a chave secreta da mundipag da API, secretKey </h6><br>

# Criar arquivo .env
```
module.exports = {
authSecret: 'secretkey', 
url: ' https://api.mundipagg.com/core/v1/ ', 
db: {
    host:' 127.0.0.1 ',
    banco de dados:' sanar ',
    usuário:' root ',
    senha:' '}
} 
```
<h6>Para conectar-se com um base de dados, deve-se ter algum servidor mysql instalado, no meu caso utilizado o xampp, pode ser o padrão mysql, wampp, ou qualquer outro, ele deve estar rodando no sistema, mais seguindo-se com o xampp. <br><br>

faça o download do xampp:<a href="https://www.apachefriends.org/pt_br/download.html"> download aqui</a> <br><br>

 Após a instalação, entre em http: // localhost / phpmyadmin / <br>

Criar uma base de dados chamada "sanar" <br>

![sanar_basedados](https://user-images.githubusercontent.com/50091163/64071344-b0f6f200-cc4e-11e9-9b7a-e984cf309d45.png)

Importar arquivo "sanar.sql" que esta dentro do repositorio do desafio <br>

Importar arquivo "desafio_pronto_sanar.sql" que esta dentro do repositorio do desafio caso queira os dados do desafio já todos inseridos e concluidos <br>

![sanar_import](https://user-images.githubusercontent.com/50091163/64071349-c8ce7600-cc4e-11e9-9b82-3e7e4297a948.png)

<br>

Após tudo feito, abrir projeto na pasta raiz, no visual studio, ou pelo prompt de comando, e se certificar de que o node + npm estão tudo ok, instalados utilizando os comandos "node --version" "npm --version"<br><br>

![sanar_node](https://user-images.githubusercontent.com/50091163/64071351-dbe14600-cc4e-11e9-80f1-6d852a1adeda.png)


Se estiver tudo de acordo , executar o comando "npm install" <br><br>




Após tudo instalado, execute o comando "nodemon", caso o comando não seja reconhecido, executar o comando npm i --save-dev nodemon, e repetir o comando "nodemon" após a instalação


<br><br>

<h1>Mapa de rotas</h1>

```
BASE_URL (url padrão): http://localhost:3000

  /signin
    post(Login)
 

    
  /signatures
        .post(Criar nova assinatura)
	.get(Lista todas as assinaturas, no caso se for importado o desafio pronto, ja ira conter todas assinaturas, coerentes ao desafio)
   
  /account/password/:id
        .put(Atualizar senha)

  /account/paymentdata/:id
        .patch(Atualizar cartão de credito)

  /account/cancel/:id
       
        .delete(cancelar conta)

  /account/update/:id
        .put(Atualizar perfil)

  /account/getinfo/:id
        .get(mostrar dados perfil)

  /plans
        .post(salva plano)
        .get(listar planos)
```

# Comando Para Teste

```
mocha


** Serão feito todos os testes para integração, atravez do mocha e chai
```


Se a aplicação estiver rodando tudo ok ! podemos começar os testes!!!! <br>

# Utilizando a rota : METHOD "GET" para averiguar desafio pronto !!<br>


```
GET: http://localhost:3000/signatures
```
Baseado nesses dados, utilizando os IDS fornecidos, podemos consultar planos, cartões, e assinaturas. Podendo tambem cancelar e atualizar os dados.

# Vamos fazer o desafio passo a passo atravez da sql vazia .<br>

Aqui estarão descritas as rotas para os testes <br><br>
<h1>Antes de começar , vamos criar os planos ! </h1>

# Utilizando a rota : METHOD "POST"<br>


```
POST: http://localhost:3000/plans
```
Envie como json no corpo
# plano yellow book

```
{     
      "name": "Plano SanarFlix Promocional Com Livro Yellowbook",
      "interval": "month",
      "interval_count": 1,
      "billing_type": "prepaid",
      "payment_methods": [
        "credit_card"
      ],
      "installments": [
        1
      ],
      "status": "active",
      "currency": "BRL",
      "items": [
        {
          "name": "Plano SanarFlix Mensal",
          "quantity": 1,
          "pricing_scheme": {
            "price": 2450,
            "scheme_type": "unit"
          }
        },
        {
          "name": "Livro Yellowbook",
          "quantity": 1,
          "cycles": 1,
          "pricing_scheme": {
            "price": 13990,
            "scheme_type": "unit"
          }
        }
      ]
    }
```

# plano com 7 dias de teste

```
{
     
      "name": "Plano SanarFlix Mensal com 7 Dias de Teste",
      "trial_period_days": 7,
      "interval": "month",
      "interval_count": 1,
      "billing_type": "prepaid",
      "payment_methods": [
        "credit_card"
      ],
      "installments": [
        1
      ],
      "currency": "BRL",
      "items": [
        {
          "name": "Plano SanarFlix Mensal com 7 Dias de Teste",
          "quantity": 1,
          "pricing_scheme": {
            "price": 2450,
            "scheme_type": "unit"
          }
        }
      ]
    }
```
# plano mensal padrão

```
{
      "name": "Plano SanarFlix Mensal",
      "interval": "month",
      "interval_count": 1,
      "billing_type": "prepaid",
      "payment_methods": [
        "credit_card"
      ],
      "installments": [
        1
      ],
      "currency": "BRL",
      "items": [
        {
          "name": "Plano SanarFlix Mensal",
          "quantity": 1,
          "pricing_scheme": {
            "price": 2450,
            "scheme_type": "unit"
          }
        }
      ]
    },
```
# plano trimestral 

```
{

      "name": "Plano SanarFlix Trimestral",
      "interval": "month",
      "interval_count": 3,
      "billing_type": "prepaid",
      "payment_methods": [
        "credit_card"
      ],
      "installments": [
        1
      ],
      "currency": "BRL",

      "items": [
        {

          "name": "Plano SanarFlix Trimestral",
          "quantity": 1,
          "pricing_scheme": {
            "price": 6990,
            "scheme_type": "unit"
          }
        }
      ]
    }
```
<h2>Tudo certinho ? continuamos para os testes</h2>

<h2>Todas as assinaturas criadas, recebem a senha de acesso no email, no caso do desafio foi criado uma conta no mailtrap, onde todos os email são capturados, segue a imagem de configuranção do envio de emails</h2>

![sanar_mail](https://user-images.githubusercontent.com/50091163/64073900-a5212500-cc7a-11e9-973d-0bfd80c02411.png)

<h1>Teste 1</h1><br>
<h2>Mario é um novo assinante da sanar flix</h2>:<br>
<h5>Para efetuar o teste, podemos instalar o postman segue o link : https://www.getpostman.com/downloads/ <br>
No postman, selecionar o metodo POST, e designar a rota descrita na aplicação para adicionar uma nova assinatura<br>

# Rota de nova assinatura : METHOD "POST"


```
POST:"http://localhost:3000/signatures"
```


 # rota para conseguir informações e ids dos planos : METHOD GET

 ```
 GET:"http://localhost:3000/plans"

 ```
Enviar o corpo da seguinte forma 

# Json para nova assinatura

```
// mario
{
	"cliente":{
		"name":"mario ",
		"lastname":"santos",
		"email":"mario@gmail.com"
	},
	"cartao":{
		"number":"numero do cartao",
		"exp_month":" mes de expiração",
		"exp_year":"ano de expiração",
		"cvv":"codigo de segurança"
	},
	"produtos":{
		"plan_id":"id do plano"
		
	}
}
```
<h1>TESTE 2</h1> <br>
<h2>Juliana assina sanar flix por 7 dias de teste:</h2>

# Rota de nova assinatura : METHOD "POST"


```
POST:"http://localhost:3000/signatures"
```
 

 # rota para conseguir informações e ids dos planos : METHOD GET

 ```
 GET:"http://localhost:3000/plans"

 ```
Enviar o corpo da seguinte forma 

# Json para nova assinatura

```
// juliana
{
	"cliente":{
		"name":"Juliana ",
		"lastname":"santos",
		"email":"juliana@gmail.com"
	},
	"cartao":{
		"number":"numero do cartao",
		"exp_month":" mes de expiração",
		"exp_year":"ano de expiração",
		"cvv":"codigo de segurança"
	},
	"produtos":{
		"plan_id":"id do plano"
		
	}
}
```
<h1>TESTE 3</h1> <br>
<h2>Pedro assina sanar flix trimestral:</h2>

# Rota de nova assinatura : METHOD "POST"


```
POST:"http://localhost:3000/signatures"

```


 # rota para conseguir informações e ids dos planos : METHOD GET


 ```
 GET:"http://localhost:3000/plans"
 ```
Enviar o corpo da seguinte forma 

# Json para nova assinatura

```
// Pedro
{
	"cliente":{
		"name":"Pedro ",
		"lastname":"",
		"email":"pedro@gmail.com"
	},
	"cartao":{
		"number":"numero do cartao",
		"exp_month":" mes de expiração",
		"exp_year":"ano de expiração",
		"cvv":"codigo de segurança"
	},
	"produtos":{
		"plan_id":"id do plano"
		
	}
}
```
<h1>TESTE 4</h1> <br>
<h2>Marcos deseja alterar cartão da assinatrua:</h2>
<h2>Apartir daqui, o cliente ja deve estar logado, então por meio de um auth jwt iremos fazer todo o procedimento</h2>
<h6>Por padrão todo usuario cadastrado vem com a senha "sanar123", mais isso pode ser alterado no código, a uma função na criação da assinatura onde gera um password aletório:<br>

![sanar_senha](https://user-images.githubusercontent.com/50091163/64071525-52337780-cc52-11e9-9ade-923ccc5d2f7a.png)

Para acessarmos devemos enviar email e senha para a seguinte rota

# ROTA DE LOGIN : METHOD "POST"

```
POST: http://localhost:3000/signin
```
# CORPO DA Requisição "JSON"

```
{
    "email":"marcos@gmail.com",
    "pass":"sanar123"
}
```
Como resposta vira dados como : 
```
{
    "id": "id da assinatura",
    "cus_id": "id do cliente",
    "cus_name": "nome  ",
    "cus_email": "email@gmail.com",
    "card_id": "id do cartao",
    "plan_id": "id do plano",
    "iat": criado,
    "exp": expira em,
    "token": "token que sera enviado no BEARER"
}
```

Tendo essas informações, vá em "headers" no postman, e crie um Authorization na chave da esquerda , e ao lado insira Bearer Token

Bom agora para alterar o cartão pasta enviar para a rota (enviar como parametro id da assinatura do cliente, obtida no login):

# Rota de update do cartão : METHOD "PATCH"

```
PATCH: http://localhost:3000/account/paymentdata/subs_id
```

# corpo da requisição JSON

```
{
	"card":{
	"number":"numero do cartao",
	"cvv":"codigo de segurança",
	"holder_name":"novo nome",
	"exp_month":"expiração mes",
	"exp_year":"expiração ano"
	}
}

```

</h6>


Caso for necessário mudar dados do perfil do novo cliente, acessar rota informando o "cus_id" do cliente, informado ao logar.<br>

#Rota de update do cliente
```
http://localhost/account/update/cus_id
```

```
{
    "info":{
        "cus_name":"nome_atualizado",
        "cus_lastname:"sobrenome_atualizado",
        "cus_company":"empresa",
        "cus_title":"titulo profissional",
        "cus_period_graduation":"periodo da graduação"
    }
}

```
Caso for necessário mudar a senha do cliente, acessar rota informando o "cus_id" do cliente, informado ao logar.<br>

#Rota de update da senha do cliente
```
http://localhost/account/update/cus_id
```

```
{
   
        "pass":"senha atual",
        "confirmPass:"confirma a senha",
        "newPass":"novas senha"
}

```

</h5>

<h1>TESTE 5</h1> <br>
<h2>Luiz assina sanarflix + yellow book:</h2>

# Rota de nova assinatura : METHOD "POST"


```
POST:"http://localhost:3000/signatures"
```
 <br>
 # rota para conseguir informações e ids dos planos : METHOD GET
 ```
 GET:"http://localhost:3000/plans"
 ```
Enviar o corpo da seguinte forma 

# Json para nova assinatura

```
// Luiz
{
	"cliente":{
		"name":"Luiz ",
		"lastname":"",
		"email":"luiz@gmail.com"
	},
	"cartao":{
		"number":"numero do cartao",
		"exp_month":" mes de expiração",
		"exp_year":"ano de expiração",
		"cvv":"codigo de segurança"
	},
	"produtos":{
		"plan_id":"id do plano"
		
	}
}
```
<h1>TESTE 6</h1> <br>
<h2>Ricardo deseja cancelar assinatura</h2>

# Crie o suposto cliente ricardo com algum plano .

# Rota de nova assinatura : METHOD "POST"


```
POST:"http://localhost:3000/signatures"
```

 # rota para conseguir informações e ids dos planos : METHOD GET

 
 ```
 GET:"http://localhost:3000/plans"
 ```
Enviar o corpo da seguinte forma 

# Json para nova assinatura

```
// Ricardo
{
	"cliente":{
		"name":"Ricardo ",
		"lastname":"",
		"email":"ricardo@gmail.com"
	},
	"cartao":{
		"number":"numero do cartao",
		"exp_month":" mes de expiração",
		"exp_year":"ano de expiração",
		"cvv":"codigo de segurança"
	},
	"produtos":{
		"plan_id":"id do plano"
		
	}
}
```
# Fazer login para cancelar


# ROTA DE LOGIN : METHOD "POST"

```
POST: http://localhost:3000/signin
```
# CORPO DA Requisição "JSON"

```
{
    "email":"ricardo@gmail.com",
    "pass":"sanar123"
}
```
Como resposta vira dados como : 
```
{
    "id": "id da assinatura",
    "cus_id": "id do cliente",
    "cus_name": "nome  ",
    "cus_email": "email@gmail.com",
    "card_id": "id do cartao",
    "plan_id": "id do plano",
    "iat": criado,
    "exp": expira em,
    "token": "token que sera enviado no BEARER"
}
```
# Rota para cancelar assinatura : METHOD "DELETE"
<h6>Passar "subs_id" como parametro, consedido ao logar com ricardo</h6>


```
DELETE : http://localhost:3000/account/cancel/subs_id'
```
Para que a requisição de certo e necessário informar motivos pelo cancelamento, alem da senha e email do cliente:

# Corpo JSON da requisição


```
	"info":{
		"graduation_period":"5",
		"reason":"ok",
		"note":5
		
	},
	"client":{
		"email":"marcos@gmail.com",
		"pass":"sanar123"
	}

```

</h6>


