module.exports = app =>{
    const { existsOrError, notExistsOrError, equalsOrError } = app.models.validations

    const newSignature = (req,res) =>{
        const client = req.body.cliente

        const card = req.body.cartao
        card.holder_name = client.name

        const product = req.body.produtos
       
        try{
            existsOrError(client.name,'Nome não informado')
            existsOrError(client.email,'Email não informado')
            existsOrError(card.number,'Número do cartão não informado')
            existsOrError(card.exp_month,'Mes de expiração do cartão não informado')
            existsOrError(card.exp_year,'Ano de expiração do cartão não informado')
            existsOrError(card.cvv,'CVV do cartão não informado')
            existsOrError(product.plan_id,'Plano não informado')
        }catch(msg){
            return res.status(400).json(msg)
        }
        app.models.signatures.newSignature({client, card, product },res)
    }
  

  
    
    return { newSignature }
}