import { ChevronDownIcon, SearchIcon } from "@/icons";
import Label from "./Label";
import React, { memo, useMemo } from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { components as RSComponents } from "react-select";

const DropdownIndicator = (props) => (
  <RSComponents.DropdownIndicator {...props}>
    <ChevronDownIcon
      className={`w-4 h-4 transition-transform ${
        props?.selectProps?.menuIsOpen ? "rotate-180" : ""
      }`}
    />
  </RSComponents.DropdownIndicator>
);

const SearchControl = (props) => (
  <RSComponents.Control {...props}>
    <span className="ml-2 flex items-center">
      <SearchIcon className="w-4 h-4" />
    </span>
    {props.children}
  </RSComponents.Control>
);

const CustomSelect = ({
  id = "",
  className = "",
  isSearchInput = false,
  isClearable = false,
  isSearchable = true,
  disabled = false,
  isLoading = false,
  defaultValue = null,
  value = null,
  placeholder = "",
  options = [],
  loadOptions,
  defaultOptions = true,
  cacheOptions = true,
  name = "",
  onChange = () => {},
  menuPlacement = "auto",
  menuIsOpen,
  label = "",
  coverClass = "",
  hiddenLabel = false,
  classNames: classNamesOverride = {},
  hint,
  required = false,
  ...rest
}) => {
  const mergedClassNames = useMemo(() => {
    return {
      control: ({ isDisabled, isFocused }) =>
        `flex h-11 rounded-lg border px-3 py-1.5  
          bg-white dark:bg-gray-900 shadow-theme-xs transition 
${isDisabled ? "opacity-50 cursor-not-allowed bg-gray-100" : "cursor-pointer"}
${
  isFocused
    ? "shadow-focus-ring border-brand-300 dark:border-brand-800 ring-3 ring-brand-500/10"
    : "border-gray-300 dark:border-gray-700"
}`,
      valueContainer: () => "flex items-center gap-2 text-sm",
      input: () =>
        "text-sm bg-transparent text-gray-800 dark:text-gray-200 caret-brand-500",
      placeholder: () => "text-gray-500 dark:text-gray-400 text-sm",
      singleValue: () => "text-gray-800 dark:text-gray-200 text-sm",
      menu: () =>
        "bg-white dark:bg-gray-900 mt-1 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden",
      menuList: () => "p-2 max-h-60 overflow-y-auto",
      option: ({ isSelected, isFocused }) =>
        `px-3 py-2 text-sm cursor-pointer rounded-lg 
          ${
            isSelected
              ? "bg-brand-100 text-brand-700 dark:bg-brand-800/30 dark:text-white/90"
              : isFocused
              ? "bg-gray-100 dark:bg-gray-800 dark:text-white/90"
              : "text-gray-700 dark:text-gray-200"
          }`,
      dropdownIndicator: () =>
        "px-2 text-gray-600 dark:text-gray-300 flex items-center",
      clearIndicator: () => "px-2 text-gray-500 hover:text-red-500",
      noOptionsMessage: () => "py-2 text-sm text-gray-400 text-center",
      ...classNamesOverride,
    };
  }, [classNamesOverride]);

  const mergedComponents = useMemo(() => {
    if (isSearchInput) {
      return {
        Control: SearchControl,
        DropdownIndicator: null,
        IndicatorSeparator: null,
      };
    }
    return {
      DropdownIndicator,
      IndicatorSeparator: null,
    };
  }, [isSearchInput]);

  const SelectComponent = loadOptions ? AsyncSelect : Select;

  return (
    <div className={coverClass}>
      <Label
        htmlFor={id}
        required={required}
        label={label}
        isHidden={hiddenLabel}
      />

      <SelectComponent
        className={className}
        classNamePrefix=""
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        isDisabled={disabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isSearchable={isSearchable}
        name={name}
        options={!loadOptions ? options : undefined}
        loadOptions={loadOptions}
        defaultOptions={loadOptions ? defaultOptions : undefined}
        cacheOptions={loadOptions ? cacheOptions : undefined}
        components={mergedComponents}
        menuPlacement={menuPlacement}
        menuIsOpen={menuIsOpen}
        classNames={mergedClassNames}
        unstyled
        {...rest}
      />

      {hint && (
        <p
          className={`mt-1.5 text-xs ${
            error
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
  );
};

export default memo(CustomSelect);
