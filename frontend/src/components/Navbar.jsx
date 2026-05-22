import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4">

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

        <h1 className="text-3xl font-bold text-center md:text-left">
          SplitSmart
        </h1>

        <div className="flex flex-wrap justify-center gap-3">

          {!token ? (

            <>
              <Link
                to="/login"
                className="bg-white text-blue-600 px-4 py-2 rounded"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-white text-blue-600 px-4 py-2 rounded"
              >
                Register
              </Link>
            </>

          ) : (

            <>
              <Link
                to="/"
                className="bg-white text-blue-600 px-4 py-2 rounded"
              >
                Dashboard
              </Link>

              <Link
                to="/add-expense"
                className="bg-white text-blue-600 px-4 py-2 rounded"
              >
                Add Expense
              </Link>

              <Link
                to="/expenses"
                className="bg-white text-blue-600 px-4 py-2 rounded"
              >
                Expenses
              </Link>

              <Link
                to="/settlement"
                className="bg-white text-blue-600 px-4 py-2 rounded"
              >
                Settlement
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </>

          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;