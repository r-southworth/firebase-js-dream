import * as dotenv from 'dotenv'

dotenv.config()

import { HfInference } from '@huggingface/inference';

// import fetch from 'node-fetch'

// import {Configuration, OpenAIApi } from 'openai';

// const configuration = new Configuration({
//     apiKey: process.env.OPENAI,
// });

// const openai = new OpenAIApi(configuration)

const API_TOKEN = process.env.HUGGINGFACE

// const inference = new HfInference(API_TOKEN)


import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/dream', async (req, res) => {
    const prompt = req.body.prompt;

    const inputData = {
        inputs: prompt,
    }

    const aiResponse = await fetch(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1",
        {
            headers: { 
                Authorization: `Bearer ${API_TOKEN}`,
         },
			method: "POST",
			body: JSON.stringify(inputData),
    });

    const mimeType = 'image/png'
    const result = await aiResponse.arrayBuffer();
    const base64data = Buffer.from(result).toString('base64')
    const img = `data:${mimeType};base64,` + base64data

    res.send({img});
});

app.listen(8080, () => console.log('make art on http://localhost:8080/dream'));
