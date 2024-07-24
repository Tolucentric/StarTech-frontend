import React, { useState } from 'react'
import { MdOutlineShoppingCart } from "react-icons/md";
import { BiMenu } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import EcomContext from '../context/EcomContext';
import AuthContext from '../context/AuthContext';
import useLocalStorage from '../hooks/useLocalStorage';

function Header() {
    const [open, setOpen] = useState(false)
    const { cartItems, cartCount } = useContext(EcomContext)
    const [state, dispatch] = useContext(AuthContext)
    const { showAndHide } = useContext(EcomContext)
    const { deleteItem } = useLocalStorage("auth-token")

    const isAuthenticated = state.accessToken !== null;

    function logout() {
        deleteItem();
        dispatch({ type: "setToken", payload: null });
        showAndHide("success", "You are now signed out")
    }
    const showHeader = (
        <div className='sticky top-0 z-[20] flex items-center justify-between py-[15px] px-[30px] bg-blue-950'>
            <div>
                <a href=""><h1 className='text-[24px] text-white font-extrabold'>Star Tech</h1></a>
            </div>
            <nav className={`space-x-4 text-white text-[15px] lg:flex md:hidden ${open ? "hidden" : ""}`}>
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </nav>
            <button onClick={() => setOpen(!open)} className='flex items-center justify-center w-[35px] h-[35px] lg:hidden'>
                <BiMenu className='text-3xl text-white ' />
            </button>
            <div onClick={() => setOpen(!open)} className={`fixed lg:hidden top-0 w-full bg-black z-[20] ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}></div>
            <div className={`fixed lg:hidden left-0 top-0 w-[200px] h-screen overflow-auto z-[30] bg-white transition-all duration-200 ${open ? "translate-x-[0px]" : "translate-x-[-500px]"}`}>
                <nav className='flex flex-col lg:space-x-4 text-[15px] h-screen space-y-4 pt-20 px-10 bg-blue-950 text-white'>
                    <Link to="">Home</Link>
                    <Link to="">Products</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </nav>

            </div>
        </div>
    );

    const showAuthHeader = (
        <div className='sticky top-0 z-[20] flex items-center justify-between py-[15px] px-[30px] bg-blue-950'>
            <div>
                <a href=""><h1 className='text-[24px] text-white font-extrabold'>Star Tech</h1></a>
            </div>
            <nav className={`space-x-4 text-white text-[15px] lg:flex md:hidden ${open ? "hidden" : ""}`}>
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/cart" className='relative'>
                    <MdOutlineShoppingCart className='text-2xl' />
                    <div className='absolute bottom-2 left-3 text-blue-950 bg-white text-center rounded-full h-4 w-4 text-[10px] font-extrabold'>{cartCount}</div>
                </Link>
                <Link to="" onClick={logout}>Logout</Link>
            </nav>
            <button onClick={() => setOpen(!open)} className='flex items-center justify-center w-[35px] h-[35px] lg:hidden'>
                <BiMenu className='text-3xl text-white ' />
            </button>
            <div onClick={() => setOpen(!open)} className={`fixed lg:hidden top-0 w-full bg-black z-[20] ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}></div>
            <div className={`fixed lg:hidden left-0 top-0 w-[200px] h-screen overflow-auto z-[30] bg-white transition-all duration-200 ${open ? "translate-x-[0px]" : "translate-x-[-500px]"}`}>
                <nav className='flex flex-col lg:space-x-4 text-[15px] h-screen space-y-4 pt-20 px-10 bg-blue-950 text-white'>
                    <Link to="">Home</Link>
                    <Link to="">Products</Link>
                    <Link to="/cart" className='relative'>
                        <MdOutlineShoppingCart className='text-2xl' />
                        <div className='absolute bottom-2 left-3 text-blue-950 bg-white text-center rounded-full h-4 w-4 text-[10px] font-extrabold'>{cartCount}</div>
                    </Link>
                    <Link to="" onClick={logout}>Logout</Link>
                </nav>

            </div>
        </div>
    )

    return (
        <div>{isAuthenticated ? showAuthHeader : showHeader}</div>
    )
}

export default Header;