module.exports = app =>{
    const { existsOrError, notExistsOrError, equalsOrError } = app.models.validations
    
    const newPlan = async (req,res) =>{
        const plan = req.body

        try{
            existsOrError(plan.name,'Insira um plano')

        }catch(msg){
            return res.status(400).json(msg)
        }
        await app.models.plans.newPlan(plan,res)
    }
    const getPlan = (req,res) =>{
       app.db('planos')
        .then(result=>{
            res.status(200).json(result)
        })
    }

  return { newPlan, getPlan }
}