"use client";
import { useState } from "react";
import IconCapsLock from "../icons/IconCapsLock";
import IconEye from "../icons/IconEye";
import IconEyeOff from "../icons/IconEyeOff";

interface TextInputProps {
  label: string;
  name: string;
  type: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  defaultValue?: string;
  isCapslockOn?: boolean;
  error?: string;
}

function TextInput({
  label,
  name,
  value,
  type,
  onChange,
  className,
  defaultValue,
  isCapslockOn,
  error,
}: TextInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = (e: React.MouseEvent) => {
    // Prevent the button from taking focus away from the input
    e.preventDefault();
    setIsPasswordVisible((prev) => !prev);
  };
  const handleBlur = (e: React.FocusEvent) => {
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
        type={type === "password" && isPasswordVisible ? "text" : type}
        value={value}
        onChange={onChange}
        className={`text-input body-m ${error ? "border-red-500" : ""} ${className ?? ""}`}
        defaultValue={defaultValue}
        aria-invalid={!!error}
      />

      {/* Caps Lock Indicator */}
      {isCapslockOn && type === "password" && (
        <IconCapsLock
          className="w-4 h-4 absolute right-12 top-9 pointer-events-none"
          aria-label="Caps lock"
        />
      )}

      {/* Password Toggle Button */}
      {type === "password" && isFocused && (
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

      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
}

export default TextInput;
