const express = require('express')
const cors = require("cors")
const dotenv = require('dotenv')
const { Configuration, OpenAIApi } = require('openai')
dotenv.config()


const configuration = new Configuration({
    organization: process.env.ORGANIZATION,
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)
const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res)=>{
    return res.status(200).send({
        message: "Its OK"
    })
})

app.post('/', async (req, res)=>{
    try{
        let {prompt}= req.body
        if(!prompt) return res.status(400).json({
            message: "whats the prompt?"
        })
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt,
            temperature: 0,
            max_tokens: 2000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        })
        const message = response.data.choices[0].text.substring(2)
        res.status(200).json({
            message
        })
    }catch(err){
        return res.status(500).json({
            message: 'someting wrong'
        })
    }
        
})

app.listen(3000, ()=>{
    console.log( "listening 3000")
})

