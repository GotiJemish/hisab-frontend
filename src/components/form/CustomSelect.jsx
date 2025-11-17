import { ChevronDownIcon, SearchIcon } from "@/icons";
import Label from "./Label";
import React, { memo, useMemo } from "react";
// import "./index.css";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { components as RSComponents } from "react-select";

const DropdownIndicator = (props) => (
  <RSComponents.DropdownIndicator {...props}>
    <ChevronDownIcon
      className={`stroke-current ${
        props?.selectProps?.menuIsOpen ? "rotate-180" : ""
      }`}
    />
  </RSComponents.DropdownIndicator>
);

const SearchControl = (props) => (
  <RSComponents.Control {...props}>
    <span style={{ marginLeft: 8, display: "flex", alignItems: "center" }}>
      <SearchIcon className="fill-current" />
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
  isDisabled = false,
  isLoading = false,
  isRtl = false,
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
  validation,
  styles: stylesOverride = {},
  components: componentsOverride,
  container = {},
  menu = {},
  hint,
  required = false,
  label = "",
  coverClass = "",
  hiddenLabel = false,
  classNames: classNamesOverride = {},
  ...rest
}) => {
  let coverClasses = ` ${coverClass}`;
  const mergedClassNames = useMemo(() => {
    return {
      control: () => "rs-control",
      menu: () => "rs-menu",
      menuList: () => "rs-menu-list",
      option: (state) =>
        `rs-option ${state.isSelected ? "selected" : ""} ${
          state.isFocused ? "focused" : ""
        }`,
      placeholder: () => "rs-placeholder",
      singleValue: () => "rs-single-value",
      indicatorsContainer: () => "rs-indicators",
      input: () => "rs-input",
      valueContainer: () => "rs-value-container",
      dropdownIndicator: () => "rs-dropdown-indicator",

      ...classNamesOverride,
    };
  }, [classNamesOverride]);

  const mergedComponents = useMemo(() => {
    if (isSearchInput) {
      return {
        Control: SearchControl,
        DropdownIndicator: null,
        IndicatorSeparator: null,
        ...(componentsOverride || {}),
      };
    }
    return {
      DropdownIndicator,
      IndicatorSeparator: null,
      ...(componentsOverride || {}),
    };
  }, [isSearchInput, componentsOverride]);

  const SelectComponent = loadOptions ? AsyncSelect : Select;

  return (
    <div className={coverClasses}>
      <Label
        htmlFor={id}
        required={required}
        label={label}
        isHidden={hiddenLabel}
      />

      <div className="custom-select-wrapper" style={{ width: "100%" }}>
        <SelectComponent
          className={className}
          classNamePrefix="select"
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          isDisabled={isDisabled}
          isLoading={isLoading}
          isClearable={isClearable}
          isRtl={isRtl}
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
          {...rest}
        />
        {/* Optional Hint Text */}
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
    </div>
  );
};

export default memo(CustomSelect);
