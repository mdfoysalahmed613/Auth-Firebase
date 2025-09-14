import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AuthContext from "@/Context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Label } from "@radix-ui/react-label";
import { Loader2, Upload, X } from "lucide-react";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { MagicCard } from "./magicui/magic-card";
import ThemeContext from "@/Context/ThemeContext";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useFileUpload } from "@/components/magicui/use-file-upload";
import axios from "axios";

export default function ProfileUpdate() {
  const { user, updateInfo } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const navigate = useNavigate();

  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const handleChange = (e) => {
    setName(e.target.value);
  };

  const [
    { files, isDragging },
    {
      openFileDialog,
      getInputProps,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
    },
  ] = useFileUpload({
    accept: "image/*",
  });

  const previewUrl = files[0]?.preview || photoURL;

  const handleSubmit = async (e) => {
    setUpdatingProfile(true);
    e.preventDefault();
    try {
      if (name !== user?.displayName || files[0]) {
      const formData = new FormData();
      formData.append("file", files[0].file);
      formData.append("upload_preset", "Authentication"); // replace this

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dnvekgesb/image/upload`,
        formData
      );
      const uploadedUrl = response.data.secure_url;
      setPhotoURL(uploadedUrl);
      console.log("uploaded URL",uploadedUrl)
      await updateInfo(user, name, uploadedUrl)

    }
    await user.reload();
    toast.success("Profile updated successfully")
    } catch (error) {
      console.log(error)
      toast.error("Cant update profile")
    }finally{
      setUpdatingProfile(false)
    }
    
  };

  return (
    <div className="w-full max-w-sm">
      <Card>
        <MagicCard
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
          className="py-6"
        >
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Profile</CardTitle>
              <X onClick={() => navigate("/")} />
            </div>

            <CardDescription>Update your profile information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Avatar className="rounded-lg flex mb-6 justify-center relative">
                <AvatarImage
                  className="w-36 aspect-square rounded-full object-cover"
                  src={previewUrl || user?.photoURL || "/defualt-avatar.png"}
                  alt="User Avatar"
                />
                <AvatarFallback>
                  <img
                    src="/defualt-avatar.png"
                    className="w-36 h-36 rounded-full"
                    alt=""
                  />{" "}
                </AvatarFallback>

                <div className="absolute right-25 -bottom-2">
                  {/* Drop area */}
                  <button
                    className="border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 focus-visible:border-ring focus-visible:ring-ring/50 relative flex size-10 items-center justify-center overflow-hidden rounded-full border transition-colors outline-none focus-visible:ring-[3px] has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none"
                    onClick={openFileDialog}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    data-dragging={isDragging || undefined}
                    aria-label={previewUrl ? "Change image" : "Upload image"}
                    type="button"
                  >
                    <Upload className="w-5 h-5 opacity-60" />
                  </button>

                  <input
                    {...getInputProps()}
                    className="sr-only"
                    aria-label="Upload image file"
                    tabIndex={-1}
                  />
                </div>
              </Avatar>

              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    readOnly
                    className="cursor-not-allowed bg-gray-100"
                    value={user.email}
                    required
                  />
                </div>
              </div>
              <div />
              <div className="flex justify-end pt-6 gap-4">
                <Button
                  type="none"
                  onClick={() => navigate("/")}
                  variant="outline"
                >
                  Cancel
                </Button>

                <Button type="submit" disabled={updatingProfile}>
                  {updatingProfile ? (
                    <Loader2 className="animate-spin w-4 h-4" />
                  ) : (
                    "save"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </MagicCard>
      </Card>
    </div>
  );
}
