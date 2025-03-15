import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { BsCloudUpload } from "react-icons/bs";
import { ImagetoBase64 } from '../utility/ImagetoBase64';

const Newproduct = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: "",
    quantity:"",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const uploadImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);

    setData((prev) => {
      return {
        ...prev,
        image: data
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);

    const { name, image, category, price } = data;

    if (name && image && category && price) {
      try {
        // Retrieve the token from localStorage or wherever you store it
        const token = localStorage.getItem('token'); // Adjust this according to where the token is stored

        const fetchData = await fetch(`http://localhost:5000/ecom/products/uploadProduct`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}` // Attach the token to the request header
          },
          body: JSON.stringify(data)
        });

        const fetchRes = await fetchData.json();

        console.log(fetchRes);
        toast(fetchRes.message);

        setData(() => {
          return {
            name: '',
            category: '',
            image: '',
            price: '',
            description: '',
            quantity:'',
          };
        });
      } catch (err) {
        console.error('Error uploading product:', err);
        toast('There was an error uploading the product.');
      }
    } else {
      toast('Enter required Fields');
    }
  };

  return (
    <div className="p-4">
      <form className='m-auto w-full max-w-md shadow flex flex-col p-3 bg-white' onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input type={"text"} name="name" className='bg-slate-200 p-1 my-1' onChange={handleOnChange} value={data.name} />

        <label htmlFor='category'>Category</label>
        <select className='bg-slate-200 p-1 my-1' id='category' name='category' onChange={handleOnChange} value={data.category}>
          <option value={"other"}>select category</option>
           <option value={"seeds"}>Seeds</option>
          <option value={"fertilizers"}>Fertilizers</option>
          <option value={"tools"}>Tools</option>

        </select>

        <label htmlFor='image'>Image
          <div className='h-40 w-full bg-slate-200 rounded flex items-center justify-center cursor-pointer'>
            {
              data.image ? <img src={data.image} className="h-full" /> : <span className='text-5xl'><BsCloudUpload /></span>
            }

            <input type={"file"} accept="image/*" id="image" onChange={uploadImage} className="hidden" />
          </div>
        </label>

        <label htmlFor='price' className='my-1'>Price</label>
        <input type={"text"} className='bg-slate-200 p-1 my-1' name='price' onChange={handleOnChange} value={data.price} />

        <label htmlFor='description'>Description</label>
        <textarea rows={2} value={data.description} className='bg-slate-200 p-1 my-1 resize-none' name='description' onChange={handleOnChange}></textarea>
        
        <label htmlFor='quantity' className='my-1'>Quantity</label>
        <input type="text" className='bg-slate-200 p-1 my-1' name='quantity' onChange={handleChange} value={data.quantity} />


        <button className='bg-red-500 hover:bg-red-600 text-white text-lg font-medium my-2 drop-shadow'>Save</button>
      </form>
    </div>
  );
};

export default Newproduct;

