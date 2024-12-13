"use client";

import Image from "next/image";
import { useState } from "react";

const RefreshButton = ({ onRefresh }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const handleRefresh = () => {
    setIsRefreshing(true);
    onRefresh();

    const timeoutId = setTimeout(() => {
      setIsRefreshing(false);
    }, 500);

    return () => clearTimeout(timeoutId);
  };
  return (
    <span>
      {isRefreshing ? (
        <Image
          src={"/assets/icons/loader.svg"}
          alt="loading"
          width={20}
          height={20}
          className="object-contain rounded-lg"
        />
      ) : (
        <div onClick={handleRefresh}>
          <Image
            src={"/globe.svg"}
            alt="refresh button"
            width={20}
            height={20}
            className="object-contain rounded-lg"
          />
        </div>
      )}
    </span>
  );
};

export default RefreshButton;
