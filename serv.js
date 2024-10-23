// // import express from 'express';
// // import cors from 'cors';
// // import bodyParser from 'body-parser';

// // // Initialize the app
// // const app = express();
// // const PORT = 9000;

// // // Middleware
// // app.use(cors());
// // app.use(bodyParser.json());

// // // Dummy translation logic (replace this with actual translation logic)
// // const translateText = (text, targetLanguage) => {
// //     return `${text} in ${targetLanguage}`; // Dummy response; implement actual translation logic
// // };

// // // Translation endpoint
// // app.post('/translate', (req, res) => {
// //     const { text, target } = req.body; // Updated to match the request body

// //     // Validate input
// //     if (!text || !target) {
// //         return res.status(400).json({ error: 'Text and target language are required.' });
// //     }

// //     // Call the translation logic
// //     const translatedText = translateText(text, target);
// //     res.json({ translatedText });
// // });

// // // Start the server
// // app.listen(PORT, () => {
// //     console.log(`Server is running on http://localhost:${PORT}`);
// // });


// import { Client } from "@gradio/client";

// try {
//     // Connect to the API endpoint with your Hugging Face token
//     const client = await Client.connect("VideoSys/CogVideoX", { 
//         hf_token: "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"  // Replace with your tokeny
//     });

//     // Make a prediction using the specified parameters
//     const result = await client.predict("/generate_vs", {
//         model_name: "THUDM/CogVideoX-2b",   // Specify the model name
//         prompt: "Hello!!",                  // Replace with your desired prompt
//         num_inference_steps: 30,            // Reduce inference steps
//         guidance_scale: 6,                  // Set the guidance scale
//         threshold_start: 850,               // Set the start timestep
//         threshold_end: 100,                 // Set the end timestep
//         gap: 2,                             // Define the broadcast range
//     });

//     // Log the result data
//     console.log(result.data);
// } catch (error) {
//     // Log any errors
//     console.error("API Request failed:", error.message);
// }











//