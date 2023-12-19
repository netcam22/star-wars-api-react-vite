import { useState, useEffect } from "react";
import { isError } from './../helpers/is_error';

export interface FetchResponse<T> {
	data: T | null;
    isFetching: boolean;
}

export const useFetch = <T>(endPoint: string): FetchResponse<T> => {

    const [data, setData] = useState(null);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(endPoint);
                setIsFetching(false);
				if (response.status === 200) {
					const json = await response.json();
					setData(json);
				}
			} catch (error) {
                setIsFetching(false);
                console.log(isError(error) ? error.message : 'Unknown error!');
			}
		};
		fetchData();
	});
  
    return {data, isFetching};
  };
  
  export default useFetch;