import { useState, useEffect } from "react";
import axios from "axios";

const ImageApi = ({ Photo }: { Photo: string }) => {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await axios.get(
          "https://api.unsplash.com/photos/random",
          {
            params: {
              client_id: "yx942CVK5iBIR-aYFffB0ks9DNCZ7e5LOV4_qDTJi6A",
              query: Photo,
            },
          }
        );
        setPhotoUrl(response.data.urls.regular);
      } catch (error) {
        console.error("Error fetching photo:", error);
      }
    };

    fetchPhoto();
  }, [Photo]);

  return <img src={photoUrl} alt="Unsplash" />;
};

export default ImageApi;
