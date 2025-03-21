import { Plus } from "lucide-react";
import { Button } from "./button";
import Link from "next/link";

const PageTitle = ({
  title,
  createButtonLink,
  createButtonText,
  createButtonDisabled,
}: {
  title: string;
  createButtonLink: string;
  createButtonText: string;
  createButtonDisabled?: boolean;
}) => {
  return (
    <div className=" p-4  border-b flex justify-between items-center">
      <h1 className="text-2xl font-bold">{title}</h1>
      <Link href={createButtonLink}>
        <Button disabled={createButtonDisabled}>
          <Plus className="h-4 w-4" />
          {createButtonText}
        </Button>
      </Link>
    </div>
  );
};

export default PageTitle;
