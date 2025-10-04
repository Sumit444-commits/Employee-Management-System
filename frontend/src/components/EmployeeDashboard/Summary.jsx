import { FaUser } from "react-icons/fa"
import { useAuthStore } from "../../Context/authContext"

const Summary = () => {
  const {user}= useAuthStore()
  return (
    <div className="p-4">

    <div className='rounded flex bg-white'>
        <div className={`text-3xl flex justify-center items-center bg-teal-600 text-white px-4`}>
            <FaUser/>
        </div>
        <div className='pl-4 py-1'>
            <p className='text-lg font-semibold'>Welcome Back </p>
            <p className='text-xl font-bold'>{user.name}</p>
        </div>
    </div>
    </div>
  )
}

export default Summary