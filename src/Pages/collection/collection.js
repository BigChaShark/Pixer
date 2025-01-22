import { data, Link } from "react-router-dom";
import CollectionShow from "./collectionShow";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Collection() {
  const [data, dataSet] = useState([]);
  const [pixarData, pixarDataSet] = useState("");
  const getLocalData = async () => {
    try {
      const res = await axios.get("http://localhost:3001/img");
      dataSet(res.data);
    } catch (error) {
      return console.log("Error" + error);
    }
  };
  // const getPixaData = async () => {
  //   try {
  //     const res = await axios.get(
  //       `https://pixabay.com/api/?key=47854887-cc3e84eec372f9f1a5fac1068&id=${id}`
  //     );
  //     await pixarDataSet(res.data.hits[data.length].largeImageURL);
  //   } catch (error) {
  //     console.log("error" + error);
  //   }
  // };
  useEffect(() => {
    getLocalData();
  }, []);
  // useEffect(() => {
  //   getPixaData();
  // }, [pixarData]);

  const handleDeleteAll = async () => {
    try {
      let a = data.map(
        async (x) => await axios.delete(`http://localhost:3001/img/${x.id}`)
      );
      await Promise.all(a);
      await getLocalData();
    } catch (error) {
      console.log("error" + error);
    }
  };
  const handleClickIDDelete = async (id) => {
    if (id) {
      try {
        await axios.delete(`http://localhost:3001/img/${id}`);
        await getLocalData();
      } catch (error) {
        console.log("error" + error);
      }
    }
  };
  const makeShow = (x) => {
    return x.map((x) => (
      <CollectionShow
        key={x.id}
        link={x.link}
        dlt={handleClickIDDelete}
        id={x.id}
      ></CollectionShow>
    ));
  };
  return (
    <div>
      <h1>Collection Page</h1>
      <div>
        <Link to="/">Home</Link>
        <div>{makeShow(data)}</div>
        <button onClick={handleDeleteAll}>delete all</button>
      </div>
    </div>
  );
}
