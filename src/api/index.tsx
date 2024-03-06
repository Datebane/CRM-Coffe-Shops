import { useState, useEffect, useRef } from "react";
import axios from "axios";

const ImageApi = ({ query }: { query: string }) => {
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [posts, setPosts] = useState<{ data: any[]; page: number }>({ data: [], page: 1 });
  const portion = 10; // Кількість фото на сторінці
  const totalPages = Math.ceil(100 / portion);
  const observerLoader = useRef<IntersectionObserver>();

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(
          "https://api.unsplash.com/photos/random",
          {
            params: {
              client_id: "yx942CVK5iBIR-aYFffB0ks9DNCZ7e5LOV4_qDTJi6A",
              count: 10,
              query: query,
            },
          }
        );
        const urls = response.data.map(
          (query: { urls: { regular: string } }) => query.urls.regular
        );
        setPhotoUrls(urls);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, [query]);

  const getNewPosts = async () => {
    try {
      const response = await axios.get(
        "https://api.unsplash.com/photos/random",
        {
          params: {
            client_id: "yx942CVK5iBIR-aYFffB0ks9DNCZ7e5LOV4_qDTJi6A",
            count: 10,
            query: query,
          },
        }
      );
      const urls = response.data.map(
        (query: { urls: { regular: string } }) => query.urls.regular
      );
      setPhotoUrls((prevUrls) => [...prevUrls, ...urls]);
      setPosts((prevPosts) => ({
        data: [...prevPosts.data, ...response.data],
        page: prevPosts.page + 1
      }));
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  const actionInSight = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && posts.page <= totalPages) {
        getNewPosts();
      }
    });
  };

  useEffect(() => {
    observerLoader.current = new IntersectionObserver(actionInSight);
    const lastItem = document.querySelector('.last-item');
    if (lastItem) {
      observerLoader.current.observe(lastItem);
    }

    return () => {
      if (observerLoader.current) {
        observerLoader.current.disconnect();
      }
    };
  }, [query, totalPages, posts.page]);

  return (
    <div>
      {photoUrls.map((url, index) => (
        <img key={index} src={url} alt="Unsplash" />
      ))}
      <div className="last-item" />
    </div>
  );
};

export default ImageApi;
