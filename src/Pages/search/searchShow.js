import { useEffect, useState } from "react";
import axios from "axios";
import { data } from "react-router-dom";
export default function SearchShow({ id, img }) {
  const addCollection = async () => {
    try {
      await axios.get("http://localhost:3001/img").then(async (res) => {
        const isFound = res.data.some((x) => x.id === id);
        if (!isFound) {
          console.log("im in");
          await axios.post("http://localhost:3001/img", {
            id: id,
          });
        } else {
          alert("it same you have now");
          console.log("it same");
        }
      });
    } catch (error) {
      console.log("Error" + error);
    }
  };

  return (
    <div>
      <h2>{`Image : ${id}`}</h2>
      <img src={`${img}`} />
      <button onClick={addCollection}> Add to Collect</button>
    </div>
  );
}
