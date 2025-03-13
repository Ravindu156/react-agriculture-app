import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsCloudUpload } from "react-icons/bs";
import { ImagetoBase64 } from '../utility/ImagetoBase64';

const Newproduct = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: "",
    quantity: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const uploadImage = async (e) => {
    const imageData = await ImagetoBase64(e.target.files[0]);
    setData((prev) => ({ ...prev, image: imageData }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Assuming authentication token is stored in localStorage
      const response = await axios.post("http://localhost:5000/ecom/products/uploadProduct", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      alert(response.data.message);
      setData({
        name: "",
        category: "",
        image: "",
        price: "",
        description: "",
        quantity: ""
      });
      navigate("/ecom/home");
    } catch (error) {
      console.error("Error uploading product:", error);
      alert("Failed to upload product");
    }
  };

  return (
    <div className="p-4">
      <form className='m-auto w-full max-w-md shadow flex flex-col p-3 bg-white' onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input type="text" name="name" className='bg-slate-200 p-1 my-1' onChange={handleChange} value={data.name} />

        <label htmlFor='category'>Category</label>
        <select className='bg-slate-200 p-1 my-1' id='category' name='category' onChange={handleChange} value={data.category}>
          <option value="seeds">Seeds</option>
          <option value="fertilizers">Fertilizers</option>
          <option value="tools">Tools</option>
        </select>

        <label htmlFor='image'>Image</label>
        <div className='h-40 w-full bg-slate-200 rounded flex items-center justify-center cursor-pointer'>
          {
            data.image ? <img src={data.image} className="h-full" alt="Product" /> : <span className='text-5xl'><BsCloudUpload /></span>
          }
          <input type="file" accept="image/*" id="image" onChange={uploadImage} className="hidden" />
        </div>

        <label htmlFor='price' className='my-1'>Price</label>
        <input type="text" className='bg-slate-200 p-1 my-1' name='price' onChange={handleChange} value={data.price} />

        <label htmlFor='description'>Description</label>
        <textarea rows={2} value={data.description} className='bg-slate-200 p-1 my-1 resize-none' name='description' onChange={handleChange}></textarea>

        <label htmlFor='quantity' className='my-1'>Quantity</label>
        <input type="text" className='bg-slate-200 p-1 my-1' name='quantity' onChange={handleChange} value={data.quantity} />

        <button className='bg-red-500 hover:bg-red-600 text-white text-lg font-medium my-2 drop-shadow'>Save</button>
      </form>
    </div>
  );
}

export default Newproduct;
