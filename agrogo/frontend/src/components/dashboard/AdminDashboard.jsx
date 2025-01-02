import AdminNavbar from "./AdminNavbar"
import "./dashboard.css";
import AnalyticsReports from "./AdminDashboardComponents/AnalyticsReport";
import UserManagement  from "./AdminDashboardComponents/UserMangement";
import SystemManagement from "./AdminDashboardComponents/SystemMangement";
import ContentManagement from "./AdminDashboardComponents/ContentManagement";
export default function Dashboard(){
    return(
        <div>
           <AdminNavbar/>

           <div className="max-w-7xl mx-auto pt-10 px-6">
              <UserManagement/>
              <AnalyticsReports/>
              <SystemManagement/>
              <ContentManagement/>
             </div>
          
             
        </div>
    )
}