import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import ChartComponent from "../../components/Chart";
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const getDetails = async () => {
    const token = localStorage.getItem("token");
    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.test.festabash.com/v1/vendor-management/vendor-dashboard",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setLoading(true);
    await axios(config)
      .then(function (response) {
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };

  const getDate = (date) => {
    const inputDate = new Date(date);
    const options = { month: "long", day: "numeric", year: "numeric" };
    const outputDate = inputDate.toLocaleDateString("en-US", options);

    return outputDate;
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <>
      <Head>
        <title>Festa Vendor | dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="z-50 text-white">
        <div className="z-50 py-5 border-b border-gray-200">
          <div className="z-30 -ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
            <div className="z-30 ml-4 mt-2">
              <h3 className="text-2xl leading-6 font-medium text-white  ">
                Dashboard
              </h3>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="my-10 w-full flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <div className="w-full md:w-2/3">
            <ChartComponent details={data} />

            <div className="my-5">
              <div>
                <div className="text-2xl fonr-bold text-white">
                  Upcoming Projects
                </div>
                <div className="h-px bg-white w-32 mt-1"></div>

                <div>
                  {data?.upcomingProjects?.map((project, index) => (
                    <div
                      className="my-3 shadow bg-white bg-opacity-30 rounded-xl p-3 w-full"
                      key={index}
                    >
                      <div>{project.name}</div>
                      <div>{getDate(project.startTime)}</div>
                      <div>{project.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
