import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState("");
  const [err, setErrors] = useState(false);
  const [input, setInput] = useState("");
  useEffect(() => {
    fetch(
      `https://api.giphy.com/v1/gifs/trending?api_key=PEyIrGaWdf08Lw4nezyXejpD9Y0pO6Rt`
    )
      .then(res => res.json())
      .then(
        result => {
          setData(result.data);
        },
        error => {
          setErrors(error);
        }
      );
  }, []);
  const deleteItem = id => {
    setData(data.filter(item => item.id !== id));
  };
  const changeTitle = title => {
    setData(
      data.map(item =>
        item.title === title ? Object.assign(item, { title: input }) : item
      )
    );
  };

  return (
    <div className="App">
      {data &&
        data.map(item => (
          <div key={item.id}>
            <img
              alt={item.images[0]}
              src={item.images.downsized_medium.url}
              style={{ width: "100px" }}
            />
            <p>{item.title} </p>
            <input
              onChange={e => {
                setInput(e.target.value);
              }}
            />
            <button
              onClick={() => {
                deleteItem(item.id);
              }}
            >
              delete
            </button>
            <button
              onClick={() => {
                changeTitle(item.title);
              }}
            >
              change title
            </button>
          </div>
        ))}
    </div>
  );
}

export default App;
