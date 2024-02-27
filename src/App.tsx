import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get("https://api.unsplash.com/photos", {
          params: { client_id: "yx942CVK5iBIR-aYFffB0ks9DNCZ7e5LOV4_qDTJi6A" },
        });
        setPhotos(response.data);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div>
      <h2>Unsplash Photos</h2>
      <ol>
        {photos.map(
          photo => (
            <li key={photo.id}>
              <img src={photo.urls.small} alt={photo.alt_description} />
            </li>
          )
        )}
      </ol>
    </div>
  );
};

export default App;
