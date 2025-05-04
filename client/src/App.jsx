import "bootstrap/dist/css/bootstrap.min.css";
import Router from "./routes";
import Header from "./component/common/Header.jsx";
function App() {
  return (
    <>
      <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <Header ></Header>
        <Router></Router>
      </div>
    </>
  );
}

export default App;
