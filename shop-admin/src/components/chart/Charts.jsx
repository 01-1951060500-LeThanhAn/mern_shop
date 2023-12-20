import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Jan",
    user: 4000,
    posts: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    user: 3000,
    posts: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    user: 2000,
    posts: 9800,
    amt: 2290,
  },
  {
    name: "Apr",
    user: 2780,
    posts: 3908,
    amt: 2000,
  },
  {
    name: "May",
    user: 1890,
    posts: 4800,
    amt: 2181,
  },
  {
    name: "Jun",
    user: 2390,
    posts: 3800,
    amt: 2500,
  },
  {
    name: "Jul",
    user: 3490,
    posts: 4300,
    amt: 2100,
  },
  {
    name: "Agu",
    user: 3490,
    posts: 2234,
    amt: 2100,
  },
  {
    name: "Sep",
    user: 3490,
    posts: 4535,
    amt: 3422,
  },
  {
    name: "Oct",
    user: 1223,
    posts: 5454,
    amt: 7566,
  },
  {
    name: "Nov",
    user: 7324,
    posts: 4677,
    amt: 2100,
  },
  {
    name: "Dec",
    user: 4456,
    posts: 6323,
    amt: 5432,
  },
];

export default function Charts() {
  return (
    <>
      <div className="shadow-sm bg-white px-4 py-3 shadow-slate-500/50 mb-8">
        <div className="flex justify-between items-center">
          <div className="item">
            <p className="text-2xl text-violet-500 font-bold">
              Xin chào Thành An
            </p>

            <p className="text-slate-500 mt-3">
              Đây là trang admin của bạn. Hãy trải nghiệm nhé{" "}
            </p>

            <button className="mt-6 bg-violet-500 text-white cursor-pointer font-semibold px-3 py-2">
              View data
            </button>
          </div>
          <div className="">
            <img
              className="w-48 h-36 object-contain"
              src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template-free/assets/img/illustrations/man-with-laptop-light.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="shadow-sm bg-white  shadow-slate-500/50">
        <LineChart
          width={800}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="posts"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="user" stroke="#82ca9d" />
        </LineChart>
      </div>
    </>
  );
}
