import { cn } from "@/lib/utils";
import Link from "next/link";

interface PaginationProps {
  searchParams: { [key: string]: string | undefined };
}

const Pagination = ({ searchParams }: PaginationProps) => {
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const nextPage = currentPage + 1;
  const prevPage = Math.max(currentPage - 1, 1);

  const isFirstPage = currentPage <= 1;

  return (
    <div className="flex space-x-6">
      <Link
        href={{
          pathname: "/find-jobs",
          query: {
            ...searchParams,
            page: prevPage.toString(),
          },
        }}
        className={cn(
          "rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800",
          isFirstPage && "pointer-events-none opacity-50"
        )}
      >
        Previous
      </Link>
      <Link
        href={{
          pathname: "/find-jobs",
          query: {
            ...searchParams,
            page: nextPage.toString(),
          },
        }}
        className="rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800"
      >
        Next
      </Link>
    </div>
  );
};

export default Pagination;
