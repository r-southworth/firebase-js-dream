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

const inference = new HfInference(API_TOKEN)


import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/dream', async (req, res) => {
    const prompt = req.body.prompt;

    const aiResponse = await inference.textToImage({
        model: 'stabilityai/stable-diffusion-2-1',
        inputs: prompt
    });

    const image = URL.createObjectURL(aiResponse);
    res.send({image});
});

app.listen(8080, () => console.log('make art on http://localhost:8080/dream'));
