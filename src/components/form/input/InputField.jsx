import React, { useEffect, useRef } from "react";
import Label from "../Label";
import flatpickr from 'flatpickr';

import { CalenderIcon } from "@/icons";
import 'flatpickr/dist/flatpickr.css';
const InputField = ({
  type = "text",
  id = "",
  name = "",
  placeholder = "",
  pastDays = null,
  onChange = () => { },
  className = "",
  min,
  max,
  step,
  disabled = false,
  success = false,
  error = false,
  hint,
  required = false,
  label = "",
  coverClass = "",
  hiddenLabel = false,
  stepHidden = false,
  defaultDate = null,     // <-- NEW
  allowPast = true,       // <-- NEW
  allowFuture = true,
  ...rest
}) => {
  const dateRef = useRef(null);
  /** --------------------------------------------------
   *  SETUP FLATPICKR WHEN TYPE === "date"
   * -------------------------------------------------- */
  useEffect(() => {
    if (type !== "date") return;

    const today = new Date();

    let config = {
      dateFormat: "d-m-Y",
      onChange: (selectedDates, dateStr) => {
        // Ensures the final value is always "YYYY-MM-DD"
        onChange({ target: { name, value: dateStr } });
      },
    };

    // Default Date
    if (defaultDate === "today") {
      config.defaultDate = today;
    } else if (defaultDate) {
      config.defaultDate = defaultDate;
    }

    // Past limit
    if (pastDays !== null) {
      const pastLimit = new Date();
      pastLimit.setDate(today.getDate() - pastDays);

      config.minDate = pastLimit;
      config.maxDate = today;
    }

    if (allowFuture === false && pastDays === null) {
      config.maxDate = today;
    }

    const fp = flatpickr(dateRef.current, config);
    return () => fp.destroy();
  }, [type, name, onChange, defaultDate, allowPast, allowFuture]);


  let coverClasses = ` ${coverClass}`;


  // Base classes (shared by all inputs)
  let baseClasses = `w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800`;

  // Type-specific classes
  const typeClasses = type === "textarea" ? "" : "h-11";

  // State classes (Only one applies)
  let stateClasses = "";
  if (disabled) {
    stateClasses = `text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
  } else if (error) {
    stateClasses = `text-error-800 border-error-500 focus:ring-3 focus:ring-error-500/10  dark:text-error-400 dark:border-error-500`;
  } else if (success) {
    stateClasses = `text-success-500 border-success-400 focus:ring-success-500/10 focus:border-success-300  dark:text-success-400 dark:border-success-500`;
  } else {
    stateClasses = `bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800`;
  }

  // Number input spin button hiding
  const numberStepClasses =
    type !== "number"
      ? ""
      : stepHidden
        ? "step-hidden" : "";

  // Merge all together
  let inputClasses = `${baseClasses} ${typeClasses} ${stateClasses} ${numberStepClasses} ${className}`;

  const InputComponent = type === "textarea" ? "textarea" : "input";
  return (
    <div className={coverClasses}>
      <Label
        htmlFor={id}
        required={required}
        label={label}
        isHidden={hiddenLabel}
      />
      <div className="relative">
        <InputComponent
          ref={type === "date" ? dateRef : null}
          type={type === "date" ? "text" : type}
          id={id}
          name={name}
          placeholder={placeholder}
          // defaultValue={defaultValue}
          onChange={type === "date" ? (selectedDates, dateStr) => {
            onChange({ target: { name, value: dateStr } });
          }
            : onChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={inputClasses}
          required={required}
          {...rest}
        />
        {/* Calendar Icon Only for Date */}
        {type === "date" && (
          <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
            <CalenderIcon className="size-6" />
          </span>
        )}
        {/* Optional Hint Text */}
        {hint && (
          <p
            className={`mt-1.5 text-xs ${error
              ? "text-error-500"
              : success
                ? "text-success-500"
                : "text-gray-500"
              }`}
          >
            {hint}
          </p>
        )}
      </div>
    </div>
  );
};

export default InputField;
