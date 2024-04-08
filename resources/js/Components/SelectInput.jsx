import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ options = [], className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <select
            {...props}
            className={
                'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                className
            }
            ref={input}
        >
            <option value="">{props?.placeholder}</option>
            {options?.map((option, index) => (
                <option key={index} value={option?.value}>
                    {option?.label}
                </option>
            ))}
        </select>
    );
});
