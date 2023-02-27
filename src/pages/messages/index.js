import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const messages = () => {
  const router = useRouter();
  const [status, setStatus] = useState(0);
  const [data, setData] = useState();
  const [search, setSearch] = useState("");

  const getChats = async () => {
    const token = localStorage.getItem("token");

    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://api.test.festabash.com/v1/chat/conversation-vendor?$populate=users&$populate=lastMessage",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        $populate: {
          path: "lastMessage",
          populate: ["createdBy"],
        },
      },
    };

    await axios(config)
      .then(function (response) {
        console.log(response.data);
        setData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getChats();
  }, []);

  return (
    <div className="z-50">
      <div className="z-50 py-5 border-b border-gray-200">
        <div className="z-30 -ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
          <div className="z-30 ml-4 mt-2">
            <h3 className="text-2xl leading-6 font-medium text-white  ">
              Messages
            </h3>
          </div>
        </div>
      </div>
      <div className="w-full z-50">
        <div className="md:max-w-3xl z-50">
          {data?.map((chat, index) => (
            <div
              key={index}
              onClick={() => router.push(`messages/${chat._id}`)}
              className="w-full flex my-3 items-center bg-gray-100 bg-opacity-20 shadow-xl cursor-pointer rounded-xl p-2 "
            >
              <div className="flex items-center flex-1">
                <img src={chat.avatar} className="w-14 h-14 rounded-full" />
                <div className="ml-3 space-y-1">
                  <div className="text-lg text-white font-bold">
                    {chat.name}
                  </div>
                  <div className="text-xs text-gray-100">
                    {chat?.lastMessage?.createdBy?.name
                      ? `${chat?.lastMessage?.createdBy?.name} : ${chat?.lastMessage?.message}`
                      : "No messages yet"}
                  </div>
                </div>
              </div>
              <div className="text-white">
                {chat.lastMessage?.createdBy?.createdAt
                  ? chat.lastMessage?.createdBy?.createdAt.slice(11, 16)
                  : ""}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default messages;
