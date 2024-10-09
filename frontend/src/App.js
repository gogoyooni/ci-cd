import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState();

  async function fetchData() {
    const res = await fetch("/api");

    const json = await res.json();
    console.log(json);
    setData(json.fruits);
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {data?.map((fruit) => (
        <div key={fruit.id}>
          <h2>{fruit.name}</h2>
          <p>{fruit.price}원</p>
        </div>
      ))}
    </div>
  );
}

export default App;
