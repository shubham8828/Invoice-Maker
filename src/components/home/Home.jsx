import Chart from "chart.js/auto";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";

const Home = () => {
  const [total, setTotal] = useState(0);
  const [totalInvoice, setTotalInvoice] = useState(0);
  const [totalMonthCollection, setTotalMonthCollection] = useState(0);
  const [invoices, setInvoices] = useState([]);
  const getData = async () => {
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
    getOverAllTotal(data);
    getMonthsTotal(data);
    calculateMonthWiseCollection(data);
  };

  const getOverAllTotal = (invoiceList) => {
    let t = 0;
    invoiceList.forEach((data) => {
      t += data.total;
    });
    setTotal(t);
    // console.log(t)
  };

  const getMonthsTotal = (invoiceList) => {
    let mt = 0;
    invoiceList.forEach((data) => {
      if (
        new Date(data.date.seconds * 1000).getMonth() == new Date().getMonth()
      ) {
        // console.log(data)
        mt += data.total;
      }
    });
    setTotalMonthCollection(mt);
    // console.log(mt)
  };

  useEffect(() => {
    getData();

    // createChart()
  }, []);

  const calculateMonthWiseCollection = (data) => {
    const chartData = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    };

    data.forEach((d) => {
      if (
        new Date(d.date.seconds * 1000).getFullYear() ==
        new Date().getFullYear()
      ) {
        // console.log(d);
        // console.log(new Date(d.date.seconds * 1000).toLocaleDateString("default", {month: "long",}));
        chartData[
          new Date(d.date.seconds * 1000).toLocaleDateString("default", {
            month: "long",
          })
        ] += d.total;
      }
    });
    // console.log(chartData);
    createChart(chartData);
    // console.log(Object.keys(chartData))
    // console.log(Object.values(chartData))
  };
  const createChart = (chartData) => {
    const ctx = document.getElementById("myChart");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: Object.keys(chartData),
        datasets: [
          {
            label: "# of Value",
            data: Object.values(chartData),
            borderWidth: 1,
          },
        ],
      },
    });
  };

  return (
    <div>
      <div className="home-first-row">
        <div className="home-box box-1">
          <h1>Rs. {total} </h1>
          <p>Over All</p>
        </div>
        <div className="home-box box-2">
          <h1>{invoices.length} </h1>
          <p>Invoices</p>
        </div>
        <div className="home-box box-3">
          <h1>Rs. {totalMonthCollection} </h1>
          <p>This Month</p>
        </div>
      </div>

      <div className="home-second-row">
        <div className="chart-box">
          <canvas id="myChart"></canvas>
        </div>
        <div className="recent-invoice-list">
          <h3>Recent Invoice List</h3>
          <div>
            <p>Customer Name</p>
            <p>Date</p>
            <p>Total</p>
          </div>
          {invoices.slice(0, 6).map((data, index) => {
            return(
            <div key={index}>
              <p>{data.to}</p>
              <p>{new Date(data.date.seconds * 1000).toLocaleDateString()}</p>
              <p>{data.total}</p>
            </div>
            )

          })}
        </div>
      </div>
    </div>
  )
};

export default Home;
