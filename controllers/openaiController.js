const openai = require("../config/openaiConfig");

const generateMeta = async (req, res) => {
    const { title } = req.body()

    const description = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
        {
        role: "user",
        content: `Come up with a short story about ${title}`,
        },
    ],
    max_tokens: 400,
  });

  res.status(200).json({
    description: description.data.choices[0].message,
  })

};

const generateImage = async (req, res) => {
    const image = await openai.createImage({
    prompt: req.body.prompt,
    n: 1,
    size: '512x512'
    })

    res.json({
        url: image.data.data[0].url
    })
}


module.exports = { generateMeta, generateImage };
