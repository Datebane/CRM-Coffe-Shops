/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const bottomMarkerRef = useRef<HTMLDivElement>(null);

  interface Photo {
    id: string;
    urls: { small: string };
    alt_description: string;
  }

  const loadMorePhotos = async () => {
    if (!loading) {
      try {
        setLoading(true);
        const response = await axios.get("https://api.unsplash.com/photos", {
          params: { client_id: "yx942CVK5iBIR-aYFffB0ks9DNCZ7e5LOV4_qDTJi6A" },
        });
        setPhotos((prevPhotos) => [
          ...prevPhotos,
          ...response.data.map((photo: Photo) => ({ ...photo, key: photo.id })),
        ]);
      } catch (error) {
        console.error("Error fetching photos:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMorePhotos();
        }
      },
      { threshold: 0.5 }
    );

    if (bottomMarkerRef.current) {
      observer.observe(bottomMarkerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [loadMorePhotos]);

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
        {photos.map((photo: Photo, index: number) => (
          <li key={photo.id}>
            <img src={photo.urls.small} alt={photo.alt_description} />
            {index === photos.length - 1 && <div ref={bottomMarkerRef} />}
          </li>
        ))}
        {/* {photos.map((photo: Photo, index: number) => (
          <li key={`${photo.id}-${index}`}>
            <img src={photo.urls.small} alt={photo.alt_description} />
          </li>
        ))} */}
      </ol>
    </div>
  );
};

export default App;