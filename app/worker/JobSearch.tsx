"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

const JobSearch = () => {
  const router = useRouter();
  const [query, setQuery] = useState({
    page: 1,
    limit: 5,
    location: "",
    category: "",
    jobType: "",
  });
  

  const handleSearch = async () => {

    router.push(`/find-jobs/?${new URLSearchParams({...query, page: "1", limit: "5"})}`);
    setQuery({ location: "", category: "", jobType: "", page: 1, limit: 5 });
   
  };

  return (
    <div className="max-w-xl mx-auto p-2 my-5 bg-white rounded-md shadow-md flex flex-col md:flex-row gap-2">
      <input
        type="text"
        id="category"
        value={query.category}
        onChange={(e) => setQuery({ ...query, category: e.target.value })}
        className="w-full md:w-[120px] bg-gray-200 p-2 focus:outline-none rounded-md caret-blue-600
        placeholder:text-sm "
        placeholder="Category"
      />
      <input
        type="text"
        id="location"
        value={query.location}
        onChange={(e) => setQuery({ ...query, location: e.target.value })}
        className="w-full md:w-[120px] bg-gray-200 p-2 focus:outline-none rounded-md caret-blue-600
        placeholder:text-sm"
        placeholder="Location"
      />
      <Select onValueChange={(e) => setQuery({ ...query, jobType: e })}>
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
