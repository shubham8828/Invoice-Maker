import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const NewInvoice = () => {
  const [to, setTo] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setLoading] = useState(false);

  //   const[product,setProduct]=useState([
  //       {id:0,name:'Laptop',price:50000,quantity:2},
  //       {id:1,name:'Phone',price:10000,quantity:2},
  //       {id:2,name:'TV',price:5000,quantity:2},
  //       {id:3,name:'Fan',price:1000,quantity:2},
  //       {id:4,name:'Table',price:500,quantity:2},
  //   ])

  const navigate = useNavigate();

  const [product, setProduct] = useState([]);

  const addProduct = () => {
    setProduct([
      ...product,
      { id: product.length, name: name, price: price, quantity: quantity },
    ]);
    const t = price * quantity;
    setTotal(total + t);
    setName("");
    setPrice("");
    setQuantity(1);
  };

  const saveData = async () => {
    setLoading(true)
    // console.log(to, phone, address);
    // console.log(product);
    // console.log(total);
    const data = addDoc(collection(db, "invoice"), {
      to: to,
      phone: phone,
      address: address,
      product: product,
      total: total,
      uid: localStorage.getItem("uid"),
      date: Timestamp.fromDate(new Date()),
    });
    // console.log(data);
    navigate("/dashboard/invoices");
    setLoading(false)
  };
  return (
    <div>
      <div className="header-roe">
        <p className="new-invoice-heading">New Invoice</p>
        <button type="button" onClick={saveData} className="add-btn">
        {isLoading && <i className="fa-solid fa-spinner fa-spin-pluse"></i>}

          Save Data
        </button>
      </div>
      <form className="new-invoice-form">
        <div className="first-row">
          <input
            placeholder="To"
            onChange={(e) => {
              setTo(e.target.value);
            }}
            value={to}
            required
          />
          <input
            placeholder="phone"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            value={phone}
            required
          />
          <input
            placeholder="Address"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            required
            value={address}
          />
        </div>

        <div className="first-row">
          <input
            placeholder="Product Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
            value={name}
          />
          <input
            placeholder="Price"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            required
            value={price}
          />
          <input
            type="number"
            placeholder="Quantity"
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
            required
            value={quantity}
          />
        </div>
        <button type="button" onClick={addProduct} className="add-btn">
          Add Product
        </button>
      </form>

      {product.length > 0 && (
        <div className="product-wrapper">
          <div className="product-list">
            <p>SrNo.</p>
            <p>Product Name</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total Price</p>
          </div>

          {product.map((data, index) => (
            <div key={index} className="product-list">
              <p>{index + 1}</p>
              <p>{data.name}</p>
              <p>{data.price}</p>
              <p>{data.quantity}</p>
              <p>{data.quantity * data.price}</p>
            </div>
          ))}
          <div className="total-wrapper">
            <p>Total:{total}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewInvoice;
