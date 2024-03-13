import { useState, useEffect, useRef, useCallback } from "react";

const App = () => {
  interface UnsplashPhoto {
    urls: {
      small: string;
    };
    id: string;
  }

  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPhotos = useCallback(async (pageNumber: number) => {
    const Access_Key = "yx942CVK5iBIR-aYFffB0ks9DNCZ7e5LOV4_qDTJi6A";
    const res = await fetch(
      `https://api.unsplash.com/photos/?client_id=${Access_Key}&page=${pageNumber}&per_page=10`
    );
    const data: UnsplashPhoto[] = await res.json();
    console.log(data);
    setPhotos((p) => [...p, ...data]);
    setLoading(true);
  }, [setPhotos, setLoading]);
  

  useEffect(() => {
    fetchPhotos(pageNumber);
  }, [fetchPhotos, pageNumber]);

  const loadMore = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const pageEnd = useRef<HTMLHeadingElement>(null);
  let num = 1;
  useEffect(() => {
    if (loading) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            num++;
            loadMore();
            if (num >= 5) {
              if (pageEnd.current) {
                observer.observe(pageEnd.current);
              }
            }
          }
        },
        { threshold: 1 }
      );
      if (pageEnd.current) {
        observer.observe(pageEnd.current);
      }
      return () => {
        observer.disconnect();
      };
    }
  }, [loading, num]);

  return (
    <div>
      <h1>Unsplash Photos</h1>
      {photos.map((photo, index) => (
        <div className="photos" key={index}>
          <img src={photo.urls.small} alt="" />
        </div>
      ))}

      <h3 ref={pageEnd}>{photos.length}</h3>
    </div>
  );
};

export default App;
