import  Button  from "../Button";
import assets from "../../assets";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../Loader";

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false)

    function isValidEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }


    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(!name){
          toast.warning("Please enter your name")
          return
        }
        if(!phone || phone.length<10){
          toast.warning("Please enter your phone")
          return
        }
        if(!email){
          toast.warning("Please enter your email")
          return
        }
        if(!isValidEmail(email)){
          toast.warning("Please enter a valid email")
          return
        }
        if(!message){
          toast.warning("Please enter your message")
          return
        }
        try {
          setLoading(true)
          const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/subscriber/add`, {name,email,phone,message});
          if(response.data.success){
            toast.success("Thank you, your message sent successfully")
          }
          setName("")
          setEmail("")
          setPhone("")
          setMessage("")
        } catch (error) {
          console.log(error);
          toast.error("Something broke! please try again later")
        } finally{
          setLoading(false)
        }
    }
  return (
    <section className="text-white mt-20">
      {loading && <Loader/>}
      {/* heading */}
      <>
        <h3 className="capitalize text-3xl font-bold text-white text-center">
          Contact me
        </h3>
        <p className="capitalize text-sm text-fuchsia-100 text-center mt-5">
          <img src={assets.star} alt="star" className="h-4 inline mx-2" />
          Let's build something really mind blowing
          <img src={assets.star} alt="star" className="h-4 inline mx-2" />
        </p>
      </>
      {/* image and form  */}
      <div className="flex p-8 justify-center flex-col md:flex-row pb-20">
        <div className="img w-full flex justify-center items-center ">
            <img src={assets.group} alt="group" className="w-[320px] h-[350px] object-cover" />
        </div>
        <form onSubmit={handleSubmit} className="text-sm px-12 flex flex-col gap-3 w-full">
            <div>
            <label>Name</label>
            <input type="text" value={name} onChange={e=>setName(e.target.value)} className="border w-full mt-2 border-white/50 rounded-md block p-2" placeholder="Enter your name" />
            </div>
            <div>
            <label>Phone</label>
            <input type="tel" pattern="[0-9]*" inputMode="numeric" value={phone} onChange={e=>setPhone(e.target.value)} className="border w-full mt-2 border-white/50 rounded-md block p-2" placeholder="Enter your phone" />
            </div>
            <div>
            <label>Email</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="border w-full mt-2 border-white/50 rounded-md block p-2" placeholder="Enter your email" />
            </div>
            <div>
            <label>Message</label>
            <textarea type="text" value={message} onChange={e=>setMessage(e.target.value)} className="border w-full mt-2 border-white/50 rounded-md block p-2 h-36 resize-none" placeholder="Enter message" />
            </div>
            <div className="mx-auto md:mx-0">
                <Button stars={true}>Send Message</Button>
            </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
