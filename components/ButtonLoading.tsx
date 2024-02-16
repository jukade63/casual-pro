import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

export default function ButtonLoading() {
  return (
    <button disabled className="mx-auto">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
    </button>
  );
}