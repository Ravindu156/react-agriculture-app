import Navbar from "./Navbar"
import HeroSection from "./HeroSection"
import "./dashboard.css";
export default function Dashboard(){
    return(
        <div>
           <Navbar/>
             <div className="max-w-7xl mx-auto pt-10 px-6">
              <HeroSection />
        
             </div>
        </div>
    )
}