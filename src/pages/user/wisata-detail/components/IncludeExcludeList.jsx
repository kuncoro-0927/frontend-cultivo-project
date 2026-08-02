import { IoMdCheckmark, IoMdClose } from "react-icons/io";

const ListColumn = ({ label, items, icon, iconColorClass, emptyText }) => (
  <div className="grid justify-start mt-4 gap-4 max-w-4xl">
    <p className="font-semibold text-sm md:text-base text-hitam2">{label}</p>
    {items.length > 0 ? (
      items.map((item, index) => (
        <div key={index}>
          <div className="flex items-center gap-3 text-xl">
            <div className={iconColorClass}>{icon}</div>
            <div className="text-sm md:text-base grid">{item.trim()}</div>
          </div>
        </div>
      ))
    ) : (
      <p>{emptyText}</p>
    )}
  </div>
);

const IncludeExcludeList = ({ include, exclude }) => {
  const includeItems =
    typeof include === "string" && include.length > 0
      ? include.split(",")
      : [];
  const excludeItems =
    typeof exclude === "string" && exclude.length > 0
      ? exclude.split(",")
      : [];

  return (
    <div className="flex items-start gap-16 mt-2">
      <ListColumn
        label="TERMASUK"
        items={includeItems}
        icon={<IoMdCheckmark />}
        iconColorClass="text-green-500"
        emptyText="No include available"
      />
      <ListColumn
        label="TIDAK TERMASUK"
        items={excludeItems}
        icon={<IoMdClose />}
        iconColorClass="text-red-500"
        emptyText="No exclude available"
      />
    </div>
  );
};

export default IncludeExcludeList;
