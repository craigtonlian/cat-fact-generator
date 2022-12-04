import "./App.css";
import Axios from "axios";
import { useState, useEffect } from "react";

document.body.style = "background: powderblue; margin-top: 3em";

function App() {
  const [newFact, setNewFact] = useState("");
  const [factList, setFactList] = useState([]);

  const fetchCatFact = () => {
    Axios.get("https://catfact.ninja/fact").then((res) => {
      setNewFact(res.data.fact);
      console.log(res.data.fact);
    });
  };

  const addCatFact = () => {
    const currFact = {
      id: factList.length === 0 ? 0 : factList[factList.length - 1].id + 1,
      factName: newFact,
    };
    setFactList([...factList, currFact]);
    console.log(factList);
  };

  const deleteCatFact = (id) => {
    setFactList(factList.filter((fact) => fact.id !== id));
  };

  // only renders on mounting
  useEffect(() => {
    fetchCatFact();
    addCatFact();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <div className="addCatFact">
        <button
          className="generateFactButton"
          onClick={() => {
            fetchCatFact();
            addCatFact();
          }}
        >
          Generate Random Cat Fact
        </button>
      </div>
      <div className="factList">
        {factList.map((fact) => {
          return (
            <div className="fact">
              <div className="factHeader">
                {/* {display id number} */}
                {fact.id === 0 ? <h1> </h1> : <h1>Fact #{fact.id}</h1>}

                {/* {display remove button} */}
                {fact.id === 0 ? (
                  <h1> </h1>
                ) : (
                  <button
                    className="removeFactButton"
                    onClick={() => deleteCatFact(fact.id)}
                  >
                    {" "}
                    X{" "}
                  </button>
                )}
              </div>
              <div className="factName">
                {/* {display fact description} */}
                <h1>{fact.factName}</h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
