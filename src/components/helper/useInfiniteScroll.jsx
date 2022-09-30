import { useState, useEffect } from "react";

const useInfiniteScroll = (callback) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    callback();
  }, [isFetching]);

  // const scrollTop =
  //   (document.documentElement && document.documentElement.scrollTop) ||
  //   document.body.scrollTop;

  // const scrollHeight =
  //   (document.documentElement && document.documentElement.scrollHeight) ||
  //   document.body.scrollHeight;

  // if (scrollTop + window.innerHeight + 50 >= scrollHeight) {
  //   setIsFetching(true);
  // }

  // function handleScroll() {
  //   const scrollTop =
  //     (document.documentElement && document.documentElement.scrollTop) ||
  //     document.body.scrollTop;
  //   const scrollHeight =
  //     (document.documentElement && document.documentElement.scrollHeight) ||
  //     document.body.scrollHeight;
  //   if (scrollTop + window.innerHeight + 50 >= scrollHeight) {
  //     setIsFetching(true);
  //   }
  // }

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
  }

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;
