const TopNavbar = () => {
    return (
      <div className="bg-white shadow-md w-full h-16 flex items-center justify-between px-8">
        <h1 className="text-xl font-semibold text-darkBlue">Welcome, Volunteer!</h1>
        <button className="bg-primary hover:bg-green-700 text-white py-2 px-4 rounded-lg">
          Logout
        </button>
      </div>
    );
  };
  
  export default TopNavbar;
  