import { Separator } from "./components/common/separator";
import NavBar from "./components/ui/navBar";
import MainPage from "./components/page/mainPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailDishPage from "./components/page/detailDishPage";
import { Container } from "@radix-ui/themes";
import { ToastContainer } from "react-toastify";
import Login from "./components/page/login";
import UserPage from "./components/ui/userPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Separator />
        <br />
        <Container>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/dish" element={<DetailDishPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/userPage" element={<UserPage />} />
          </Routes>
        </Container>
      </BrowserRouter>

      <ToastContainer />
    </>
  );
}

export default App;
