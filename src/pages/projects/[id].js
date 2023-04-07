import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ProjectDetails = () => {
  const router = useRouter();
  const [data, setData] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [subEvents, setSubevents] = useState([]);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    var config = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_API_URL}event-management/event/${router?.query?.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios(config)
      .then(function (response) {
        console.log(response.data);
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const fetchSubEvents = async () => {
    const token = localStorage.getItem("token");

    var config = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_API_URL}sub-event-management/sub-event?event=${router?.query.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios(config)
      .then(function (response) {
        console.log("***********", response.data.data);
        setSubevents(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (router.query.id) {
      fetchData();
      fetchSubEvents();
    }
  }, [router.query.id]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div>
      <div className="z-50 flex flex-col items-center md:items-start">
        <div className="z-50 w-full md:w-10/12 shadow-xl rounded-2xl">
          <div className="h-12 rounded-t-2xl bg-white px-5 flex justify-between items-center text-xs md:text-lg text-gray-700 font-semibold">
            <div>{data?.startTime.slice(0, 10)}</div>
            <div>
              Time : {data?.startTime.slice(11, 16)} -{" "}
              {data?.endTime.slice(11, 16)}
            </div>
          </div>
          <div className="p-3 md:p-5 bg-gray-100 bg-opacity-20 rounded-b-2xl flex space-x-3">
            <div className="">
              <img
                className="h-24 w-24 md:h-32 md:w-32 rounded-lg"
                src={data?.attachments[0]}
              />
            </div>
            <div className="flex-1 text-white">
              <div className="font-semibold">{data?.name}</div>
              <div className="text-xs md:text-base ">{data?.description}</div>
              <div className="hidden md:flex space-x-2">
                <div className="">{data?.address?.addressLine1} ,</div>
                <div className="">{data?.address?.city}</div>
              </div>
              <button
                onClick={() => setIsOpen(true)}
                className="text-white bg-indigo-600 w-max px-3 py-1 mt-2 shadow-xl rounded-md"
              >
                View on map
              </button>
            </div>
          </div>
        </div>
        <div className="my-4 font-semibold text-lg text-white">Sub Events</div>
        {subEvents?.length > 0
          ? subEvents?.map((subevent, index) => (
              <div
                key={index}
                className="z-50 mb-3 w-full md:w-10/12 flex space-x-2 px-4 py-2 md:items-center rounded-2xl bg-white bg-opacity-20 shadow-xl"
              >
                <div className="">
                  <img
                    className="h-24 w-24 md:w-auto md:h-40 rounded-lg"
                    src={subevent?.attachments[0]}
                  />
                </div>
                <div className="flex-1 text-white">
                  <div className="font-semibold md:text-xl mb-2">
                    {subevent?.name}
                  </div>
                  <div className="mb-2">{subevent?.description}</div>
                  <div className="flex justify-start space-x-6">
                    <div>{subevent.startTime.slice(0, 10)}</div>
                    <div>
                      {" "}
                      {data?.startTime.slice(11, 16)} -{" "}
                      {data?.endTime.slice(11, 16)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          : "There are no sub events created for this event"}
      </div>
    </div>
  );
};

export default ProjectDetails;
