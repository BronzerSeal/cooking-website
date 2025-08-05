import { Separator } from "./components/common/separator";
import NavBar from "./components/ui/navBar";
import MainPage from "./components/page/mainPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailDishPage from "./components/page/detailDishPage";
import { Container } from "@radix-ui/themes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <NavBar />
      <Separator />
      <br />
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/dish" element={<DetailDishPage />} />
          </Routes>
        </BrowserRouter>
      </Container>

      <ToastContainer />
    </>
  );
}

export default App;
