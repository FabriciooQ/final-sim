import { useEffect } from "react";
export default function useScrollToTop(ref, dependency){
    useEffect(()=>{
            console.log("siqwe")

        if (ref.current){
            console.log("si")
            ref.current.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        }
    },[dependency, ref])
}