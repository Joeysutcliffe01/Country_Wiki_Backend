const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3500;

app.use(cors({ origin: "https://country-wiki-n98f.onrender.com"  }));
// app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());

app.post("/country", async (req, res) => {
  const { userInput, country } = req.body;
  const input = userInput ? userInput : country;

  console.log("req;", req);

  try {

    // They may have shut down this api
    // const restcountriesApi = `https://restfulcountries.com/api/v1/countries/${input}`;

    console.log("Inside of try fetch");

    const restcountriesApi = `https://restcountries.com/v3.1/name/${input}?fullText=true`;

    const response = await fetch(restcountriesApi);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json("Error message inside of backend fetch",err);
  }
});

app.listen(PORT, () => console.log(`👍 Server is runing on ${PORT}`));
