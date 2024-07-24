import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
} from "chart.js";
import { Bar, Pie, Line, Doughnut, Radar, PolarArea } from "react-chartjs-2";
import "./dashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);

const Dashboard = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [salesCount, setSalesCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const [salesPercentage, setSalesPercentage] = useState([]);
  const [ratingData, setRatingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersCountResponse = await fetch(
          "http://localhost:9000/dash/allusers"
        );
        const usersCountData = await usersCountResponse.json();
        setUsersCount(usersCountData.count);

        const productCountResponse = await fetch(
          "http://localhost:9000/dash/allproducts"
        );
        const productCountData = await productCountResponse.json();
        setProductsCount(productCountData.count);

        const categoryCountsResponse = await fetch(
          "http://localhost:9000/dash/category-counts"
        );
        const categoryCountsData = await categoryCountsResponse.json();
        setCategoryData(categoryCountsData);

        const totalCategoriesResponse = await fetch(
          "http://localhost:9000/dash/total-categories"
        );
        const totalCategoriesData = await totalCategoriesResponse.json();
        setCategoryCount(totalCategoriesData.total);

        // Dummy data for sales count
        setSalesCount(10);

        // Dummy sales percentage data
        setSalesPercentage([
          { id: 0, value: 62, label: "% Sold" },
          { id: 1, value: 38, label: "% UnSold" },
        ]);

        // Dummy rating data
        setRatingData([2, 5.5, 2, 8.5, 1.5, 5]);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);
  const barData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Monthly Sales",
        data: [1, 2, 1, 3, 2, 1, 4, 5, 2, 1, 2, 3],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const pieData = {
    labels: categoryData.map((item) => item.category),
    datasets: [
      {
        data: categoryData.map((item) => item.count),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
        ],
      },
    ],
  };

  const salesPieData = {
    labels: salesPercentage.map((item) => item.label),
    datasets: [
      {
        data: salesPercentage.map((item) => item.value),
        backgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  const lineData = {
    labels: [1, 2, 3, 5, 8, 10],
    datasets: [
      {
        label: "Rating",
        data: ratingData,
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const doughnutData = {
    labels: ["Credit Card", "PayPal", "Cash", "Other"],
    datasets: [
      {
        data: [45, 25, 20, 10],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384"],
      },
    ],
  };

  const radarData = {
    labels: ["Quality", "Price", "Service", "Delivery", "Variety"],
    datasets: [
      {
        label: "Customer Feedback",
        data: [4, 3, 4, 2, 4],
        backgroundColor: "rgba(179,181,198,0.2)",
        borderColor: "rgba(179,181,198,1)",
        pointBackgroundColor: "rgba(179,181,198,1)",
      },
    ],
  };

  const polarAreaData = {
    labels: ["Electronics", "Clothing", "Grocery", "Accessories", "Other"],
    datasets: [
      {
        data: [11, 16, 7, 3, 14],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF6384",
          "#36A2EB",
        ],
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        position: "right",
      },
    },
  };

  return (
    <div className="dashboard">
      <div className="top-boxes">
        <div className="box new-accounts">
          <h3>Users</h3>
          <p>{usersCount}</p>
          <div className="icon">👤</div>
        </div>
        <div className="box total-expenses">
          <h3>Products</h3>
          <p>{productsCount}</p>
          <div className="icon">📦</div>
        </div>
        <div className="box company-value">
          <h3>Sales</h3>
          <p>{salesCount}</p>
          <div className="icon">💰</div>
        </div>
        <div className="box new-employees">
          <h3>Category</h3>
          <p>{categoryCount}</p>
          <div className="icon">🏷️</div>
        </div>
      </div>
      <div className="charts-container">
        <div className="chart-container bar-chart">
          <h6 style={{ alignSelf: "start" }}>Monthly Sales</h6>
          <Bar data={barData} width={500} height={300} />
        </div>
        <div className="pie-charts">
          <div className="chart-container pie-chart">
            <h6 style={{ alignSelf: "start" }}>Category</h6>
            <Pie data={pieData} options={pieOptions} width={350} height={140} />
          </div>
          <div className="chart-container pie-chart">
            <h6 style={{ alignSelf: "start" }}>Sales %</h6>
            <Pie
              data={salesPieData}
              options={pieOptions}
              width={350}
              height={140}
            />
          </div>
        </div>
      </div>
      <div className="chart-container line-chart">
        <h6 style={{ alignSelf: "start" }}>Rating</h6>
        <Line data={lineData} width={1000} height={250} />
      </div>
      <div className="additional-charts">
        <div className="chart-container doughnut-chart">
          <h6 style={{ alignSelf: "start" }}>Payment Methods</h6>
          <Doughnut
            data={doughnutData}
            options={pieOptions}
            width={350}
            height={140}
          />
        </div>
        <div className="chart-container radar-chart">
          <h6 style={{ alignSelf: "start" }}>Customer Feedback</h6>
          <Radar
            data={radarData}
            options={pieOptions}
            width={350}
            height={140}
          />
        </div>
        <div className="chart-container polar-area-chart">
          <h6 style={{ alignSelf: "start" }}>Product Returns</h6>
          <PolarArea
            data={polarAreaData}
            options={pieOptions}
            width={350}
            height={140}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
