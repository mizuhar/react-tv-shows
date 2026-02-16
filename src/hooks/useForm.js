import { useState, useEffect } from "react";

export default function useForm(submitHandler, initialValue){

    const [values, setValues] = useState(initialValue);

    useEffect(()=>{
        setValues(initialValue);
    }, [initialValue]);

    const onChange = (e)=>{
        const { name, value, type, checked, files } = e.target;

        setValues(state => ({
            ...state,
            [name]:
                type === "checkbox"
                    ? checked
                    : type === "file"
                    ? files
                    : value
        }));
    };

    const onSubmit = async (e)=>{
        e.preventDefault();

        if (!submitHandler) return;

        try {
            await submitHandler(values);
            setValues(initialValue);
            
        } catch (error) {
            console.error(error)
        }
        
    };

    const onReset = ()=>{
        setValues(initialValue);
    };

    return {
        values,
        setValues,
        onChange,
        onSubmit,
        onReset
    };
}
