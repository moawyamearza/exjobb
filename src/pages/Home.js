import { Link } from "react-router-dom";

const Home = () => {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to My Webshop</h1>
      <p className="text-lg text-gray-700 mb-6">Find the best products at unbeatable prices.</p>


      <div className="flex space-x-4">

        <Link to="/checkout">
          <button>
            Check Out
          </button>
        </Link>

       
      </div>
    </div>
  );
};

export default Home;
