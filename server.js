const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3500;

app.use(cors());
app.use(express.json());

app.post("/country", async (req, res) => {
  const { userInput, country } = req.body;
  const input = userInput ? userInput : country;

  try {
    const restcountriesApi = `https://restcountries.com/v3.1/name/${input}?fullText=true`;

    const response = await fetch(restcountriesApi);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.listen(PORT, () => console.log(`👍 Server is runing on ${PORT}`));
