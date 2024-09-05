import LogOut from "../pages/LogOut";

const Header = () => {
  return (
    /* <header className="bg-blue-500 flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white">
      <div>
       <a href="/">Home</a>
      </div>
      <nav>
        <a href="/signup">Sign Up</a> | <LogOut />
      </nav>
    </header>
    */

    <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6 container">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-x1 tracking-tight">
          Password Manager
        </span>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <a href="/signup">Sign Up</a> | <LogOut />
        </div>
      </div>
    </nav>
  );
};

export default Header;
