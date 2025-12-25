"use client"
import { useState } from "react";
import Link from "next/link"
import { ToastContainer, toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation'

const Generate = () => {
  const searchParams = useSearchParams()
  const handleSearch = searchParams.get('handle')

  const [form, setForm] = useState({
    handle: handleSearch || "",
    pic: "",
    desc: "",
    links: [{id: Date.now(), url: "", text: ""}]
  });
  const [generated, setGenerated] = useState("");

  const handleChange = ({ e, index }) => {

    const { name, value } = e.target;

    if (name === "url" || name === "text") {
      setForm(prev => {
        const newLinks = [...prev.links]

        newLinks[index] = {
          ...newLinks[index],
          [name]: value
        };

        return {
          ...prev,
          links: newLinks
        }
      })
    } else {
      setForm(prev => ({
        ...prev,
        [name]: value
      }))
    }
  };

  const addLink = () => {
    setForm(prev => {
      return {
        ...prev,
        links: prev.links.concat({id: Date.now(), url: "", text: ""})
      }
    })
  };

  const removeLink = (id) => {
    setForm(prev => ({
      ...prev,
      links: prev.links.filter((item) => item.id !== id)
    }))
  };

  const subitLinks = async () => {
    if (!form.handle.trim() || !form.pic.trim()) {
      toast.warn("Please fill required fields");
      return;
    }

    const hasEmptyLinks = form.links.some(link => 
      !link.url.trim() || !link.text.trim()
    );
    
    if (hasEmptyLinks) {
      toast.warn("Please fill all link fields");
      return;
    }

    const trimmedData = {
      links: form.links.map(link => ({
        id: link.id,
        url: link.url.trim(),
        text: link.text.trim()
      })),
      handle: form.handle.trim(),
      pic: form.pic.trim(),
      desc: form.desc.trim()
    };

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(trimmedData);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://localhost:3000/api/add", requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Response status: ${res.status}`);
        }
        return res.json()
      })
      .then((result) => {
        if (result.success) {
          setGenerated(`${process.env.NEXT_PUBLIC_HOST}/${form.handle}`)
          toast.success(result.message)
        } else {
          if (result.data.findOne.handle) (setGenerated(`${process.env.NEXT_PUBLIC_HOST}/${result.data.findOne.handle}`))
          toast.warn(result.message)
        }

        setForm(prev => ({
          ...prev,

          handle: "", 
          pic: "",
          desc: "",
          links: [{id: Date.now(), url: "", text: ""}]
        }))
      })
      .catch((error) => {
        toast.error(error.message)
      })
  };

  return (
    <div className="bg-[#E9C0E9] min-h-screen grid grid-cols-2">
      <div className="flex justify-center items-center flex-col text-gray-900 mt-28">
        <div className="flex flex-col gap-5 my-10">
          
          <h1 className="font-bold text-4xl">Create your bittree</h1>

          <div className="item">
            <h2 className="font-semibold text-2xl">
              Step 1: Claim your Handle
            </h2>
            <div className="mx-4">
              <input
                className="px-4 py-3 mx-2 bg-white my-3 focus:outline-pink-500 rounded-full"
                type="text"
                name="handle"
                value={form.handle}
                onChange={(e) => handleChange({e})}
                placeholder="Choose a Handle"
              />
            </div>
          </div>

          <div className="item">
            <h2 className="font-semibold text-2xl">Step 2: Add Links</h2>

            {form.links.map((item, index) =>
              <div key={item.id} className="mx-4">
                <input
                  name="text"        
                  value={item.text}
                  onChange={(e)=> handleChange({e, index})}
                  className="px-4 py-3 mx-2 bg-white my-3 focus:outline-pink-500 rounded-full"
                  placeholder="Enter link text"
                />
                <input
                  type="text"
                  name="url" 
                  value={item.url}
                  onChange={(e)=> handleChange({e, index})}
                  className="px-4 py-3 mx-2 bg-white my-3 focus:outline-pink-500 rounded-full"
                  placeholder="Enter link"
                />
                {form.links.length > 1 && <button onClick={() => removeLink(item.id)} className="text-red-600 font-bold text-xl">×</button>}
              </div>
            )}

            <button onClick={addLink} className="p-5 py-2 cursor-pointer mx-2 my-2 bg-slate-900 text-white font-bold rounded-3xl">
              + Add Link
            </button>
          </div>

          <div className="item">
            <h2 className="font-semibold text-2xl">
              Step 3: Add Picture and Description
            </h2>

            <div className="mx-4 flex flex-col">
              <input
                className="px-4 py-3 mx-2 bg-white my-3 focus:outline-pink-500 rounded-full"
                type="text"
                name="pic" 
                value={form.pic}
                onChange={(e)=> handleChange({e})}
                placeholder="Enter link to your Picture"
              />
              <input
                className="px-4 py-3 mx-2 bg-white my-3 focus:outline-pink-500 rounded-full"
                type="text"
                name="desc"
                value={form.desc}
                onChange={(e)=> handleChange({e})}
                placeholder="Enter description"
              />

              <button 
                disabled={form.handle === "" || form.pic === ""}
                onClick={subitLinks}
                className="p-5 cursor-pointer py-2 mx-2 w-fit my-5 bg-slate-900 text-white font-bold rounded-3xl disabled:bg-gray-600 disabled:text-gray-500 disabled:cursor-not-allowed"
              >
                Create your BitTree
              </button>
            </div>
          </div>

        </div>
      </div>

      <div className="w-full h-screen bg-[#E9C0E9] flex flex-col items-center justify-center">
        <img
          className="h-full object-contain"
          src="/generate.png"
          alt="Generate your links"
        />
        {generated && <Link href={generated}
          className="block flex justify-center items-center text-red-600 hover:text-red-700 font-semibold text-center">{generated}
        </Link>}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Generate;