import Image from "next/image";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [tokenId, setTokenId] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  const handleChange = (event) => {
    const newValue = Math.min(Math.max(event.target.value, 1), 10000);
    setTokenId(newValue);
  };

  const generateImage = async (event) => {
    event.preventDefault();
    if (!tokenId) return;
    console.log({ tokenId });

    // Make a request to the API route to generate the image.
    const response = await fetch(`/api/generate?id=${tokenId}`);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    console.log({ url });
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
      <div className="w-[90%] lg:w-[50%] border border-[#FEFFFE] min-h-[200px] flex flex-col items-center justify-center mb-[100px]">
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
            Generate Image
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
    </main>
  );
}
