const ContactInfo = () => {
  return (
    <div className="p-4 w-full">
      <div>
        <p className="font-bold">Email Support</p>
        <p className="text-sm mt-1 text-gray-800">
          Butuh bantuan? Email kami dan kami akan segera membantu!
        </p>
        <p className="text-sm font-bold underline mt-2">
          official.cultivo@gmail.com
        </p>
        <h1 className="border-b mt-5"></h1>
      </div>

      <div className="mt-5">
        <p className="font-bold">Alamat Kami</p>
        <p className="text-sm mt-1">Malang, Jawa Timur</p>
        <h1 className="border-b mt-5"></h1>
      </div>
    </div>
  );
};

export default ContactInfo;
