import { FaFacebook } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa6";

function Footer() {
  return (
    <div className='bg-blue-950 px-[5%] py-[3%] mt-10 flex justify-between  text-white'>
        <div >
            <p className='text-[24px] text-white font-bold'>Star Tech</p>
        </div>
        <div>
            <h3 className='mb-[10px] text-lg font-bold'>Useful Links</h3>
            <ul>
                <li><a href="">Home</a></li>
                <li><a href="">Contact</a></li>
                <li><a href="">Privacy Policy</a></li>
                <li><a href="">Terms and conditions</a></li>
            </ul>
        </div>
        <div>
            <h3 className='mb-[10px] text-lg font-bold'>Follow us on our Socials</h3>
            <ul className="flex gap-[20px] text-2xl justify-center">
                <li><FaFacebook /></li>
                <li><FaInstagram /></li>
                <li><FaTiktok /></li>
                <li><BsTwitterX />
</li>
            </ul>
        </div>
    </div>
  )
}

export default Footer