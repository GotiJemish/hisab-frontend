import React from "react";

const BreadCrumb = () => {
  return (
    <div>
      <nav>
        <ol className="flex flex-wrap items-center gap-2">
          <li className="flex items-center gap-1.5">
            <a
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400"
              href="/"
            >
              Home
            </a>
          </li>
          <li className="flex items-center gap-1.5">
            <span className="text-gray-500 dark:text-gray-400">
              <span className="block w-1 h-1 bg-gray-400 rounded-full" />
            </span>
            <a
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400"
              href="/ui-kits"
            >
              UI Kits
            </a>
          </li>
          <li className="flex items-center gap-1.5">
            <span className="text-gray-500 dark:text-gray-400">
              <span className="block w-1 h-1 bg-gray-400 rounded-full" />
            </span>
            <span className="flex items-center gap-1 text-sm text-gray-800 dark:text-white/90">
              Avatar
            </span>
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default BreadCrumb;
