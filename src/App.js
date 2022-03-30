import React, { useState, useRef, useEffect } from "react";
import "./App.css";

const timeline = new Array(1000).fill(true).map((_, i) => ({
  index: i,
  year: `Year ${i}`,
  date: "29th March, Wednesday",
  content:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.",
}));

let renderArr = [];
for (let i = 0; i < 10; i++) {
  renderArr.push(timeline[i]);
}

let countOfUpdateInArr = 0;

const App = () => {
  const ref = useRef();
  const [startIndex, setStartIndex] = useState(10);
  let countOfElementsInArr = 0;

  // array update function for scroll down
  const updateRenderArrayDownwards = () => {
    for (let i = 0; i < 5; i++) {
      renderArr.shift();
    }
    for (let i = startIndex; i < startIndex + 5; i++) {
      renderArr.push(timeline[i]);
    }
  };

  // array update function for scroll up
  const updateRenderArrayUpwards = () => {
    for (let i = 0; i < 5; i++) {
      renderArr.pop();
    }

    for (let i = startIndex - 10; i > startIndex - 15; i--) {
      renderArr.unshift(timeline[i]);
    }
  };

  useEffect(() => {
    window.onscroll = function () {
      // when scroll is on top of window.
      if (window.pageYOffset === 0 && countOfUpdateInArr !== 0) {
        if (startIndex <= 10) {
          renderArr = [];
          for (let i = 0; i < 10; i++) {
            renderArr.push(timeline[i]);
          }
          setStartIndex(10);
          return;
        }
        updateRenderArrayUpwards();
        setStartIndex(startIndex - 5);
      } else if (
        // when scroll is on bottom of window.
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight
      ) {
        console.log(
          "debug",
          window.innerHeight,
          window.scrollY,
          document.body.offsetHeight
        );
        updateRenderArrayDownwards();
        setStartIndex(startIndex + 5);
        countOfUpdateInArr = countOfUpdateInArr + 1;
      }
    };
  });

  useEffect(() => {
    if (countOfUpdateInArr !== 0) {
      ref.current.scrollIntoView();
    }
  });

  return (
    <div>
      {renderArr.map((d) => {
        countOfElementsInArr = countOfElementsInArr + 1;
        return (
          <div className="main-container">
            <div className="container">
              {countOfElementsInArr ===
              renderArr.length - renderArr.length / 2 ? (
                <div ref={ref} className="content">
                  <h2>{d.year}</h2>
                  <h4>{d.date}</h4>
                  <p>{d.content}</p>
                </div>
              ) : (
                <div id="myId" className="content">
                  <h2>{d.year}</h2>
                  <h4>{d.date}</h4>
                  <p>{d.content}</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default App;
