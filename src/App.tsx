import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

interface Photo {
  id: string;
  urls: { small: string };
  alt_description: string;
}

const App: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get("https://api.unsplash.com/photos", {
          params: {
            client_id: "yx942CVK5iBIR-aYFffB0ks9DNCZ7e5LOV4_qDTJi6A",
            page: page,
            per_page: 10 // Кількість фото на сторінку
          },
        });
        setPhotos(prevPhotos => [...prevPhotos, ...response.data]);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        setPage(prevPage => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <h2>Unsplash Photos</h2>
      <ol>
        {photos.map((photo: Photo) => (
          <li key={photo.id}>
            <img src={photo.urls.small} alt={photo.alt_description} />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default App;




