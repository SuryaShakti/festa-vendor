import MapAutocomplete from "@/components/MapAutocomplete";
import Spinner from "@/components/Spinner";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  DocumentAddIcon,
  PencilAltIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import axios from "axios";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import ImageUploading from "react-images-uploading";

const Onboarding = () => {
  const [step, setStep] = useState(0);

  const [brandName, setBrandName] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCat, setSelectedCat] = useState({});
  const [selectedSubCat, setSelectedSubCat] = useState({});
  const [comAddress, setComAddress] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [venueOpen, setVenueOpen] = useState(false);
  const [cord, setCord] = useState([]);
  const [addressLine, setAddressLine] = useState("");
  const [cityText, setCityText] = useState("");
  const [address, setAddress] = useState({
    addressLine1: addressLine,
    city: cityText,
    coordinates: [],
  });
  const [photo, setPhoto] = useState("");
  const [photoUploading, setPhotoUploading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  const [businessProof, setBusinessProof] = useState("");
  const [businessProofUploading, setBusinessProofUploading] = useState(false);
  const [businessProofUrl, setBusinessProofUrl] = useState("");
  const [packages, setPackages] = useState([]);
  const [packagesUploading, setPackagesUploading] = useState(false);
  const [packagesLinks, setPackagesLinks] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [attachmentsUploading, setAttachmentsUploading] = useState(false);
  const [attachmentsUrl, setAttachmentsUrl] = useState([]);
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const getCategories = async () => {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://api.test.festabash.com/v1/category",
    };
    setLoading(true);
    await axios(config)
      .then(function (response) {
        console.log(response.data);
        setCategories(response.data.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };

  const secondHandler = () => {
    setStep(1);
  };

  const thirdHandler = () => {
    setStep(2);
  };

  const imageUpload = async (blob) => {
    const token = localStorage.getItem("token");

    var formdata = new FormData();
    formdata.append("file", blob);

    console.log(formdata);
    setPhotoUploading(true);

    var requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
      redirect: "follow",
    };
    await fetch("https://api.test.festabash.com/v1/upload", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result[0].link);
        setPhotoUrl(result[0].link);
        setPhotoUploading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setPhotoUploading(false);
      });
  };

  const packageUpload = async (blob) => {
    const token = localStorage.getItem("token");

    var formdata = new FormData();
    // formdata.append("file", blob);
    blob.map((item) => formdata.append("file", item));

    console.log(formdata);
    setPackagesUploading(true);

    var requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
      redirect: "follow",
    };
    await fetch("https://api.test.festabash.com/v1/upload", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.map((item) => item.link));
        setPackagesLinks(result.map((item) => item.link));
        setPackagesUploading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setPackagesUploading(false);
      });
  };

  const attachmentsUpload = async (blob) => {
    const token = localStorage.getItem("token");

    var formdata = new FormData();
    // formdata.append("file", blob);
    blob.map((item) => formdata.append("file", item));

    console.log(formdata);
    setAttachmentsUploading(true);

    var requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
      redirect: "follow",
    };
    await fetch("https://api.test.festabash.com/v1/upload", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.map((item) => item.link));
        setAttachmentsUrl(result.map((item) => item.link));
        setAttachmentsUploading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setAttachmentsUploading(false);
      });
  };

  const proofUpload = async (blob) => {
    const token = localStorage.getItem("token");

    var formdata = new FormData();
    formdata.append("file", blob);

    console.log(formdata);
    setBusinessProofUploading(true);

    var requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
      redirect: "follow",
    };
    await fetch("https://api.test.festabash.com/v1/upload", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result[0].link);
        setBusinessProofUrl(result[0].link);
        setBusinessProofUploading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setBusinessProofUploading(false);
      });
  };

  const onPostChange = async (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList[0].file);
    setPhoto(imageList);

    await imageUpload(imageList[0].file);
  };
  const onPrrofChange = async (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList[0].file);
    setBusinessProof(imageList);

    await proofUpload(imageList[0].file);
  };

  const onPackageChange = async (imageList) => {
    console.log(imageList);
    setPackages(imageList);

    const _data = imageList.map((item) => item.file);
    console.log(_data);

    await packageUpload(_data);
  };

  const onAttachmentsChange = async (imageList) => {
    console.log(imageList);
    setAttachments(imageList);

    const _data = imageList.map((item) => item.file);
    console.log(_data);

    await attachmentsUpload(_data);
  };

  const onImageRemove = (index) => {
    let newImages = [...packages];
    newImages.splice(index, 1);
    setPackages(newImages);
  };
  const onAttachmentRemove = (index) => {
    let newImages = [...attachments];
    newImages.splice(index, 1);
    setAttachments(newImages);
  };

  const saveHandler = async () => {
    const token = localStorage.getItem("token");

    console.log({
      brand: brandName,
      description: description,
      address: {
        addressLine1: comAddress,
      },
      coordinates: [25.8014, 85.478],
      businessProof: businessProofUrl,
      attachments: attachmentsUrl,
      packages: packagesLinks,
      categories: [
        {
          category: selectedCat._id,
          subCategories: selectedSubCat._id,
        },
      ],
      socialLinks: {
        facebook: facebook,
        instagram: instagram,
      },
    });

    var data = JSON.stringify({
      brand: brandName,
      description: description,
      address: {
        addressLine1: comAddress,
      },
      coordinates: [25.8014, 85.478],
      businessProof: businessProofUrl,
      attachments: attachmentsUrl,
      packages: packagesLinks,
      categories: [
        {
          category: selectedCat._id,
          subCategories: [selectedSubCat._id],
        },
      ],
      socialLinks: {
        facebook: facebook,
        instagram: instagram,
      },
    });

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.test.festabash.com/v1/vendor-management/vendor",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        console.log(response.data);
        router.push("/dashboard");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="text-white min-h-screen bg-gray-900 flex justify-center items-center">
      <div className="max-w-2xl w-full bg-pink-50 bg-opacity-5 p-4 rounded-xl border border-white">
        <div className="text-xl md:text-2xl font-semibold my-3">
          Create your profile
        </div>
        <ol className="flex items-center w-full">
          <li
            className={
              step === 0
                ? "flex w-full items-center text-white  font-semibold after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800"
                : "flex w-full items-center text-gray-600 font-semibold after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800"
            }
          >
            <span
              onClick={() => setStep(0)}
              className={
                step === 0
                  ? "flex items-center justify-center w-10 h-10 shadow-lg bg-indigo-600 rounded-full cursor-pointer dark:bg-blue-800 shrink-0"
                  : "flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full cursor-pointer dark:bg-blue-800 shrink-0"
              }
            >
              1
            </span>
          </li>
          <li
            className={
              step === 1
                ? "flex w-full items-center text-white  font-semibold after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800"
                : "flex w-full items-center text-gray-600 font-semibold after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800"
            }
          >
            <span
              onClick={() => setStep(1)}
              className={
                step === 1
                  ? "flex items-center justify-center w-10 h-10 shadow-lg bg-indigo-600 rounded-full cursor-pointer dark:bg-blue-800 shrink-0"
                  : "flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full cursor-pointer dark:bg-blue-800 shrink-0"
              }
            >
              {" "}
              2
            </span>
          </li>
          <li
            className={
              step === 2
                ? "flex w-full items-center text-white  font-semibold"
                : "flex w-full items-center text-gray-600 font-semibold"
            }
          >
            <span
              onClick={() => setStep(2)}
              className={
                step === 2
                  ? "flex items-center justify-center w-10 h-10 shadow-lg bg-indigo-600 rounded-full cursor-pointer dark:bg-blue-800 shrink-0"
                  : "flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full cursor-pointer dark:bg-blue-800 shrink-0"
              }
            >
              3
            </span>
          </li>
        </ol>

        {step === 0 ? (
          <div className="w-full">
            <div className="my-3">
              <div className="text-xl font-medium">Basic Details</div>
              <div className="h-px w-20 bg-white"></div>
            </div>
            <div>
              <div className="text-white text-sm  mb-1">
                Brand name <span className=" text-sm">*</span>
              </div>
              <input
                className="w-full py-2 border rounded-lg px-4 bg-transparent border-white"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder={"Enter your brand name"}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="my-2">
                <div className="text-white text-sm ">
                  Category <span className=" text-sm">*</span>
                </div>
                <Menu
                  as="div"
                  className="relative  w-full inline-block text-left mt-2"
                >
                  <div>
                    <Menu.Button className="z-50 inline-flex text-white hover:bg-gray-200 w-full justify-between rounded-md px-4 py-2 text-sm  border border-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-transparent focus-visible:ring-opacity-75">
                      {selectedCat?.title
                        ? categories.filter(
                            (cat) => cat._id === selectedCat._id
                          )[0]?.title
                        : "select"}
                      <ChevronDownIcon
                        className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1 ">
                        {categories?.map((cat, index) => (
                          <Menu.Item
                            key={index}
                            onClick={() => {
                              setSelectedCat(cat);
                              setSelectedSubCat({});
                            }}
                          >
                            {({ active }) => (
                              <button
                                className={`${
                                  active
                                    ? "bg-violet-500 text-white"
                                    : "text-gray-900"
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              >
                                {cat.title}
                              </button>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <div className="my-2">
                <div className="text-white text-sm ">
                  Sub Category <span className=" text-sm">*</span>
                </div>
                <Menu
                  as="div"
                  className="relative w-full inline-block text-left mt-2"
                >
                  <div>
                    <Menu.Button className="z-50 inline-flex text-white hover:bg-gray-200 w-full justify-between rounded-md px-4 py-2 text-sm  border border-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-transparent focus-visible:ring-opacity-75">
                      {selectedSubCat?.title
                        ? categories
                            .filter((cat) => cat._id === selectedCat._id)[0]
                            ?.subCatgories.filter(
                              (cat) => cat._id === selectedSubCat._id
                            )[0]?.title
                        : "Select"}
                      <ChevronDownIcon
                        className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute  mt-2 w-full px- origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1 ">
                        {selectedCat?.subCatgories?.map((cat, index) => (
                          <Menu.Item
                            key={index}
                            onClick={() => {
                              setSelectedSubCat(cat);
                            }}
                          >
                            {({ active }) => (
                              <button
                                className={`${
                                  active
                                    ? "bg-violet-500 text-white"
                                    : "text-gray-900"
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              >
                                {cat.title}
                              </button>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>

            <div className="m">
              <div className="text-white text-sm  mb-1">
                Complete address <span className=" text-sm">*</span>
              </div>
              <textarea
                className="w-full py-2 border rounded-lg px-4 border-white bg-transparent"
                value={comAddress}
                rows={4}
                onChange={(e) => setComAddress(e.target.value)}
                placeholder={"Enter your complete address"}
              />
            </div>

            <div>
              <div className="text-white text-sm  mb-1">
                Locate on map <span className=" text-sm">*</span>
              </div>
              <div
                onClick={() => setVenueOpen(true)}
                className="mt-3 w-dull py-2 border text-white border-white   flex justify-center items-center hover:bg-teal-50 transition duration-200 hover:text-teal-500 rounded-xl cursor-pointer"
              >
                Enter your Location
              </div>
            </div>
            <div className="w-full flex justify-end mt-8">
              <button
                onClick={() => secondHandler()}
                className="px-10 rounded-xl py-2 bg-indigo-600 hover:bg-indigo-400 text-white"
              >
                Next
              </button>
            </div>
          </div>
        ) : step === 1 ? (
          <div className="w-full">
            <div className="my-3">
              <div className="text-xl font-medium">
                ID/Business Proof and Description
              </div>
              <div className="h-px w-20 bg-white"></div>
              <div>
                <div className="text-white text-sm mt-5 mb-1">
                  Identity Proof <span className=" text-sm">*</span>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    <ImageUploading
                      multiple
                      value={photo}
                      onChange={onPostChange}
                      dataURLKey="data_url"
                      acceptType={["jpg", "jpeg", "png", "svg"]}
                    >
                      {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                      }) => (
                        <div className="flex space-x-2">
                          {!photoUrl && (
                            <button
                              className="w-full h-10 rounded-lg bg-gray-100 bg-opacity-20 border flex justify-between px-2 items-center text-gray-50"
                              onClick={onImageUpload}
                              {...dragProps}
                            >
                              Upload here <DocumentAddIcon className="h-7" />
                            </button>
                          )}
                          {photoUploading && (
                            <div>
                              <Spinner />
                            </div>
                          )}

                          {!photoUploading &&
                            imageList.map((image, index) => (
                              <div key={index} className="">
                                <img src={image.data_url} alt="" width="100" />
                                <div className="flex space-x-3 justify-end pt-1 items-center">
                                  <button onClick={() => onImageUpdate(index)}>
                                    <PencilAltIcon className="w-6 text-gray-500" />
                                  </button>
                                  <button onClick={() => setPhoto("")}>
                                    <TrashIcon className="w-6 text-red-500" />
                                  </button>
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </ImageUploading>
                    <select
                      id="countries"
                      onChange={(e) => {
                        console.log(e.target.value);
                        
                      }}
                      className="bg-gray-100 h-10 bg-opacity-20 border px-2 border-gray-300 text-white text-sm rounded-lg"
                    >
                      <option className="text-gray-400" selected>
                        Select
                      </option>
                      <option className="text-gray-400" value="aadhar">
                        Aadhar Card
                      </option>
                      <option className="text-gray-400" value="pan">
                        PAN card
                      </option>
                      <option className="text-gray-400" value="vote">
                        Vote Id card
                      </option>
                      <option className="text-gray-400" value="drive">
                        Driving License
                      </option>
                    </select>
                  </div>
                </div>
                <div className="text-white text-sm mt-5 mb-1">
                  Business Proof <span className=" text-sm">*</span>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    <ImageUploading
                      multiple
                      value={businessProof}
                      onChange={onPrrofChange}
                      dataURLKey="data_url"
                      acceptType={["jpg", "jpeg", "png", "svg"]}
                    >
                      {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                      }) => (
                        <div className="flex space-x-2">
                          {!businessProofUrl && (
                            <button
                              className="w-full h-10 rounded-lg bg-gray-100 bg-opacity-20 border flex justify-between px-2 items-center text-gray-50"
                              onClick={onImageUpload}
                              {...dragProps}
                            >
                              Upload here <DocumentAddIcon className="h-7" />
                            </button>
                          )}
                          {businessProofUploading && (
                            <div>
                              <Spinner />
                            </div>
                          )}

                          {!businessProofUploading &&
                            imageList.map((image, index) => (
                              <div key={index} className="">
                                <img src={image.data_url} alt="" width="100" />
                                <div className="flex space-x-3 justify-end pt-1 items-center">
                                  <button onClick={() => onImageUpdate(index)}>
                                    <PencilAltIcon className="w-6 text-gray-500" />
                                  </button>
                                  <button onClick={() => setBusinessProof("")}>
                                    <TrashIcon className="w-6 text-red-500" />
                                  </button>
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </ImageUploading>
                    <select
                      id="countries"
                      className="bg-gray-100 h-10 bg-opacity-20 border px-2 border-gray-300 text-white text-sm rounded-lg"
                    >
                      <option className="text-gray-400" selected>
                        Select
                      </option>
                      <option className="text-gray-400" value="gst">
                        GST certificate
                      </option>
                      <option className="text-gray-400" value="trade">
                        Trade License
                      </option>
                      <option className="text-gray-400" value="tax">
                        Sales Tax Cetificate
                      </option>
                      <option className="text-gray-400" value="incorp">
                        Incorporation certificate
                      </option>
                      <option className="text-gray-400" value="others">
                        Others
                      </option>
                    </select>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="text-white text-sm  mb-1">
                    Descritpion <span className=" text-sm">*</span>
                  </div>
                  <textarea
                    className="w-full py-2 border rounded-lg px-4 border-white bg-transparent"
                    value={description}
                    rows={4}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={"Please describe your service"}
                  />
                </div>

                <div className="w-full flex justify-end mt-8">
                  <button
                    onClick={() => thirdHandler()}
                    className="px-10 rounded-xl py-2 bg-indigo-600 hover:bg-indigo-400 text-white"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="my-3">
              <div className="text-xl font-medium">
                Packages, Photos & Others
              </div>
              <div className="h-px w-20 bg-white"></div>
            </div>
            <div>
              <div className="text-white text-sm mt-4 mb-1">Packages</div>
              <ImageUploading
                multiple
                value={packages}
                onChange={onPackageChange}
                maxNumber={10}
                dataURLKey="data_url"
                onImageRemove={onImageRemove} // pass the onImageRemove function here
              >
                {({ imageList, onImageUpload, onImageRemoveAll }) => (
                  <div className="">
                    <div className="flex space-x-3">
                      <button
                        onClick={onImageUpload}
                        className="h-32 w-32 rounded-lg border border-white bg-gray-100 bg-opacity-20 text-white text-xl font-bold flex justify-center items-center"
                      >
                        +
                      </button>
                      {packagesUploading && (
                        <div>
                          <Spinner />
                        </div>
                      )}
                    </div>

                    {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mt-3">
                      {packages.map((image, index) => (
                        <div key={index} className="image-item">
                          <img
                            className="h-32"
                            src={image["data_url"]}
                            alt=""
                          />
                          <div className="image-item__btn-wrapper">
                            <button onClick={() => onImageRemove(index)}>
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </ImageUploading>
            </div>
            <div className="mt-2">
              <div className="text-white text-sm mt-4 mb-1">Photos</div>
              <ImageUploading
                multiple
                value={attachments}
                onChange={onAttachmentsChange}
                maxNumber={10}
                dataURLKey="data_url"
                onImageRemove={onAttachmentRemove} // pass the onImageRemove function here
              >
                {({ imageList, onImageUpload, onImageRemoveAll }) => (
                  <div className="">
                    <div className="flex space-x-3">
                      <button
                        onClick={onImageUpload}
                        className="h-32 w-32 rounded-lg border border-white bg-gray-100 bg-opacity-20 text-white text-xl font-bold flex justify-center items-center"
                      >
                        +
                      </button>
                      {attachmentsUploading && (
                        <div>
                          <Spinner />
                        </div>
                      )}
                    </div>

                    {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mt-3">
                      {attachments.map((image, index) => (
                        <div key={index} className="image-item">
                          <img
                            className="h-32"
                            src={image["data_url"]}
                            alt=""
                          />
                          <div className="image-item__btn-wrapper">
                            <button onClick={() => onAttachmentRemove(index)}>
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </ImageUploading>
            </div>
            <div className="mt-2">
              <div className="text-white text-sm mt-4 mb-1">Social links</div>
              <input
                className="w-full bg-transparent py-2 px-3 my-2 border rounded-lg border-white"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="Enter your instagram link"
              />
              <input
                className="w-full bg-transparent py-2 px-3 my-2 border rounded-lg border-white"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                placeholder="Enter your facebook link"
              />
            </div>
            <div className="w-full flex justify-end mt-8">
              <button
                onClick={() => saveHandler()}
                className="px-10 rounded-xl py-2 bg-indigo-600 hover:bg-indigo-400 text-white"
              >
                Next
              </button>
            </div>{" "}
          </div>
        )}
      </div>

      {/* <Transition appear show={venueOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setVenueOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full  items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Location on map
                  </Dialog.Title>
                  <div className="mt-2 mb-10">
                    <MapAutocomplete
                      city={cityText}
                      setCity={setCityText}
                      addressLine={addressLine}
                      setAddress={setAddress}
                      setAddressLine={setAddressLine}
                      address={address}
                    />
                  </div>

                  <div className="">
                    <button
                      type="button"
                      className="inline-flex mt-10 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => venueSave()}
                    >
                      {loading ? (
                        <div className="flex w-max mx-auto justify-between items-center space-x-2">
                          <Spinner />
                          <div>Save</div>
                        </div>
                      ) : (
                        "Save"
                      )}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition> */}
    </div>
  );
};

Onboarding.layout = null;
export default Onboarding;
