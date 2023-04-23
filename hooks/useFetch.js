import { useEffect, useState } from "react";

//fiz esse hook separado pensando que já poderia ser usada futuramente para fazer fetch
function useFetch() {
    const [isReady, setIsReady] = useState(false);

    async function fetchData() {
        try {
            await new Promise(resolve => setTimeout(resolve, 3000));
              
        } catch (error) {
            alert("Something went wrong!");
            console.warn(error);
        } finally {
            
            setIsReady(true)
        }
    }

    useEffect(() => {
        fetchData();
    },[])

    return {isReady}
}

export default useFetch;