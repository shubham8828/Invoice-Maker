import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Invoce = () => {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    const q = query(
      collection(db, "invoice"),
      where("uid", "==", localStorage.getItem("uid"))
    );
    const querySnapShot = await getDocs(q);
    const data = querySnapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setInvoices(data);
    setLoading(false);
  };

  const deleteInvoice = async (id) => {
    const isSure = window.confirm("Are you sure want to delete");
    if (isSure) {
      try {
        await deleteDoc(doc(db, "invoice", id));
        getData();
      } catch {
        alert("Something Wrong try again");
      }
    }
  };
  return (
    <div>
      {isLoading ? <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <i className="fa-solid fa-spinner fa-spin-pluse" style={{fontSize:'50px'}}></i>
        </div>: <div>
        {
      invoices.map((data) => (
          <div className="box" key={data.id} >
            <p>{data.to}</p>
            <p>{new Date(data.date.seconds * 1000).toLocaleDateString()}</p>
            <p>Rs. {data.total}</p>
            <button
              className="delete-btn"
              onClick={() => {
                deleteInvoice(data.id);
              }}
            >
              <i className="fa-solid fa-trash"></i> Delete
            </button>
            <button
              onClick={() => {
                navigate("/dashboard/invoice-details", { state: data });
              }}
              className="view-btn delete-btn"
            >
              <i className="fa-solid fa-eye"></i>View
            </button>
          </div>
        ))}
        {
          invoices.length<1 && <div className="no-invoice-wrapper">
            <p>You Don't Have Any Invoice </p>
            <button onClick={()=>{navigate('/dashboard/new-invoice')}}>Create New Invoice</button>
          </div>
        }
      </div>
      
      }
    </div>
  );
};

export default Invoce;
