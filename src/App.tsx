import ImageApi from "./api/index";

const App = () => {
  return (
    <div>
      <h1>Unsplash Photos</h1>
      <ImageApi query="random" />
    </div>
  );
};

export default App;

