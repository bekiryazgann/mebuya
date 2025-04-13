import {Outlet} from "react-router-dom";
import Header from "./header";

export default function MenuLayout(){
    return (
        <div className="bg-secondary">
            <div className="max-w-2xl mx-auto">
                <Header />
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
