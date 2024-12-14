import React from 'react'
import logo from "../dashboard/logo.png"

const Header= () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleShowMenu = () => {
    setShowMenu((preve) => !preve);
  };
  const handleLogout = () => {
    dispatch(logoutRedux());
    toast("Logout successfully");
  };

  const cartItemNumber = useSelector((state)=>state.product.cartItem)
  return (
    <header className ='fixed shadow-md w-full h-16'>
      <div className=''>
          <img src={logo}className="h-full" />
      </div>


    </header>
   
  )
}

export default Header