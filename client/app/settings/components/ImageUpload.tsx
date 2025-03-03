import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { FilePenLine } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function ImageUpload() {

    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);

    const router = useRouter()

  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file)); // Show preview before upload
      }
    };
  
    const handleUpload = async () => {
      if (!image) return toast.error("Please select an image");
    
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "studyhive"); // Cloudinary preset
    
      try {
        // Step 1: Upload to Cloudinary
        const res = await axios.post("https://api.cloudinary.com/v1_1/dyyitqydc/image/upload", formData, {
          withCredentials: false
        });
        const imageUrl = res.data.secure_url;

        const serverURL = 'https://study-hive-server-f6.vercel.app'
    
        // Step 2: Send image URL to backend and link with user
        await axios.put(`${serverURL}/api/v1/update-profile-picture`, 
          { imageUrl },
          
        );
    
        setUploadedImage(imageUrl); // Store in state
        toast.success("Profile photo updated");
        window.location.reload();
      } catch (error) {
        console.error("Upload Error:", error);
        toast.error("Upload Failed");
      }
    };

    

  return (
    <Dialog>
      <DialogTrigger asChild>
        <FilePenLine
          className="text-white bg-gray-800 p-1 rounded-md  cursor-pointer"
          width={27}
          height={27}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 border-none">
        <DialogHeader>
          <DialogTitle className="text-white">Profile Pictiure</DialogTitle>
          <DialogDescription className="text-gray-200">
            Upload your profile picture here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4 -mt-3">
          <div className="bg-gray-900  border-dashed  cursor-pointer">
            <div className="mx-auto max-w-xs">
              <label className="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300">
                <div className="space-y-1 text-center">
                  <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6 text-gray-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                      />
                    </svg>
                  </div>
                  <div className="text-gray-600">
                    <a
                      href="#"
                      className="font-medium text-primary-500 hover:text-primary-700"
                    >
                      Click to upload
                    </a>{" "}
                    or drag and drop
                  </div>
                  <p className="text-sm text-gray-500">
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </p>
                </div>
                <div className="flex relative">
                <input id="ImgUpld" type="file" className="sr-only" accept="image/*" onChange={handleFileChange}/>
                {preview && <img className=" z-100 right-0 top-0" src={preview} alt="Preview" width={200} />}
                </div>
              </label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleUpload} className="bg-green-500 hover:bg-green-600">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ImageUpload;
