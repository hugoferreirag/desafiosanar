const { authSecret } = require('../.env')
const passportJwt = require('passport-jwt')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.models.validations
    // informaçoes de cliente
    const getInfo = (req,res) =>{
        console.log(req.params.id)
        const cus_id = req.params.id
        try{
            existsOrError(cus_id,"Nenhum assinante setado")
        }catch(msg){
            return res.status(400).json(msg)
        }
        app.models.accounts.getInfo(cus_id,res)

    }
    // atualizar dados perfil
    const updatePerfil = async (req,res) =>{
        const info = req.body.info
        const cus_id = req.params.id
        const data = { info , cus_id}
        try{
            existsOrError(info, 'Nenhuma informação enviada')
            existsOrError(cus_id,'Nenhum cliente setado')
        }catch(msg){
            return res.status(400).json(msg)
        }
        
       await  app.models.accounts.updatePerfil(data,res)
    }
    // Nova senha
    const updatePass = (req, res) => {
        const cus_id = req.params.id
        const newPass = req.body.newPass
        const pass = req.body.pass
        const confirmPass = req.body.confirmPass
        const data = { cus_id, newPass, pass, confirmPass }

        try {
            existsOrError(cus_id, 'Não esta logado')
            existsOrError(newPass, 'Informe a nova senha!')
            existsOrError(pass, 'Informe a senha atual!')
            existsOrError(confirmPass, 'Informe a confirmação da senha atual!')
            equalsOrError(pass, confirmPass, 'Senhas não conferem!')
        } catch (msg) {
           return  res.status(400).json(msg)
        }
        app.models.accounts.updatePass(data, res)
    }
    // Atualizar cartão
    const updateCard = (req,res) => {
        const card = req.body
        const signature_id = req.params.id
        const data = { card, signature_id}

        try {
           
            existsOrError(card.card.number,'Informe o número do cartão')
            existsOrError(card.card.cvv,'Informe o número cvv do cartão')
            existsOrError(card.card.holder_name,'Informe o nome do titular do cartão')
            existsOrError(card.card.exp_month,'Informe o mes de exp. do cartão')
            existsOrError(card.card.exp_year,'Informe o ano de exp. do cartão')
        } catch (msg) {
            return  res.status(400).json(msg)
        }
        app.models.accounts.updateCard(data, res)
    }
    const cancelSubscription =  (req,res) =>{
        // informações sobre cancelamento (motivos, periodo da graduação, etc)
        const info = req.body.info
        const client = req.body.client
        const signature_id = req.params.id
        console.log(info)
        const data = { info, client, signature_id }

        try{
            existsOrError(info,'Preencha as informações')
            existsOrError(info.graduation_period,'Informe o periodo da sua graduação')
            existsOrError(info.reason,"Informe o motivo do cancelamento")
            existsOrError(info.note,"De uma nota para ajudar em nossas pesquisas ")
            existsOrError(client.email,'Informe o email para cancelamento')
            existsOrError(client.pass,'Informe a senha para cancelamento')
            
        }catch(msg){
            return res.status(400).json(msg)
        }
          app.models.accounts.cancelSubscription(data,res)
    }

    return { updatePass, updateCard, cancelSubscription, updatePerfil, getInfo }
}