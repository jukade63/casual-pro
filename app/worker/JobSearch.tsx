"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { BACKEND_URL } from "@/lib/constants";
import { useJobPost } from "@/hooks/useJobPost";
import { Dispatch, SetStateAction } from "react";

interface Props {
  setIsFound: Dispatch<SetStateAction<boolean>>;
}

const JobSearch = ({ setIsFound }: Props) => {
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const { setJobPosts } = useJobPost();

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/job-posts?${new URLSearchParams({
          category,
          location,
          jobType,
        })}`,
        { next: { tags: ["all-jobs"] } }
      );
      const data = await response.json();
      setJobPosts(data);
      if (data.length === 0) {
        setIsFound(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-2 my-5 bg-white rounded-md shadow-md flex flex-col md:flex-row gap-2">
      <input
        type="text"
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full md:w-[120px] bg-gray-200 p-2 focus:outline-none rounded-md"
        placeholder="Category"
      />
      <input
        type="text"
        id="location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full md:w-[120px] bg-gray-200 p-2 focus:outline-none rounded-md"
        placeholder="Location"
      />
      <Select onValueChange={setJobType}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a job type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="part-time">Part-time</SelectItem>
            <SelectItem value="casual">Casual</SelectItem>
            <SelectItem value="temporary">Temporary</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button
        onClick={handleSearch}
        className="bg-green-600 hover:bg-green-600/90"
      >
        <Search color="white" size={18} />
      </Button>
    </div>
  );
};

export default JobSearch;
