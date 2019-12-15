import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState("");
  const [err, setErrors] = useState(false);
  const [input, setInput] = useState({});
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
  const changeTitle = id => {
    setData(
      data.map(item =>
        item.id === id && item.id === input.id
          ? Object.assign(item, { title: input.title })
          : item
      )
    );
  };

  const handleChange = event => {
    const { value, name } = event.target;
    setInput({
      ...input,
      title: value,
      id: name
    });
  };
  console.log("input", input);
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
              name={item.id}
              onChange={e => {
                handleChange(e);
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
                changeTitle(item.id);
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
