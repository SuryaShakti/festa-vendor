import { CalendarIcon, ClockIcon } from "@heroicons/react/outline";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";

const index = () => {
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState([]);
  const [projects, setProjects] = useState([]);
  const router = useRouter();

  const getProjects = async () => {
    const token = localStorage.getItem("token");

    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://api.test.festabash.com/v1/vendor-management/vendor-event-details?status=1",
      headers: { Authorization: `Bearer ${token}` },
    };
    setLoading(true);

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setProjects(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };

  const getLeads = async () => {
    const token = localStorage.getItem("token");

    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://api.test.festabash.com/v1/vendor-management/vendor-event-details?status=2",
      headers: { Authorization: `Bearer ${token}` },
    };

    setLoading(true);

    await axios(config)
      .then(function (response) {
        console.log(response.data);
        setLeads(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    status == 0 ? getLeads() : getProjects();
  }, [status]);

  const acceptHandler = (id) => {
    router.push(`/messages/${id}`);
  };

  return (
    <div className={"z-50 text-white"}>
      <div className="z-30 py-5 border-b border-gray-200">
        <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
          <div className="ml-4 mt-2">
            <h3 className="text-2xl leading-6 font-medium text-white">
              Projects/Leads
            </h3>
          </div>
          <div className="mt-3 rounded-xl bg-white shadow grid grid-cols-2 h-9">
            <div
              onClick={() => {
                setStatus(0);
              }}
              className={
                status === 0
                  ? "bg-indigo-700 rounded-md px-10 w-full cursor-pointer text-white flex justify-center items-center font-medium "
                  : "bg-white rounded-md px-10 w-full cursor-pointer text-gray-700 flex justify-center items-center font-medium "
              }
            >
              Leads
            </div>
            <div
              onClick={() => {
                setStatus(1);
              }}
              className={
                status === 1
                  ? "bg-indigo-700 rounded-md px-10 w-full cursor-pointer text-white flex justify-center items-center font-medium "
                  : "bg-white rounded-md px-10 w-full cursor-pointer text-gray-700 flex justify-center items-center font-medium "
              }
            >
              Projects
            </div>
          </div>
        </div>
      </div>

      {status === 0 ? (
        <div className="z-50">
          {" "}
          {loading ? (
            <div className="my-10 w-full flex justify-center">
              <Spinner />
            </div>
          ) : (
            <div className="z-50 my-6">
              {leads?.map((lead, index) => (
                <div
                  key={index}
                  className="z-50 p-3 w-full md:w-2/3 bg-gray-100 bg-opacity-20 rounded-xl"
                >
                  <div className="flex justify-between w-full">
                    <div className="flex-1">
                      <div className="text-lg md:text-xl font-semibold">
                        {lead.event.name}
                      </div>
                      <div className="my-2">{lead.event.description}</div>
                      <div className="flex space-x-6">
                        <div className="flex space-x-2">
                          <CalendarIcon className="w-6 text-gray-100" />
                          <div>{lead?.event.startTime.slice(0, 10)}</div>
                        </div>
                        <div className="flex space-x-2">
                          <ClockIcon className="w-6 text-gray-100" />
                          <div>
                            {lead?.event?.startTime.slice(11, 16)} -{" "}
                            {lead?.event?.endTime.slice(11, 16)}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-9 mt-4 mr-2 ">
                        <button
                          onClick={() => acceptHandler(lead.event._id)}
                          className="bg-indigo-600 text-white rounded-lg px-7 border border-indigo-600"
                        >
                          View Chat
                        </button>
                        <button
                          onClick={() =>
                            router.push(`/projects/${lead.event._id}`)
                          }
                          className=" text-white rounded-lg px-7 border border-white"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                    <div>
                      <img className="h-32" src={lead.event.attachments[0]} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="z-50">
          {" "}
          {loading ? (
            <div className="my-10 w-full flex justify-center">
              <Spinner />
            </div>
          ) : (
            <div className="z-50 my-6">
              {projects?.map((lead, index) => (
                <div
                  key={index}
                  className="z-50 p-3 w-full md:w-2/3 bg-gray-100 bg-opacity-20 rounded-xl"
                >
                  <div className="flex justify-between w-full">
                    <div className="flex-1">
                      <div className="text-lg md:text-xl font-semibold">
                        {lead.event.name}
                      </div>
                      <div className="my-2">{lead.event.description}</div>
                      <div className="flex space-x-6">
                        <div className="flex space-x-2">
                          <CalendarIcon className="w-6 text-gray-100" />
                          <div>{lead?.event.startTime.slice(0, 10)}</div>
                        </div>
                        <div className="flex space-x-2">
                          <ClockIcon className="w-6 text-gray-100" />
                          <div>
                            {lead?.event?.startTime.slice(11, 16)} -{" "}
                            {lead?.event?.endTime.slice(11, 16)}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-9 mt-4 mr-2 ">
                        <button
                          onClick={() =>
                            router.push(`/projects/${lead.event._id}`)
                          }
                          className="bg-indigo-600 text-white rounded-lg px-7 border border-indigo-600"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => acceptHandler(lead.event._id)}
                          className=" text-white rounded-lg px-7 border border-white"
                        >
                          View Chat
                        </button>
                      </div>
                    </div>
                    <div>
                      <img className="h-32" src={lead.event.attachments[0]} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default index;
