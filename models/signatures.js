const request = require('request')
const { url, authSecret } = require('../.env')
const bcrypt = require('bcrypt-nodejs')


module.exports = app => {
  // encriptando a senha
  const encryptPassword = password => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt) 
  }
  // Nova Assinatura
  const newSignature = async (signature, res) => {
    const { client, card, product } = signature
    // verificando se email ja esta cadastrado
    const userFromDb = await app.db('assinaturas')
      .select('cus_email')
      .where({cus_email:client.email}).first()
      console.log(userFromDb)
    if(userFromDb != undefined && userFromDb.cus_email === client.email){
      return res.status(400).json('Email ja pertence a uma assinatura')
    }
    // Caso queira gerar password aleatoria descomentar função abaixo e comentar a senha padrão 
    /* 
    function gerarPassword() {
      return Math.random().toString(36).slice(-10);
    }
    
    client.pass = gerarPassword()*/

    // senha padrão
    client.pass = 'sanar123'
    client.pass = encryptPassword(client.pass)

    const data = {
      plan_id: product.plan_id,
      customer: {
        name:client.name,
        email:client.email
      },
      card
    }
    var options = {
      method: 'POST',
      uri: url + 'subscriptions',
      headers: {
        'Authorization': 'Basic ' + new Buffer(authSecret + ":").toString('base64'),
        'Content-Type': 'application/json'
      },
      json: data
    };

    request(options, function (error, response, body) {
        if(error){
          res.status(response.statusCode).json(error)
        }else{
          console.log(response.body)
          const dataSignature = {
            subs_id:response.body.id,
            cus_id:response.body.customer.id,
            cus_name:response.body.customer.name,
            cus_lastname:client.lastname,
            cus_email:response.body.customer.email,
            cus_pass:client.pass,
            card_id:response.body.card.id,
            plan_id:response.body.plan.id
          } 
          app.db('assinaturas')
            .insert(dataSignature)
            .catch(err=>res.status(500).send(err))
            
           const mailto = app.models.sendmail.sendEmail(client.email,client.pass)
           const sucess = `cus_id:${response.body.customer.id} | subscriptions_id: ${response.body.id} | email : ${client.email} | password padrão : sanar123 `
           const error = `Erro ao concluir assinatura, verifique novamente os passos..`
           console.log(mailto)
          if(mailto === false){
            res.status(400).json(error)
            
          }else{
            res.status(200).json(sucess)
          }
           
            
        }
     

    })
  }
  


  return { newSignature }
}