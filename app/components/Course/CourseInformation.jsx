const CourseInformation = ({ dt }) => {
  const data = [
    { name: "Instructor" },
    { name: "Schedule" },
    { name: "Office" },
    { name: "Office Hours" },
    { name: "Telephone" },
  ];
  return (
    <div className="text-center container">
      <h1 className="text-3xl my-10 font-semibold">{dt.className}</h1>
      <div className="border w-fit p-8 mx-auto border-black">
        <div className="flex flex-col  lg:flex-row ">
          <div className="flex flex-col p-8 border border-black ">
            {data.map((info, i) => (
              <p  key={i} className="w-40 py-1 border mb-2 border-black">{info.name}</p>
            ))}
          </div>

          <div className="flex flex-col border border-black max-w-sm p-8">
            <p className="px-2 py-1">{dt.instructor}</p>
            <p className="px-2 py-1">{dt.schedule}</p>
            <p className="px-2 py-1">{dt.office}</p>
            <p className="px-2 py-1">{dt.time}</p>
            <p className="px-2 py-1">{dt.telephone}</p>
            <p className="px-2 py-1">{dt.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseInformation;
