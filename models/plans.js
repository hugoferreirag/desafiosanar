const { url, authSecret} = require('../.env')
const request = require('request')
module.exports = app => {

    const newPlan =  (plan,res) => {

        if(!plan) return res.status(400).json('Plano invalido')
        var options = {
            method: 'POST',
            uri: url + 'plans',
            headers: {
                'Authorization': 'Basic ' + new Buffer(authSecret + ":").toString('base64'),
                'Content-Type': 'application/json'
            },
            json: plan

        };

         request(options, function (error, response, body) {
            if (error) {
                res.status(response.statusCode).json(error)
            } else {

                  app.db('planos')
                    .insert({ plan_id: response.body.id, name: response.body.name })
                    .then(_ => res.status(200).json(response))
                    .catch(err => res.status(response.statusCode).json(err))

            }


        })
    }
    return { newPlan}
}
