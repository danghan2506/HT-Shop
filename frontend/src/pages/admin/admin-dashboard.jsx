import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserListQuery } from '../../redux/api/user-api-slice'
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/order-api-slice";
import { useEffect, useState } from "react";
import AllOrders from "./all-orders";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const { data: sales, isLoading: loadingSales } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loadingCustomers } = useUserListQuery();
  const { data: orders, isLoading: loadingOrders } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Sales",
        data: [],
        borderColor: "#00E396",
        backgroundColor: "transparent",
        tension: 0.4,
      },
    ],
  });

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  useEffect(() => {
    if (salesDetail) {
      const labels = salesDetail.map((item) => item._id);
      const data = salesDetail.map((item) => item.totalSales);
      setChartData({
        labels,
        datasets: [
          {
            label: "Sales",
            data,
            borderColor: "#00E396",
            backgroundColor: "transparent",
            tension: 0.4,
          },
        ],
      });
    }
  }, [salesDetail]);

  return (
    <div className="flex flex-col gap-6 p-6 lg:ml-[250px] lg:pr-6 dark bg-white dark:bg-black min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-black text-white">
          <CardContent className="p-4">
            <CardTitle>Sales</CardTitle>
            <div className="text-2xl font-bold mt-2">
              {loadingSales ? <Skeleton className="w-20 h-6" /> : `$${sales.totalSales.toFixed(2)}`}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black text-white">
          <CardContent className="p-4">
            <CardTitle>Customers</CardTitle>
            <div className="text-2xl font-bold mt-2">
              {loadingCustomers ? <Skeleton className="w-20 h-6" /> : customers?.length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black text-white">
          <CardContent className="p-4">
            <CardTitle>Orders</CardTitle>
            <div className="text-2xl font-bold mt-2">
              {loadingOrders ? <Skeleton className="w-20 h-6" /> : orders?.totalOrders}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white dark:bg-black">
        <CardContent className="p-6">
          <CardTitle className="text-black dark:text-white mb-4">Sales Trend</CardTitle>
          <Line data={chartData} options={chartOptions} />
        </CardContent>
      </Card>

      <div className="bg-white dark:bg-black p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">Recent Orders</h2>
        <AllOrders />
      </div>
    </div>
  );
};

export default AdminDashboard;
