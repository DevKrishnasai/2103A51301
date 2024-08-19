import { Button } from "./ui/button";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onChange: (newPage: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onChange,
}) => {
  return (
    <div className="pagination">
      <Button
        disabled={currentPage <= 1}
        onClick={() => onChange(currentPage - 1)}
      >
        Previous
      </Button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <Button
        disabled={currentPage >= totalPages}
        onClick={() => onChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
