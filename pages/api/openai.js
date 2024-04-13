// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const getOpenAIKey = async(req, res) => {
  res.status(200).json({ api_key: "got ya!"})
}

export default getOpenAIKey;
