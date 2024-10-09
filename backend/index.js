const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;

app.use(cors());

// 기본 라우트 설정
app.get("/api", (req, res) => {
  const data = [
    {
      id: 1,
      name: "Grape",
      price: 1000,
    },
    {
      id: 2,
      name: "Apple",
      price: 1000,
    },
    {
      id: 3,
      name: "Watermelon",
      price: 1000,
    },
    {
      id: 4,
      name: "Melon",
      price: 1000,
    },
    {
      id: 5,
      name: "Bananas",
      price: 1000,
    },
  ];
  res.send({ fruits: data });
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
