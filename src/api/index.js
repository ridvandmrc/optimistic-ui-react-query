const express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const data = [
  {
    id: 1,
    title: "media",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eu congue velit. Quisque porttitor vestibulum tellus nec faucibus. Donec eu metus leo. Donec hendrerit ex eget erat cursus accumsan. Nunc at tempor urna, ac dapibus magna. Donec quis congue justo, in luctus lacus. Cras sed posuere elit, sed lacinia purus. Quisque neque mi, condimentum tempor sagittis eget, ultrices nec libero. Praesent ut lorem erat.",
  },
  {
    id: 2,
    title: "media",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eu congue velit. Quisque porttitor vestibulum tellus nec faucibus. Donec eu metus leo. Donec hendrerit ex eget erat cursus accumsan. Nunc at tempor urna, ac dapibus magna. Donec quis congue justo, in luctus lacus. Cras sed posuere elit, sed lacinia purus. Quisque neque mi, condimentum tempor sagittis eget, ultrices nec libero. Praesent ut lorem erat.",
  },
  {
    id: 3,
    title: "media",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eu congue velit. Quisque porttitor vestibulum tellus nec faucibus. Donec eu metus leo. Donec hendrerit ex eget erat cursus accumsan. Nunc at tempor urna, ac dapibus magna. Donec quis congue justo, in luctus lacus. Cras sed posuere elit, sed lacinia purus. Quisque neque mi, condimentum tempor sagittis eget, ultrices nec libero. Praesent ut lorem erat.",
  },
  {
    id: 4,
    title: "media",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eu congue velit. Quisque porttitor vestibulum tellus nec faucibus. Donec eu metus leo. Donec hendrerit ex eget erat cursus accumsan. Nunc at tempor urna, ac dapibus magna. Donec quis congue justo, in luctus lacus. Cras sed posuere elit, sed lacinia purus. Quisque neque mi, condimentum tempor sagittis eget, ultrices nec libero. Praesent ut lorem erat.",
  },
];
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({ origin: "*" }));

app.get("/list", (req, res) => {
  res.send(data);
});

app.post("/list", (req, res) => {
  const randomNumber = Math.random() * 100;
  if (randomNumber < 50) {
    return res.status(500).send("error");
  }
  const newId = data[data.length - 1].id + 1;
  const newData = { id: newId, ...req.body };
  data.push(newData);
  return res.send(newData);
});

app.get("/list/:id", (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  res.send(data.find((item) => item.id === +id));
});

app.listen(5500);
