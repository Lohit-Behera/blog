import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { generatePaginationLinks } from "./generatePaginationLinks";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useSearchParams } from "react-router-dom";

type PaginatorProps = {
  currentPage: number;
  totalPages: number;
  showPreviousNext: boolean;
};

export default function Paginator({
  currentPage,
  totalPages,
  showPreviousNext,
}: PaginatorProps) {
  const [_, setSearchParams] = useSearchParams();
  return (
    <Pagination>
      <PaginationContent>
        {showPreviousNext && totalPages ? (
          <PaginationItem>
            <Button
              variant={"ghost"}
              onClick={() =>
                setSearchParams((params) => {
                  params.set("page", `${currentPage - 1}`);
                  return params;
                })
              }
              disabled={currentPage === 1}
            >
              <ChevronLeftIcon className="h-4 w-4" />
              <span>Previous</span>
            </Button>
          </PaginationItem>
        ) : null}
        {generatePaginationLinks(currentPage, totalPages)}
        {showPreviousNext && totalPages ? (
          <PaginationItem>
            <Button
              variant={"ghost"}
              onClick={() =>
                setSearchParams((params) => {
                  params.set("page", `${currentPage + 1}`);
                  return params;
                })
              }
              disabled={currentPage === totalPages}
            >
              <span>Next</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </PaginationItem>
        ) : null}
      </PaginationContent>
    </Pagination>
  );
}