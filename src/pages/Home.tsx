import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Create Professional Resumes with AI
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Build stunning resumes and cover letters that stand out using our AI-powered platform
        </p>
        <Link
          to="/resume-builder"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Get Started
        </Link>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 py-12">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">AI-Powered Templates</h3>
          <p className="text-gray-600">
            Choose from dozens of professionally designed templates optimized for ATS
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Smart Suggestions</h3>
          <p className="text-gray-600">
            Get real-time suggestions to improve your resume content
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Easy Customization</h3>
          <p className="text-gray-600">
            Customize fonts, colors, and layouts with our intuitive editor
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 p-12 rounded-xl text-center mt-12">
        <h2 className="text-3xl font-bold mb-4">Ready to Build Your Resume?</h2>
        <p className="text-gray-600 mb-8">
          Join thousands of job seekers who have successfully landed their dream jobs
        </p>
        <div className="space-x-4">
          <Link
            to="/register"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Sign Up Free
          </Link>
          <Link
            to="/login"
            className="text-blue-600 px-6 py-2 rounded-lg font-semibold hover:text-blue-700 transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
