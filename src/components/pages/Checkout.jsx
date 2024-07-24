import { useContext } from "react"
import EcomContext from "../../context/EcomContext"


function Checkout() {
    const {cartItems, totalAmount} = useContext(EcomContext);

    const handleCheckout = async (e) => {
        e.preventDefault();

        const amount = totalAmount();
        const currency = "NGN";
        const firstName = e.target.elements.firstName.value;
        const lastName = e.target.elements.lastName.value;
        const phone = e.target.elements.phone.value;
        const address = e.target.elements.address.value;

        try {
            const res = await fetch("http://localhost:8000/api/payment/initiate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": `${localStorage.getItem("auth-token")}`
                },
                body: JSON.stringify({
                    amount,
                    currency,
                    firstName,
                    lastName,
                    phone,
                    address,
                }),
            });

            const data = await res.json()
                if (res.ok) {
                    window.location.href = data.link
                } else{
                    console.log(data.msg || "Failed to initiate payment");
                }
        } catch (error) {
            console.error(error);
        }
    };

  return (
    <div>
        <div className="flex w-[80%] mx-auto justify-around my-[5%]">
            <div className="w-[50%]">
            <table className="w-[90%] mx-auto">
            <thead>
                <th>Name</th>
                <th>Img</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Amount</th>
            </thead>
            <tbody className="text-center">
                {cartItems.products?.map((item)=> (
                    <tr className="border-b-2">
                    <td>{item.product?.name}</td>
                    <td>
                        <img src={"http://localhost:8000/" + item.product?.img} alt="" className="h-[70px]"/>
                    </td>
                    <td>₦{item.product?.price}</td>
                    <td>{item.quantity}</td>
                    <td>₦{item.amount}</td>
                </tr>
                ))}
            </tbody>
            </table>
            <div className="flex justify-between mt-[3%]">
                <div>
                    <p className="text-xl">Total Amount: ₦{totalAmount()}</p>
                </div>
                
            </div>
            </div>
            <div className="w-[50%]">
                <h1 className="text-center mb-[10px] text-2xl font-bold">Delivery Information</h1>
                <form onSubmit={(e)=> handleCheckout(e)} > 
                    <div className="mb-3">
                        <input 
                        type="text" 
                        className=" w-full p-[10px] border-b-[1px] shadow-sm border-stone-500 " 
                        placeholder="First Name" 
                        name = "firstName"
                        />
                    </div>
                    <div className="mb-3">
                        <input 
                        type="text" 
                        className=" w-full p-[10px] border-b-[1px] shadow-sm border-stone-500 " 
                        placeholder="Last Name" 
                        name= "lastName"
                        />
                    </div>
                    <div className="mb-3">
                        <input 
                        type="text" 
                        className=" w-full p-[10px] border-b-[1px] shadow-sm border-stone-500 " 
                        placeholder="Phone Number"
                        name= "phone" 
                        />
                    </div>
                    <div>
                        <textarea id="" className=" w-full p-[10px] border-b-[1px] shadow-sm border-stone-500 "  placeholder="Delivery Address" name="address">   
                        </textarea>
                    </div>
                    <div>
                        <button 
                        className="bg-blue-950 p-[10px] text-white rounded-lg">
                            Pay Now
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Checkout