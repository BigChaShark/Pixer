import axios from "axios";
import { useEffect, useState } from "react";

export default function PopUpShow({ sel, id }) {
  const [linkImg, setLink] = useState("");
  const hendleClick = () => {
    sel(linkImg, id);
  };
  const fetchData = async (maxRetries = 5, delay = 2000) => {
    let attempts = 0;
    while (attempts < maxRetries) {
      console.log(attempts);
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?key=47854887-cc3e84eec372f9f1a5fac1068&id=${id}`
        );
        if (response.data.hits && response.data.hits.length > 0) {
          console.log(response.data.hits[0].id);
          setLink(response.data.hits[0].largeImageURL);

          return;
        } else {
          window.alert("No RS pleas type AG");
          return;
        }
      } catch (err) {
        console.error(`Error`, err.message);
      }
      attempts++;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>{id}</h1>
      <img src={linkImg} />
      <button onClick={hendleClick}>Select</button>
    </div>
  );
}