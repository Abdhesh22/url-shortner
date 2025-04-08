import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateUrl from "../component/url/Create-url.jsx";
import RedirectUrl from "../component/url/Redirect.jsx";
import NotFound from "../component/common/NotFound.jsx";
const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreateUrl />} />
          <Route path="/:shortUrl" element={<RedirectUrl />}></Route>
          <Route path="/not-found" element={<NotFound />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
