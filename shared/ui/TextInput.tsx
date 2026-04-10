"use client";
import { useState } from "react";
import IconCapsLock from "../icons/IconCapsLock";
import IconEye from "../icons/IconEye";
import IconEyeOff from "../icons/IconEyeOff";

interface TextInputProps {
  label: string;
  name: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  isCapslockOn?: boolean;
  error?: string;
  ref?: React.Ref<HTMLInputElement>;
}

function TextInput({
  label,
  name,
  value,
  onChange,
  onBlur,
  className,
  defaultValue,
  isCapslockOn,
  error,
  ref,
}: TextInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = (e: React.MouseEvent) => {
    // Prevent the button from taking focus away from the input
    e.preventDefault();
    setIsPasswordVisible((prev) => !prev);
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // If the new focus target is still inside this div, don't trigger blur
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsFocused(false);
    }
  };

  return (
    <div
      className="flex flex-col gap-1.5 relative group"
      onFocus={() => setIsFocused(true)}
      onBlur={handleBlur}
    >
      <label htmlFor={name} className="label">
        {label}
      </label>

      <input
        id={name}
        name={name}
        // Switch types based on visibility state
        type={
          name === "password" && isPasswordVisible
            ? "text"
            : name === "password"
              ? "password"
              : "text"
        }
        ref={ref}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`text-input body-m ${error ? "border-red-500" : ""} ${className ?? ""}`}
        defaultValue={defaultValue}
        aria-invalid={!!error}
      />

      {/* Caps Lock Indicator */}
      {isCapslockOn && name === "password" && (
        <IconCapsLock
          className="w-4 h-4 absolute right-12 top-9 pointer-events-none"
          aria-label="Caps lock"
        />
      )}

      {/* Password Toggle Button */}
      {name === "password" && isFocused && (
        <button
          type="button" // Important: prevents form submission
          className="w-5 h-4 absolute right-4 top-9 hover:cursor-pointer flex items-center justify-center"
          onClick={togglePasswordVisibility} // Use onMouseDown to catch it before Blur fires
          aria-label={isPasswordVisible ? "Hide password" : "Show password"}
        >
          {isPasswordVisible ? (
            <IconEyeOff className="pointer-events-none" />
          ) : (
            <IconEye className="pointer-events-none" />
          )}
        </button>
      )}

      {error && (
        <span className="text-red-500 text-xs absolute top-9 right-17">
          {error}
        </span>
      )}
    </div>
  );
}

export default TextInput;
