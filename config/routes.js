module.exports = app => {
    app.post('/signin', app.controllers.auth.signin)
    app.post('/validateToken', app.controllers.auth.validateToken)

    // --------------------------------------- ASSINATURA ******************************************************************

    
    app.route('/signatures')
        .post(app.controllers.signatures.newSignature)
        .get(app.controllers.signatures.getAll)
   
    app.route('/account/password/:id')
        .all(app.config.passport.authenticate())
        .put(app.controllers.accounts.updatePass)

    app.route('/account/paymentdata/:id')
        .all(app.config.passport.authenticate())
        .patch(app.controllers.accounts.updateCard)

    app.route('/account/cancel/:id')
        .all(app.config.passport.authenticate())
        .delete(app.controllers.accounts.cancelSubscription)

    app.route('/account/update/:id')
        .all(app.config.passport.authenticate())
        .put(app.controllers.accounts.updatePerfil)

    app.route('/account/getinfo/:id')
        .all(app.config.passport.authenticate())
        .get(app.controllers.accounts.getInfo)

    app.route('/plans')
        .post(app.controllers.plans.newPlan)
        .get(app.controllers.plans.getPlan)
        
        



  
       

}