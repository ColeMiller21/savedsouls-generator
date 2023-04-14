import Image from "next/image";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [tokenId, setTokenId] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  const handleChange = (event) => {
    const newValue = Math.min(Math.max(event.target.value, 1), 10000);
    setTokenId(newValue);
  };

  const generateImage = async (event) => {
    event.preventDefault();
    if (!tokenId) return;
    setLoading(true);
    // Make a request to the API route to generate the image.
    const response = await fetch(`/api/generate?id=${tokenId}`);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    setLoading(false);
    setImageSrc(url);
  };
  return (
    <main className="flex min-h-screen flex-col items-center gap-[3rem] bg-[#222427] text-[#FEFFFE]">
      <header className="w-full text-center flex flex-col gap-[.5rem] mt-[60px]">
        <h1 className="grouch text-[4rem]">Saved Soul Generator</h1>
        <p className="grouch text-[1.25rem] md:text-[1.5rem]">
          Community initiative -{" "}
          <span className="text-[#FF7733]">not an official</span> Saved Souls
          product
        </p>
      </header>
      <div className="w-[90%] lg:w-[50%] border border-[#FEFFFE] min-h-[200px] flex flex-col items-center justify-center">
        {" "}
        <div className="flex flex-col items-center gap-[.7rem]">
          <p className="grouch">Input a Token ID</p>
          <input
            type="number"
            min="1"
            max="10000"
            placeholder="ID"
            className="h-[45px] w-[100px] md:w-[100px] border-[#FEFFFE] rounded pl-2 text-[#FAFAFA] bg-[#141414] overflow-hidden appearance-none"
            onChange={handleChange}
            value={tokenId}
          />
          <button
            onClick={generateImage}
            className="border border-[#FEFFFE] w-[175px] h-[60px] grouch hover:border-[#FF7733] hover:text-[#FF7733] transition-all duration-300 "
          >
            {loading ? "Generating..." : "Generate Image"}
          </button>
          {imageSrc && (
            <img
              src={imageSrc}
              className="w-[60%] aspect-square m-[10px] object-contain"
              alt="ss"
            />
          )}
        </div>
      </div>
      <p>PSA: Cannot generate 1/1 - Errors may not be handled</p>
      <div className="w-full flex flex-col items-center justify-center mb-[20px] text-center">
        <h2 className="mb-[20px] grouch text-[1.75rem]">
          Created by community members
        </h2>
        <div className="flex flex-col md:flex-row w-full justify-center items-center gap-[1.5rem]">
          <div className="flex items-center gap-[.5rem]">
            <img
              src="/img-bones.png"
              alt="TimeCop"
              className="rounded-full bg-red-500 w-[75px] aspect-square"
            />{" "}
            <p className="flex flex-col">
              <span className="text-[#FF7733] font-bold">b0nes</span>{" "}
              <a
                target="_blank"
                href="https://twitter.com/b0nesFAFZ"
                className="cursor-pointer"
              >
                Link 2 Twitter
              </a>
            </p>
          </div>
          <div className="flex items-center gap-[.5rem]">
            <img
              src="/IMG-5937.png"
              alt="TimeCop"
              className="rounded-full bg-red-500 w-[75px] aspect-square"
            />
            <p className="flex flex-col">
              <span className="text-[#FF7733] font-bold">TimeCop</span>{" "}
              <a
                target="_blank"
                href="https://twitter.com/TimeCop0487"
                className="cursor-pointer"
              >
                Link 2 Twitter
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
