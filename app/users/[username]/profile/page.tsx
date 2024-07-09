"use client";
import React, { useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "@heroicons/react/outline";
import ReferralCode from "@/app/components/Users/ReferralCode";

function ProfileSettings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [profilePicture, setProfilePicture] = useState<
    string | ArrayBuffer | null
  >("");

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileType = file.type;
      if (
        fileType === "image/jpeg" ||
        fileType === "image/jpg" ||
        fileType === "image/png"
      ) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfilePicture(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please upload a valid image file (jpg, jpeg, png).");
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col items-center mb-6">
        <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
          {profilePicture ? (
            <Image
              src={profilePicture as string}
              alt="Profile"
              className="w-full h-full object-cover"
              width={128}
              height={128}
            />
          ) : (
            <div className="w-full h-full bg-gray-200"></div>
          )}
        </div>
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={handleProfilePictureChange}
          className="text-sm"
        />
      </div>      
      <ReferralCode />
      <div className="space-y-4 w-full">
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
              onChange={(date: Date) => setBirthday(date)}
              dateFormat="yyyy/MM/dd"
              placeholderText="yyyy/MM/dd"
              className="w-full p-2 pl-10 border border-gray-300 bg-gray-200 hover:bg-gray-100 rounded"
              id="birthday"
            />
          </div>
        </div>
        <button
          className="bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}

export default ProfileSettings;
