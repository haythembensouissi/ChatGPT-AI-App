import * as dotenv from "dotenv"
import express from "express"
import cors from "cors"
import { Configuration,OpenAIApi } from "openai"
dotenv.config()
const configuration = new Configuration({
    apiKey:process.env.API_KEY
})
const openai= new OpenAIApi(configuration)

const app=express()
app.use(cors())
app.use(express.json())
app.get("/",async (req,res)=>{
    res.status(200).send({
        message:"hello from chatgpt"
    })
})
app.post("/",async (req,res)=>{
    try {
        const prompt=req.body.prompt
        const response=await openai.createCompletion({
            model: "text-davinci-003",
            prompt:`${prompt}` ,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
            stop: ["\"\"\""]
        })
        res.status(200).send({
            bot:response.data.choices[0].text
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({error})
    }
})
const port=5000
app.listen(port,console.log(`listening on port ${port}`))