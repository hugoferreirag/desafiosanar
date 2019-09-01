const mailer = require('nodemailer');
module.exports = app =>{
    const sendEmail = (email, pass)=>{
    const config = {
        host: 'smtp.mailtrap.io',
        port: 25,
        auth:{
            user:'3c1b83051441d4',
            pass:'8d8438f1188807'
        }
    }
    const transporter = mailer.createTransport(config)

    const message = {
        from: "fersoftsolutions@gmail.com",
        to:`${email}`,
        subject:"Seu acesso SanarFlix",
        text:`Parabens! Sua assinatura foi feita com sucesso,
        aproveite seu plano no SanarFlix e faça seus estudos renderem, sua senha de acesso : ${pass} `

    }
    
    const send = transporter.sendMail(message,(error,info) =>{
        if(error){
            return false
        }else{
            return true
        }
    })
    if(send === false){
        return false
       
    }else{
        return true
    }
    }
    return { sendEmail }
}