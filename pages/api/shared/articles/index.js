

export default function handler(req, res) {

    switch (req.method) {

        case 'POST':
            return postEntry( req, res )

            
        case 'GET':
            return gatEntries( req, res )


    
        default:
            return res.status(400).json({ message: 'Endpoint NO existente' })
    }

}


const postEntry = async(req, res) => {

    // console.log(req.body);

    const article = req.body

    article.views = 0

    return res.status(200).json( article )

}



const gatEntries = async(req, res) => {


    return res.status(200).json({ message: 'Hola mundo! desde -gatEntries()-' })
}