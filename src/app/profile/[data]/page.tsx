const page = ({ params }: any) => {
  return (
    <div className="min-h-screen bg-slate-900 flex justify-center items-center">
      <h1 className="text-white bg-blue-800">{params.data}</h1>
    </div>
  );
};

export default page;
