import Controls from "../Components/Controls";
import LeftSidebar from "../Components/LeftSidebar";
import Navbar from "../Components/Navbar";
import RightSidebar from "../Components/RightSidebar";
import { useUser } from "../Context/UserContext";

export default function Settings(){
  // const { user } = useUser();
  const { user } = useUser();
  console.log(user);
  // console.log(user.id);

  if(!user) return <p>Loading...</p>
  if(!user.email) return <p>Email not found</p>

  return (
    <>
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow">
        <LeftSidebar />
        <div className="flex justify-center items-start flex-grow w-[100%] h-[77vh]">

          <div className="middleCont w-[57%] h-[100%] flex flex-col justify-center items-center rounded-xl bg-neutral-800 text-white p-4 shadow-xl shadow-blue-gray-900/5" style={{backgroundColor:"#1B0025"}}>
            <h1 className="">Settings</h1>

            <div className="info">
              <div>
                <label htmlFor="">Email ID : </label>
                <span>{user.email}</span>
              </div>
            </div>
            
          </div>
        </div>
        <RightSidebar />
      </div>
    </div>

    <Controls />

    </>
  );
}