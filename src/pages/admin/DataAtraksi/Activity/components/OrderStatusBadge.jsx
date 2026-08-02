const statusStyles = {
  pending: "bg-blue-500/20 text-blue-900",
  failed: "bg-red-500/20 text-red-900",
  success: "bg-green-500/20 text-green-900",
};

const OrderStatusBadge = ({ status }) => {
  return (
    <div className="w-max">
      <div
        className={`relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none py-1 px-2 text-xs rounded-md ${
          statusStyles[status] || ""
        }`}
      >
        <span>{status}</span>
      </div>
    </div>
  );
};

export default OrderStatusBadge;
