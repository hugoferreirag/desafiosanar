module.exports = app =>{
    const existsOrError = (value,msg)=>{
        if(!value) throw msg
        if(Array.isArray(value) && value.length === 0) throw msg
        if(typeof value === 'string' && !value.trim()) throw msg
    }
    function notExistsOrError(value, msg) {
        try {
            existsOrError(value, msg)
        } catch(msg) {
            
        }
        throw msg
    }
    
    function equalsOrError(valueA, valueB, msg) {
        if(valueA !== valueB) throw msg
    }

    const  barCode = () => {
        const n1 = Math.floor(Math.random() * 10)
        const n2 = Math.floor(Math.random() * 10)
        const n3 = Math.floor(Math.random() * 10)
        const n4 = Math.floor(Math.random() * 10)
        const n5 = Math.floor(Math.random() * 10)
        const n6 = Math.floor(Math.random() * 10)
        const n7 = Math.floor(Math.random() * 10)
        const n8 = Math.floor(Math.random() * 10)
        const code =`${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}`;
        return code
     }


    return { existsOrError, notExistsOrError, equalsOrError, barCode }
}