import LeftSidebar from "../Components/LeftSidebar";
import Navbar from "../Components/Navbar";
import RightSidebar from "../Components/RightSidebar";

export default function ProfilePage(){
  return (
    <>
      <Navbar />
      <LeftSidebar />
      <RightSidebar />
      <h1 style={{color: "white"}}>Profile Page</h1>
    </>
  );
}