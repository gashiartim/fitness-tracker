import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="mb-4 text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mb-8">The page you're looking for doesn't exist.</p>
      <Link to="/" className="text-blue-500 hover:underline">
        Go back to home
      </Link>
    </div>
  );
}
