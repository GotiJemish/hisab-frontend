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
      style={{
        transform: props?.selectProps?.menuIsOpen
          ? "rotate(180deg)"
          : "rotate(0deg)",
        transition: "transform 0.2s ease-in-out",
        color: props?.selectProps?.menuIsOpen
          ? "var(--text-primary)"
          : "var(--text-secondary)",
      }}
    />
  </RSComponents.DropdownIndicator>
);

const SearchControl = (props) => (
  <RSComponents.Control {...props}>
    <span style={{ marginLeft: 8, display: "flex", alignItems: "center" }}>
      <SearchIcon />
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
  ...rest
}) => {
  let coverClasses = ` ${coverClass}`;
  const {
    minWidth: contMinWidth = "auto",
    maxWidth: contMaxWidth = "100%",
    width: contWidth = "100%",
  } = container || {};
  const {
    minWidth: menuMinWidth = "auto",
    maxWidth: menuMaxWidth = "100%",
    width: menuWidth = "100%",
  } = menu || {};
  const baseStyles = useMemo(
    () => ({
      container: (provided) => ({
        ...provided,
        minWidth: contMinWidth,
        maxWidth: contMaxWidth,
        width: contWidth,
      }),
      control: (provided, state) => ({
        ...provided,
        borderRadius: "8px",
        minHeight: "40px",
        cursor: "pointer",
        borderColor: validation?.isInvalid
          ? "var(--danger)"
          : state.isFocused
          ? "var(--primary)"
          : "var(--border-primary)",
        boxShadow: "none",
        "&:hover": {
          borderColor: validation?.isInvalid
            ? "var(--danger)"
            : "var(--primary)",
        },
      }),
      placeholder: (provided) => ({
        ...provided,
        color: "var(--text-secondary)",
        fontSize: "14px",
        lineHeight: "16px",
      }),
      input: (provided) => ({
        ...provided,
        color: "var(--text-primary)",
        fontSize: "14px",
        lineHeight: "16px",
      }),
      menu: (provided) => ({
        ...provided,
        minWidth: menuMinWidth,
        maxWidth: menuMaxWidth,
        width: menuWidth,
        zIndex: 9999,
        borderRadius: "6px",
        padding: "8px",
        backgroundColor: "var(--white)",
        boxShadow: "0 4px 12px var(--shadow-1)",
      }),
      menuList: (provided) => ({
        ...provided,
        padding: 0,
      }),
      option: (provided, state) => ({
        ...provided,
        padding: "8px 16px",
        borderRadius: "4px",
        cursor: "pointer",
        backgroundColor: state.isSelected
          ? "var(--primary-100)" // when selected
          : state.isFocused
          ? "var(--white)" // when hovered or keyboard-focused
          : "var(--white)",
        color: state.isSelected ? "var(--primary)" : "var(--text-primary)",
        "&:active": {
          backgroundColor: "var(--primary-100)",
          color: "var(--primary)",
        },
        "&:hover": {
          backgroundColor: "var(--primary-100)",
          color: "var(--primary)",
        },
      }),
    }),
    [
      contMinWidth,
      contMaxWidth,
      contWidth,
      menuMinWidth,
      menuMaxWidth,
      menuWidth,
      validation?.isInvalid,
    ]
  );
  const mergedStyles = useMemo(() => {
    const merged = { ...baseStyles };
    Object.entries(stylesOverride || {}).forEach(([key, overrideFn]) => {
      if (
        typeof overrideFn === "function" &&
        typeof baseStyles[key] === "function"
      ) {
        merged[key] = (provided, state) =>
          overrideFn(baseStyles[key](provided, state), state);
      } else {
        merged[key] = overrideFn;
      }
    });
    return merged;
  }, [baseStyles, stylesOverride]);

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
          className={`common-select-01 ${className}`.trim()}
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
          styles={mergedStyles}
          components={mergedComponents}
          menuPlacement={menuPlacement}
          menuIsOpen={menuIsOpen}
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
