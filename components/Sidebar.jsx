//peptides\components\Sidebar.jsx
"use client";

import { CATEGORY_GROUPS } from "../data/categories";

export default function Sidebar() {
  return (
    <aside className="text-sm space-y-10 max-h-[650px] overflow-y-auto pr-2 border-r border-gray-200 lg:block">

      {CATEGORY_GROUPS.map((group) => (
        <div key={group.title}>
          <h3 className="text-bioGreen font-semibold mb-2">{group.title}</h3>
          <ul className="space-y-1.5">
            {group.items.map((item) => (
              <li
                key={item}
                className="text-gray-700 hover:text-bioBlue cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="bg-white border border-gray-200 rounded-lg p-4 text-xs text-gray-600">
        <p className="font-semibold text-gray-800 mb-1">Research Use Only</p>
        <p>All BioPeptide products are strictly for laboratory research use.</p>
      </div>

    </aside>
  );
}
