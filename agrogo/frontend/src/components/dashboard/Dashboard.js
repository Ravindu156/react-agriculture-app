import Navbar from "./Navbar"
import Vedio from "./Vedio"
import Article from "./Article";
import "./dashboard.css";
export default function Dashboard(){
    return(
        <div>
           <Navbar/>
             <div className="max-w-7xl mx-auto pt-10 px-6">
              <Vedio />
              <Article />
             </div>
        </div>
    )
}