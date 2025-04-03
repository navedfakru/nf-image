import { useEffect, useRef, useState } from "react"


function Canva() {
  const [img, setImag] = useState()
  const [removeBg, setRemoveBg] = useState()

  // const handleFileChange = async (event) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const imageUrl = URL.createObjectURL(file);
  //     console.log(imageUrl)
  //     setImag(imageUrl);
  //     await setupImage(imageUrl);
  //   }
  // };

  // const setupImage = async (imageUrl) => {
  //   try {
  //     const imageBlob = await removeBackground(imageUrl);
  //     const url = URL.createObjectURL(imageBlob);
  //     setRemoveBg(url);
  //     console.log(url)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handle = () => {
    // const canvas = canvasRef.current;
    // const dataUrl = canvas.toDataURL('image/png')
    const link = document.createElement('a');
    link.download = `removebgcanva.png`;
    link.href = removeBg;
    link.click();
  }

  return (
    <div className='w-full flex justify-center items-center flex-col bg-amber-200'>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".jpg, .jpeg, .png"
      />
      <div>
        { img && <img src={img} alt="cd" className="h-52" /> }
      </div>
      <div>
        {
          removeBg && (
            <div>
              <img src={removeBg} alt="cd" className="h-52 mt-5" />
              <button className="bg-red-600 text-xl px-5 py-1 rounded-xl cursor-pointer text-white mt-5" onClick={handle}>download</button>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Canva