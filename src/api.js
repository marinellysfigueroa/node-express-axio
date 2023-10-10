
const express = require('express');
const router = express.Router();

const axios = require('axios');

const https = require("https");
const fs = require("fs");
const dir = './public/pics';

router.use(express.json());

const apiKey = 'REPLACE-YOUR-API-KEY-HERE';

const path = require('path');

router.post('/generate-illustration', async (req, res) => {
 
  const description = req.body.description;
  const numberOfPics =req.body.numberOfPics

  const bodyInfo = JSON.stringify(
    {
        "key": apiKey,
        "prompt": description ,
        "negative_prompt": "((out of frame)), ((extra fingers)), mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), (((tiling))), ((naked)), ((tile)), ((fleshpile)), ((ugly)), (((abstract))), blurry, ((bad anatomy)), ((bad proportions)), ((extra limbs)), cloned face, (((skinny))), glitchy, ((extra breasts)), ((double torso)), ((extra arms)), ((extra hands)), ((mangled fingers)), ((missing breasts)), (missing lips), ((ugly face)), ((fat)), ((extra legs)), anime",
        "width": "512",
        "height": "512",
        "samples": numberOfPics,
        "num_inference_steps": "30",
        "safety_checker": "no",
        "enhance_prompt": "yes",
        "seed": null,
        "guidance_scale": 7.5,
        "webhook": null,
        "track_id": null
    });
    
  const options = {
        headers: {
          "Content-Type": "application/json",
        },
    };
  
  console.log('Generating Images....')
  const result = await axios.post('https://stablediffusionapi.com/api/v3/text2img', bodyInfo, options);

  const picAmount = await result.data.output.length;

  let i = 0;
  for (i; i < picAmount; i++) {
    let number = i + 1;
    getData(result.data.output[i], number + ".png");
    console.log('Generated Pic ' + number);
  }  
});

router.get('/show/images', (req, res) => {
  const imagesDirectory = path.join(__dirname, '../public/pics'); // Path to the images directory

  // Read the contents of the "images" directory
  fs.readdir(imagesDirectory, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error listing images');
    }

    // Filter out non-image files (you can adjust this as needed)
    const imageFiles = files.filter(file => {
      const fileExtension = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif'].includes(fileExtension);
    });

    // Send the list of image files as a JSON response
    res.json(imageFiles);
  });
});


async function getData(image, filename) {
  await download(image, filename)
}

async function download(url, filename) {
try {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  if (fs.existsSync(filename)) {
    return;
  } else {
    let request = https.get(url, function (response) {
      if (response.statusCode === 200) {
        let file = fs.createWriteStream(dir + '/' + filename);
        response.pipe(file);
      }
      request.setTimeout(12000, function () {
        request.abort();
      });
    });
  }
} catch (err) {
  console.error(err);
}
}

module.exports = router;


