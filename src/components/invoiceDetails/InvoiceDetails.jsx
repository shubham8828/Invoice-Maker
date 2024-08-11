import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const InvoiceDetails = () => {
  const location = useLocation();
  // console.log(location.state);
  const [data, setData] = useState(location.state);

    const printInvoice=()=>{
        const input=document.getElementById('invoice');
        html2canvas(input,{useCORS:true})
        .then((canvs)=>{
            const imageData=canvs.toDataURL('image/png',1.0)
            const pdf=new jsPDF({
                orientation:"portrait",
                unit:'pt',
                format:[612,792],
            })
            pdf.internal.scaleFactor=1;
            const imageProps=pdf.getImageProperties(imageData)
            const pdfWidth=pdf.internal.pageSize.getWidth()
            const pdfHeight=(imageProps.height*pdfWidth)/imageProps.width
            pdf.addImage(imageData,'PNG',0,0,pdfWidth,pdfHeight)
            pdf.save('invoice'+new Date(data.date.seconds * 1000).toLocaleDateString())
            console.log("Done")
        })
    } 

  return (
    <div>
        <div className="invoice-top-header">
            <button className="print-btn" onClick={()=>{printInvoice()}}>Print Invoice</button>
        </div>
      <div id="invoice" className="invoice-wrapper">
        <div className="invoice-header">
          <div className="company-details">
            <img
              src={localStorage.getItem("photoUrl")}
              alt="logo"
              className="company-logo"
            />
            <p className="cName">{localStorage.getItem("cName")}</p>
            <p>{localStorage.getItem("email")}</p>
          </div>
          <div className="customer-details">
            <h1>Invoice</h1>
            <p>To:- {data.to}</p>
            <p>Phone:- {data.phone}</p>
            <p>Adress:- {data.address}</p>
          </div>
        </div>
        <table className="product-table">
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {data.product.map((item, index) => {
              const srNo = index + 1;
              const price = parseFloat(item.price);
              const quantity = parseFloat(item.quantity);
              const total = price * quantity;

              return (
                <tr key={item.id}>
                  <td>{srNo}</td>
                  <td>{item.name}</td>
                  <td>{price}</td>
                  <td>{quantity}</td>
                  <td>{total}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
                <td colSpan={'4'}> Total</td>
                <td>{data.total}</td>
            </tr>
          </tfoot>
        </table>

        <div className="invoice-footer">
          <p>
            Thank you for your business! Please make payment by the due date. For any questions, 
            contact us at {localStorage.getItem("email")} .
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
