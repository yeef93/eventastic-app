"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import defaultAvatar from "@/public/assets/avatar.png"; 

function ProfileSettings() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [avatarId, setAvatarId] = useState<string | null>("");
  const [refCode, setRefCode] = useState("");

  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
    if (session) {
      fetchUserData();
    }
  }, [status, session, router]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${apiUrl}/users/me`, {
        headers: {
          'Authorization': `Bearer ${session?.user.token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setName(data.data.fullName);
        setEmail(data.data.email);
        setBio(data.data.bio);
        setBirthday(new Date(data.data.birthday));
        
        const avatar = data.data.avatar || {};
        setProfilePicture(avatar.imageUrl || defaultAvatar.src); // Use default avatar if no profile picture
        setAvatarId(avatar.id ? avatar.id.toString() : null);
        setRefCode(data.data.ownedRefCode);
        // console.log(data.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileType = file.type;
      if (fileType === "image/jpeg" || fileType === "image/jpg" || fileType === "image/png") {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfilePicture(reader.result as string); // Cast to string
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please upload a valid image file (jpg, jpeg, png).");
      }
    }
  };

  const handleUpdateProfile = async () => {
    const updatedData = {
      fullName: name,
      // avatarId: avatarId,
      avatarId: "12",
      bio: bio,
      birthday: birthday?.toISOString().split("T")[0], // Format to yyyy-MM-dd
    };

    console.log(updatedData);

    try {
      const response = await fetch(`${apiUrl}/users/me/update`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.user.token}`,
        },
        body: JSON.stringify(updatedData),
        
      });
      const data = await response.json();
      if (data.success) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(refCode);
    alert("Referral code copied to clipboard");
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <div className="flex flex-col items-center mb-6 space-y-4">
        <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
          <Image
            src={profilePicture || defaultAvatar.src} // Use default avatar if no profile picture
            alt="Profile"
            className="w-full h-full object-cover"
            width={128}
            height={128}
          />
        </div>
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={handleProfilePictureChange}
          className="text-sm"
        />
      </div>
      <div className="space-y-4">
        <div className="max-w-3xl mx-auto bg-white">
          <label className="block mb-1 font-medium">Referral Code</label>
          <div className="flex justify-between items-center border border-yellow-300 bg-yellow-100 p-4 rounded-md">
            <span className="font-bold text-lg">{refCode}</span>
            <button
              onClick={handleCopy}
              className="text-blue-600 hover:underline text-sm"
            >
              Copy link
            </button>
          </div>
        </div>
        <div className="form-group relative">
          <label htmlFor="name" className="block mb-1 font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 bg-gray-200 hover:bg-gray-100 rounded"
          />
        </div>
        <div className="form-group relative">
          <label htmlFor="email" className="block mb-1 font-medium">
            Public email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 bg-gray-200 hover:bg-gray-100 rounded"
          />
        </div>
        <div className="form-group relative">
          <label htmlFor="bio" className="block mb-1 font-medium">
            Bio
          </label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-2 border border-gray-300 bg-gray-200 hover:bg-gray-100 rounded"
          />
        </div>
        <div className="form-group relative">
          <label htmlFor="birthday" className="block mb-1 font-medium">
            Birthday
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <CalendarIcon className="h-5 w-5 text-gray-400" />
            </div>
            <DatePicker
              selected={birthday}
              onChange={(date: Date | null) => setBirthday(date)}
              dateFormat="yyyy/MM/dd"
              placeholderText="yyyy/MM/dd"
              className="w-full p-2 pl-10 border border-gray-300 bg-gray-200 hover:bg-gray-100 rounded"
              id="birthday"
            />
          </div>
        </div>
        <button
          className="bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleUpdateProfile}
          type="button"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}

export default ProfileSettings;