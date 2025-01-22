import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function MyProject() {
  const ax = require("axios");
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const handleEditProject = (project) => {
    navigate("/fillter", { state: { project } });
  };
  const handleClickIDDelete = async (id, img) => {
    if (id) {
      try {
        await deleteFile(img);
        await axios.delete(`http://localhost:3001/project/${id}`);
        fetchProjects();
      } catch (error) {
        console.log("error" + error);
      }
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:3001/project");
      setProjects(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const deleteFile = async (path) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      axios
        .post("http://localhost:5000/delete", { path: path })
        .then(() => {
          alert("Image deleted successfully!");
        })
        .catch((error) => {
          console.log(path);
          console.error("Error deleting image:", error);
        });
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <Link to="/">Home</Link>
      <h1>My Projects</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {projects.map((project, index) => (
          <div
            key={index}
            style={{ border: "1px solid gray", padding: "10px" }}
          >
            <img
              src={project.image}
              alt={project.name}
              style={{ width: "150px", cursor: "pointer" }}
              onClick={() => handleEditProject(project)}
            />
            <button
              onClick={() => {
                handleClickIDDelete(project.id, project.image);
              }}
            >
              {" "}
              Delete{" "}
            </button>
            <p>{project.image}</p>
            <p>{project.name}</p>
            <p>{project.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
