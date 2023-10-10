# node-express-axio
This example demonstrates how to build a Node.js API that leverages an AI service for generating illustrations from text input. The API is created using the Express.js framework and allows users to send requests with text descriptions. It then communicates with an AI service, such as OpenAI's GPT-3 with image generation capabilities.

# Steps

## Step 1
Create your Account in Stablediffusion: https://stablediffusionapi.com/

## Step 2
Create API key then copy it. Update api.js file and add your api key:
    const apiKey = 'REPLACE-YOUR-API-KEY-HERE';

## Step 3
Save and execute in your terminal:
    npm start

## Step 4 
Check in your browser with this url: http://localhost:3000/
    Complete fields and click in "Generate" button. Pictures will be inside the "pics" folder once generated.

## Step 5
Refresh your page to load new illustrations.

