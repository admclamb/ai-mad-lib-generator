const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { Configuration, OpenAIApi } = require("openai");

async function getMadLib(req, res, next) {
  try {
    console.log("Received request to generate mad lib");
    console.log("Template: ", req.body.template);
    console.log("Words: ", req.body.words);

    const { OPENAI_API_KEY } = process.env;
    if (!OPENAI_API_KEY) {
      throw new Error("No OpenAI API key has been provided");
    }
    const configuration = new Configuration({
      apiKey: OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    // Use the template and words from the request body
    const { template, words } = req.body;

    const min_tokens = 50;
    const max_tokens = 100;
    const prompt = `Generate a mad lib to fill out using [] and no spaces inside the bracket. 
    Any word inside the bracket should not use spaces, and adjective/noun/verb/plural noun should be in the bold format, 
    but instead use underscores. The mad lib cannot exceed ${max_tokens} tokens and be less than ${min_tokens}. 
    Use what type of word it is. The prompt is ${template}`;

    const { data } = await openai.completions.create({
      engine: "text-davinci-002",
      prompt,
      max_tokens,
      temperature: 0.5,
      n: 1,
    });

    // Replace the placeholders in the generated text with the words provided in the request
    const madlib = data.choices[0].text.replace(/\[([^\]]+)\]/g, (match, p1) => {
      const wordType = p1.split("_")[0];
      const wordIndex = parseInt(p1.split("_")[1]) - 1;
      return words[wordType][wordIndex];
    });

    console.log("Generated mad lib: ", madlib);
    res.status(200).json({ madlib });
  } catch (error) {
    console.error("Error generating mad lib: ", error);
    return next({
      status: 500,
      message: error.message,
    });
  }
}

module.exports = {
  getMadLib: asyncErrorBoundary(getMadLib),
};



// async function getMadLib(req, res, next) {
//   try {
//     const { OPENAI_API_KEY, DALLE_API_KEY } = process.env;
//     if (!OPENAI_API_KEY) {
//       throw new Error("No OpenAI API key has been provided");
//     }
//     if (!DALLE_API_KEY) {
//       throw new Error("No DALL-E API key has been provided");
//     }
//     const openaiConfig = new Configuration({
//       apiKey: OPENAI_API_KEY,
//     });
//     const openai = new OpenAIApi(openaiConfig);
//     console.log("GET MAD LIB");

//     // Get user input for words
//     const adjective = req.body.adjective;
//     const verb = req.body.verb;
//     const noun = req.body.noun;
//     const pluralNoun = req.body.pluralNoun;

//     // Use the prompt from the request body
//     const { prompt } = req.body.data;

//     // Use OpenAI to generate mad lib text
//     console.log("prompt: ", prompt);
//     const { data: openaiResponse } = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt: `Generate mad lib to fill out with using [] and no spaces inside the bracket. The mad lib adjectives are ${adjective},
//                verbs are ${verb},
//                nouns are ${noun},
//                and plural nouns are ${pluralNoun}.`,
//       max_tokens: 100,
//       temperature: 0.5,
//       n: 1,
//     });
//     const madLibText = openaiResponse.choices[0].text.trim();

//     // Use DALL-E to draw an image for the mad lib prompt
//     const { data: dalleResponse } = await axios.post(
//       "https://api.openai.com/v1/images/generations",
//       {
//         model: "image-alpha-001",
//         api_key: DALLE_API_KEY,
//         prompt: `${madLibText}\n\nDraw an image that represents the above prompt.`,
//         size: "256x256",
//         response_format: "url",
//       }
//     );
//     const imageUrl = dalleResponse.data[0].url;

//     // Return the generated mad lib text and image URL in the API response
//     res.status(200).json({ madLibText, imageUrl });
//   } catch (error) {
//     console.error(error);
//     return next({
//       status: 500,
//       message: error,
//     });
//   }
// }

// // Export the controller
// module.exports = {
//   madLibGenerator: [asyncErrorBoundary(getMadLib)],
// };
