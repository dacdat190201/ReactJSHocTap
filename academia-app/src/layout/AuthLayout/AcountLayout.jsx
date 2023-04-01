import { Outlet } from "react-router-dom";
import "./AcountLayout.css";
function AucountLayout() {
  return (
    <div className="page">
      <Outlet />
    </div>
  );
}
export default AucountLayout;
