import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "@/pages/home";
import MenuLayout from "@/layouts/menu";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MenuLayout />}>
                    <Route index={true} element={<HomePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}