import React from "react";
import { ChevronRight } from "lucide-react";
import { useLocale } from "next-intl";

type ShareViaPlatformButtonType = {
  handleClick?: () => void;
  title?: string;
};

export const ShareViaPlatformButton: React.FC<ShareViaPlatformButtonType> = (
  props,
) => {
  const lang = useLocale();
  return (
    <div
      onClick={props.handleClick}
      className="flex cursor-pointer flex-row justify-between rounded p-4 transition-all hover:bg-gray-100"
    >
      <span>{props.title}</span>
      <ChevronRight className={lang === "ar" ? "rotate-180" : ""} />
    </div>
  );
};
