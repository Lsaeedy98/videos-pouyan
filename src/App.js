import "./App.css";
import { useState } from "react";
import { data } from "./data/data";
import Video from "./components/Video";
import "react-alice-carousel/lib/alice-carousel.css";

function App() {
  const [index, setIndex] = useState(0);
  const handleClick = (index) => {
    setIndex(index);
  };

  const setChangeDirection = (direction) => {
    if (direction === "next")
      setIndex(index < data.length - 1 ? index + 1 : index);
    else if (direction === "prev") setIndex(index > 1 ? index - 1 : 0);
  };

  return (
    <div className="App">
      <header>
        <title>demo videos</title>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        ></link>
      </header>
      <main>
        <Video item={data[index]} setDirection={setChangeDirection} />

        <div className="list">
          {data.map((item, indx) => (
            <img
              key={indx}
              alt={item.title}
              onClick={() => handleClick(indx)}
              className={index === indx ? "list-item-selected" : "list-item"}
              width="120"
              height="50"
              src={data[indx].img_url}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
