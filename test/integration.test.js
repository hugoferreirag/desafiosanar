const chai = require('chai')
const server = require('../index')
const chaiHttp = require('chai-http')
const signature = require('../models/signatures')
const should = chai.should()

chai.use(chaiHttp)


describe('Signature', () => {
  
    var sub_id;
    var cus_id;
    var token;

    it('New Signature', (done) => {
        const user =
        {
            
            "cliente":{
                "name":"teste ",
                "lastname":"santos",
                "email":"teste@gmail.com"
            },
            "cartao":{
                "number":"4532912167490007",
                "exp_month":"12",
                "exp_year":"2024",
                "cvv":"555"
            },
            "produtos":{
                "plan_id":"plan_xAKVvQeVH1ulvnR9"
                
            }
        }
        chai.request(server)
            .post('/signatures')
            .send(user)
            .end((err,res)=>{
                res.should.have.status(200)
                
            })
            done()
            
    })
    it('Auth', (done) => {
        const auth =
        {
            "email":"mariosantos@gmail.com",
            "pass":"sanar123"
        }
        chai.request(server)
            .post('/signin')
            .send(auth)
            .end((err,res)=>{
                res.should.have.status(200)
                res.body.should.have.property('token')
                sub_id = res.body.id
                cus_id = res.body.cus_id
                token = res.body.token
                done()        
            })
    })
    it('Get Info', (done) => {
        
       
        chai.request(server)
            .get('/account/getinfo/'+cus_id)
            .set('Authorization','Bearer ' + token )
            .end((err,res)=>{
                res.should.have.status(200)
                done()        
            })
        
            
    })
    it('Update Info', (done) => {
        const info = {
            "info":{
                "cus_name":"jaco",
                "cus_lastname":"poro",
                "cus_company":"naiabing",
                "cus_title":"developer",
                "cus_period_graduation":"5"
            }
        }
        
       
        chai.request(server)
            .put('/account/update/'+cus_id)
            .send(info)
            .set('Authorization','Bearer ' + token )
            .end((err,res)=>{
                res.should.have.status(200)
                done()        
            })
        
            
    })
    it('Update pass', (done) => {
        const pass = 
            {
   
                "pass":"sanar123",
                "confirmPass":"sanar123",
                "newPass":"sanar123"
        }
        
        
       
        chai.request(server)
            .put('/account/password/'+cus_id)
            .send(pass)
            .set('Authorization','Bearer ' + token )
            .end((err,res)=>{
                res.should.have.status(200)
                done()        
            })
        
            
    })
    it('Update card', (done) => {
       
        chai.request(server)
            .patch('/account/paymentdata/'+sub_id)
            .send(   {
                "card":{
                "number":"4532912167490007",
                "cvv":"787",
                "holder_name":"lambada amarela",
                "exp_month":"12",
                "exp_year":"2224"
                }
            })
            .set('Authorization','Bearer ' + token )
            .end((err,res)=>{
                done()        
            })
        
            
    })
    it('Cancel account', (done) => {
       const ar = {
        "info":{
            "graduation_period":"5",
            "reason":"ok",
            "note":5
            
        },
        "client":{
            "email":"marcos@gmail.com",
            "pass":"sanar123"
        }
       }
        chai.request(server)
            .delete('/account/cancel/'+sub_id)
            .set('Authorization','Bearer ' + token )
            .send(ar)
            .end((err,res)=>{
                done()        
            })
        
            
    })
    it('Plans', (done) => {
        
       
        chai.request(server)
            .get('/plans')
            .end((err,res)=>{
                res.should.have.status(200)
                
                done()        
            })
        
            
    })
 
 
})