const StatCard = ({
  icon,
  iconBg,
  iconColor,
  label,
  value,
  todayLabel,
  todayColor,
}) => {
  return (
    <div className="border border-gray-200 shadow-md hover:-translate-y-2 duration-300 w-60 h-36 rounded-2xl px-5 p-5">
      <div className="text-sm flex items-center gap-4">
        <div
          className={`${iconBg} p-2 rounded-md ${iconColor} text-base font-extrabold`}
        >
          {icon}
        </div>
        <p className="font-semibold">{label}</p>
      </div>
      <p className="font-extrabold text-xl mt-3">{value}</p>
      <p className={`text-xs font-bold mt-5 ${todayColor}`}>{todayLabel}</p>
    </div>
  );
};

export default StatCard;
