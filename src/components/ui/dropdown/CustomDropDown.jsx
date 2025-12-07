import { ChevronDownIcon } from "@/icons";
import React, { useState } from "react";
import { DropdownMenu } from "./DropdownMenu";
import { DropdownItem } from "./UiDropdownItem";
import Button from "../button/Button";

const CustomDropDown = ({
    title = null,
    buttonVariant = "outline",
    buttonClass = "",
    menuClass = "",
    width = "260px",
    position = "right", // left | right
    items = [],
    header = null,
    footer = null,
    closeOnClick = true,
    trigger, // custom trigger component (optional)
    onItemClick = () => { },
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = (e) => {
        e.stopPropagation();
        setIsOpen((prev) => !prev);
    };

    const closeDropdown = () => setIsOpen(false);

    const handleItemClick = (item) => {
        if (item.onClick) item.onClick();
        onItemClick(item.value);
        if (closeOnClick) closeDropdown();
    };

    return (
        <div className="relative inline-block">
            {/* Custom Trigger OR Default Button */}
            {trigger ? (
                <div onClick={toggleDropdown}>{trigger}</div>
            ) : (
                <Button
                    onClick={toggleDropdown}
                    className={`flex items-center text-gray-700 dark:text-gray-400 ${buttonClass}`}
                    variant={buttonVariant}
                    title={title}
                    endIcon={
                        <ChevronDownIcon
                            className={`stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${isOpen ? "-rotate-180" : ""
                                }`}
                        />
                    }
                />
            )}

            <DropdownMenu
                isOpen={isOpen}
                onClose={closeDropdown}
                className={`absolute flex flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark ${menuClass}
          ${position === "right" ? "right-0" : "left-0"}`}
                style={{ width }}
            >
                {/* Optional Header */}
                {header && (
                    <div className="px-3 pb-2 text-sm font-medium text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-800">
                        {header}
                    </div>
                )}

                <ul className="flex flex-col gap-1 py-2">
                    {items?.length > 0 ? items?.map((item, idx) => (
                        <li key={idx}>
                            <DropdownItem
                                as={item.as || "button"}
                                href={item.href}
                                className={`
                  flex items-center gap-3 px-3 py-2 font-medium rounded-lg group text-theme-sm 
                  hover:bg-gray-100 hover:text-gray-700 
                  dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300
                  ${item.className || ""}
                `}
                                disabled={item.disabled}
                                onClick={() => handleItemClick(item)}
                                leftIcon={item.leftIcon}
                                rightIcon={item.rightIcon}
                            >
                                {item.label}
                            </DropdownItem>
                        </li>
                    )) : (
                        <li className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                            No items found
                        </li>
                    )}
                    { }
                </ul>

                {/* Optional Footer */}
                {footer && (
                    <div className="px-3 pt-2 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
                        {footer}
                    </div>
                )}
            </DropdownMenu>
        </div>
    );
};

export default CustomDropDown;
// import { ChevronDownIcon } from '@/icons';
// import React, { useState } from 'react'
// import { DropdownMenu } from './DropdownMenu';
// import { DropdownItem } from './UiDropdownItem';
// import Button from '../button/Button';

// const CustomDropDown = ({ title = null }) => {
//     const [isOpen, setIsOpen] = useState(false);


//     function toggleDropdown(e) {
//         e.stopPropagation();
//         setIsOpen((prev) => !prev);
//     }

//     function closeDropdown() {
//         setIsOpen(false);
//     }
//     return (
//         <div className="relative inline-block">
//             <Button
//                 onClick={toggleDropdown}
//                 className="flex items-center text-gray-700 dark:text-gray-400 dropdown-toggle"
//                 variant="outline"
//                 title={title}
//                 endIcon={<ChevronDownIcon
//                     className={`stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${isOpen ? "-rotate-180" : ""
//                         }`} />}
//             />
//             {/* {title && <span className="block mr-1 font-medium text-theme-sm">{title}</span>} */}



//             <DropdownMenu
//                 isOpen={isOpen}
//                 onClose={closeDropdown}
//                 className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
//             >

//                 <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
//                     <li>
//                         <DropdownItem
//                             as="button"
//                             onClick={closeDropdown}
//                             className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
//                         >
//                             sjdygfsjf
//                         </DropdownItem>
//                     </li>

//                 </ul>

//             </DropdownMenu>
//         </div>
//     )
// }

// export default CustomDropDown