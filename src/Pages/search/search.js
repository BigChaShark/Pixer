import { data, Form, Link } from "react-router-dom";
import SearchShow from "./searchShow";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Search() {
  //api
  const [pixarData, pixarDataSet] = useState([]);

  //search
  const [inputValue, setInputValue] = useState("");
  const [selectedColorsOption, setSelectedColorsOption] = useState("");
  const [colorsOptions] = useState(["red", "yellow", "blue", "transparent"]);
  const [selectedImgTypeOption, setSelectedImgTypeOption] = useState("");
  const [ImageTypeOptions] = useState(["photo", "illustration", "vector"]);

  //api (fetch)
  const fetchData = async (
    maxRetries = 5,
    delay = 2000,
    q = "yellow+flowers",
    color = "yellow",
    img_type = "all"
  ) => {
    let attempts = 0;
    while (attempts < maxRetries) {
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?key=47854887-cc3e84eec372f9f1a5fac1068&q=${q}&colors=${color}&image_type=${img_type}`
        );
        if (response.data.totalHits <= 0) {
        }
        if (response.data.hits && response.data.hits.length > 0) {
          pixarDataSet(response.data.hits);
          console.log(pixarData);
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

  //search
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleSelectColorsChange = (event) => {
    setSelectedColorsOption(event.target.value);
  };
  const handleSelectImgTypeChange = (event) => {
    setSelectedImgTypeOption(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData(5, 2000, inputValue, selectedColorsOption, selectedImgTypeOption);
  };

  //Show Data
  const MakeShow = (data) => {
    console.log("is  " + data.length);

    return data.map((x) => {
      return <SearchShow key={x.id} id={x.id} img={x.largeImageURL} />;
    });
  };

  return (
    <div>
      <h1>Search Page</h1>
      <Link to="/collection">collection</Link>
      <div>
        <Link to="/">Home</Link>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type something..."
            value={inputValue}
            onChange={handleInputChange}
            style={{ marginRight: "10px", padding: "5px" }}
          />
          <select
            value={selectedColorsOption}
            onChange={handleSelectColorsChange}
            style={{ marginRight: "10px", padding: "5px" }}
          >
            <option value="">Select color "All"</option>
            {colorsOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select
            value={selectedImgTypeOption}
            onChange={handleSelectImgTypeChange}
            style={{ marginRight: "10px", padding: "5px" }}
          >
            <option value="">Select image type "All"</option>
            {ImageTypeOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button type="submit" style={{ padding: "5px 10px" }}>
            Submit
          </button>
        </form>
        {MakeShow(pixarData)}
      </div>
    </div>
  );
}
