const bcrypt = require('bcrypt-nodejs')
const jwt = require('jwt-simple')
const { authSecret } = require('../.env')
module.exports = app => {

    // login
    const signin = async (req, res) => {
        // verifica campos vazios
        if (!req.body.email || !req.body.pass) {
            return res.status(400).json('Informe usuário e senha!')
        }
        const query = await app.db('assinaturas')
            .where({ cus_email: req.body.email })
            .first()
        const user = query
        // verifica se existe
        if (!user) return res.status(400).json('Usuario não existe!')
        // senhas conferem
        const isMatch = bcrypt.compareSync(req.body.pass, user.cus_pass)
        if (!isMatch) return res.status(401).json('Email/Senha inválidos!')
        // verifica se a assinatura esta ativa
        if (user.canceledAt) return res.status(401).json('Assinatura cancelada! Quer ser novamente nosso assinante http://localhost:3000/signatures')
        const now = Math.floor(Date.now() / 1000)
        // gera payload pro jwt
        const payload = {
            id: user.subs_id,
            email: user.email,
            cus_id: user.cus_id,
            cus_name: user.cus_name,
            cus_email: user.cus_email,
            card_id: user.card_id,
            plan_id: user.plan_id,
            iat: now,
            exp: now + (60 * 60 * 24)
        }
        return res.status(200).json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })
    }
    // valida time do token
    const validateToken = async (req, res) => {
        const userData = req.body || null

        try {
            if (userData) {
                const token = jwt.decode(userData.token, authSecret)
                if (new Date(token.exp * 1000) > new Date()) {
                    return res.status(200).json()
                }
            }
        } catch (e) {
            res.status(401).json(e)
        }
    
    }
    return { signin, validateToken }
}