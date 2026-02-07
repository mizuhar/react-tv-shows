import { useState } from "react";
import { getStorageItem, setStorageItem } from "../data/utils";

export default function usePersistedState(key, defaultValue){

    const [state, setState] = useState(()=>{
        return getStorageItem(key) ?? defaultValue;
    });

    const setPersisted = (value)=>{
        setState(prev => {
            const newValue =
                typeof value === "function" ? value(prev) : value;

            setStorageItem(key, newValue);
            return newValue;
        });
    };

    return [state, setPersisted];
}
