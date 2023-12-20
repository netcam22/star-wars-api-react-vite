import { useState, useEffect } from "react";
export interface FetchResponse<T> {
	data: T | null;
    isFetching: boolean;
	error: string;
}

export const useFetch = <T>(endPoint: string): FetchResponse<T> => {

    const [data, setData] = useState(null);
	const [error, setError] = useState("");
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
		const fetchData = async () => {
				const response = await fetch(endPoint);
                setIsFetching(false);
				if (response.status === 200) {
					const json = await response.json();
					setData(json);
					setError("");
				}
				else if (response.status === 500) {
					setError("Oops... something went wrong, try again 🤕");
				}
				else if (response.status === 418) {
					setError("I'm a tea pot, silly");
				}
		};
		fetchData();
	});
  
    return {data, error, isFetching};
  };
  
  export default useFetch;