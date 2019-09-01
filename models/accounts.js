const request = require('request')
const bcrypt = require('bcrypt-nodejs')
const { url, authSecret } = require('../.env')
const encryptPassword = password => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}
module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.models.validations
    const getInfo = async (cus_id, res) => {

        await app.db('assinaturas')
            .where({ cus_id: `${cus_id}` })
            .first()
            .then(result => {
                const cliente = {
                    nome: result.cus_name,
                    sobrenome: result.cus_lastname,
                    email: result.cus_email,
                    empresa: result.cus_empresa,
                    titulo: result.cus_title,
                    periodo_graducacao: result.cus_period_graduation
                }
                return res.status(200).json(cliente)
            }
            )
            .catch(err => res.status(400).json(err))

    }
    const updatePerfil = async (data, res) => {
        if (!data.info) return res.status(400).json('Nenhum usuario ou dados enviados!')
        if (!data.cus_id) return res.status(400).json('Nenhum usuário setado!')
        await app.db('assinaturas')
            .update(data.info)
            .where({ cus_id: `${data.cus_id}` })
            .then(result => {
               return res.status(200).json('Dados atualizados!')

            })
            .catch(err => res.status(500).json(err))

    }
    const updatePass = async (data, res) => {
        const verify = await app.db('assinaturas')
            .where({ cus_id: `${data.cus_id}` })
            .first()
        const isMatch = bcrypt.compareSync(data.pass, verify.cus_pass)
        if (!isMatch) return res.status(401).json('Senha atual inválida!/ Assinatura não existe')

        pass = encryptPassword(data.newPass)

        app.db('assinaturas')
            .update({ cus_pass: `${pass}` })
            .where({ cus_id: `${data.cus_id}` })
            .then(_ => res.status(200).json('Senha atualiazada!'))
            .catch(err => res.status(500).json(err))

    }
    const updateCard = async (data, res) => {
        const verify = await app.db('assinaturas')
            .where({ subs_id: `${data.signature_id}` })
            .first()
        if (!verify) return res.status(401).json('Assinatura invalidada ou cancelada')

        var options = {
            method: 'PATCH',
            uri: url + 'subscriptions/' + data.signature_id + '/card',
            headers: {
                'Authorization': 'Basic ' + new Buffer(authSecret + ":").toString('base64'),
                'Content-Type': 'application/json'
            },
            json: data.card
        };
        request(options, function (error, response, body) {
            if (error) {
                res.status(response.statusCode).json(error)
            } else {
                console.log()
                app.db('assinaturas')
                    .update({ card_id: `${response.body.card.id}` })
                    .where({ subs_id: `${data.signature_id}` })
                    .then(_ => res.status(200).json(response.body))
                    .catch(err => res.status(response.statusCode).json(err))

            }


        })


    }
    const cancelSubscription = async (data, res) => {
        if (!data.info) return res.status(401).json('Por favor preencha as informações')
        if (!data.info.reason) return res.status(401).json('Por favor nos informe')
        const verify = await app.db('assinaturas')
            .where({ subs_id: `${data.signature_id}` })
            .first()
        if (data.client.email !== verify.cus_email) return res.status(401).json('Email inválido!/ Assinatura não existe')
        const isMatch = bcrypt.compareSync(data.client.pass, verify.cus_pass)
        if (!isMatch) return res.status(401).json('Senha atual inválida!/ Assinatura não existe')
        if (!verify) return res.status(401).json('Assinatura invalidada ou cancelada')



        var options = {
            method: 'DELETE',
            uri: url + 'subscriptions/' + data.signature_id,
            headers: {
                'Authorization': 'Basic ' + new Buffer(authSecret + ":").toString('base64'),

            },
            json: res

        };

        request(options, function (error, response, body) {
            if (error) {
                res.status(response.statusCode).json(error)
            } else {

                app.db('assinaturas')
                    .update({ canceledAt: new Date(), updatedAt: new Date() })
                    .where({ subs_id: `${data.signature_id}` })
                    .then(_ => res.status(200).json(response.body))
                    .catch(err => res.status(response.statusCode).json(err))

            }


        })

    }
    return { updatePass, updateCard, cancelSubscription, updatePerfil, getInfo }
}