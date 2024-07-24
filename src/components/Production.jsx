import { Link } from 'react-router-dom'
import { useContext } from 'react'
import EcomContext from '../context/EcomContext'
import { useNavigate } from 'react-router-dom'

function Production({item}) {
  const {addToCart, isAuthenticated} = useContext(EcomContext)
  const redirect = useNavigate()

  const login = ()=> {
    redirect("/login")
  }
  return (
    <div className="m-5 border-2 border-none w-max rounded-lg shadow-lg shadow-blue-400 transform hover:scale-110 transition ease duration-300">
        <Link to={`/detail/${item._id}`}>
          <img src={"http://localhost:8000/" + item.img} 
            alt=""  
            className="h-[200px] w-[200px] rounded-lg"/>
        </Link>
        <div className="text-center my-5">
            <p className="text-xl">{item.name}</p>
            <p className="py-3 text-xl">₦{item.price}</p>
            <button  onClick={isAuthenticated ? ()=> addToCart(item._id) : login} className="bg-blue-950 text-white rounded p-[10px] cursor-pointer">
              Add to cart
            </button>
        </div>
    </div>
  )
}

export default Production