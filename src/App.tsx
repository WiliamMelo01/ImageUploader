import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Upload } from "upload-js";
import ImageIlustration from "./assets/image.svg";
import Loading from "./components/Loading";
import Uploaded from "./components/Uploaded";

const APIKEY = import.meta.env.VITE_UPLOAD_KEY;

const upload = Upload({ apiKey: APIKEY });

function App() {

  const drop = useRef<HTMLDivElement>(null);
  const file = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (!drop.current) {
      return;
    }
    drop.current.addEventListener('dragover', handleDragOver);
    drop.current.addEventListener('drop', handleDrop);

    return () => {
      if (!drop.current) {
        return;
      }
      drop.current.removeEventListener('dragover', handleDragOver);
      drop.current.removeEventListener('drop', handleDrop);
    };
  }, []);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: DragEvent) => {
    if (!e.dataTransfer) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();

    const { files } = e.dataTransfer;

    uploadFile(files[0]);
  };

  const chooseFile = () => {
    if (!file.current) {
      return;
    }
    file.current.click();
  };

  const onChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if ((e.target).files) {
      const [file] = e.target.files;
      uploadFile(file);
    }
  }

  const onProgress = ({ progress }: { progress: number }) => {
    setLoading(true);
    setProgress(progress);
  }

  async function uploadFile(file: File) {
    const filePieces = file.name.split('.');
    const extension = filePieces[filePieces.length - 1];
    const allowedExtensions = ['JPEG', 'PNG', 'SVG', 'WEBP', 'JPG',];
    const isAllowed = allowedExtensions.includes(extension.toUpperCase());
    if (!isAllowed) {
      return;
    }
    const { fileUrl } = await upload.uploadFile(file, { onProgress });
    setLoading(false);
    setImageUrl(fileUrl);
  }

  return (
    <div className="w-screen h-screen max-h-screen overflow-hidden bg-[#f0f0f0] grid place-items-center font-poppins">
      {
        !loading && !imageUrl &&
        <div className="w-11/12 min-[500px]:max-w-[460px] md:w-[402px] h-[469px] bg-white rounded-xl shadow-md">
          <p className="font-medium text-[#4F4F4F] text-xl text-center mt-9 mb-4">
            Upload your image
          </p>
          <p className="font-medium text-[#828282] text-xs text-center mb-7">
            File should be Jpeg, Png,...
          </p>
          <div className="w-10/12 h-1/2 bg-[#F6F8FB] mx-auto border-2 border-dashed border-[#97BEF4] rounded-xl flex flex-col items-center gap-9"
            ref={drop}
          >
            <img
              src={ImageIlustration}
              alt="Image ilustration"
              className=" md:w-2/5 mt-8" />
            <p className="font-medium text-[#BDBDBD] text-xs text-center mb-7">
              Drag & Drop your image here
            </p>
          </div>
          <p className="font-medium text-[#BDBDBD] text-xs text-center mt-4">
            Or
          </p>
          <div className="w-full h-9 flex items-center justify-center mt-6">
            <button className="w-28 h-full bg-[#2F80ED] rounded-lg font-notosans text-md text-white"
              onClick={chooseFile}
            >
              Choose a file
            </button>
            <input type="file" ref={file} style={{ display: 'none' }} onChange={(e) => onChangeFile(e)} />
          </div>
        </div>
      }
      {
        loading && progress &&
        < Loading progressPercentage={progress} />
      }
      {
        imageUrl &&
        <Uploaded imageUrl={imageUrl} />
      }
    </div>
  )
}

export default App
