
import jwt from 'jsonwebtoken'


export const signToken = (_id, email) => {
    
    if( !process.env.JWT_SECRET_SEED ){
        throw new Error("No hay semilla de JWT - Revisar variables de entorno");
    }

    return jwt.sign(
        // payload
        { _id, email },

        // seed
        process.env.JWT_SECRET_SEED,

        // options
        { expiresIn: '1d' }
    )
}


export const isValidToken = ( token ) => {

    if( !process.env.JWT_SECRET_SEED ){
        throw new Error("No hay semilla de JWT - Revisar variables de entorno");
    }

    if( token.trim().length <= 10 ){
        return Promise.reject('JWT no es valido')
    }

    return new Promise(( resolve, reject )=>{
        
        try {
            
            jwt.verify(token, process.env.JWT_SECRET_SEED || '', ( err, payload )=>{
                
                if(err) return reject('El token no es valido')
                
                const { _id } = payload
                resolve(_id)
            })

        } catch (error) {
            reject('El token no es valido')
        }
    })
}