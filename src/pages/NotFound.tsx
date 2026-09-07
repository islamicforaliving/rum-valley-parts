import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-surface px-6">
      <div className="text-center">
        <p className="font-display text-7xl font-700 text-accent">404</p>
        <h1 className="mt-2 font-display text-2xl font-700">Part not found</h1>
        <p className="mt-2 text-muted-foreground">
          The page you're looking for doesn't exist or has moved.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/" className="font-600 text-accent hover:underline">
            Return home
          </Link>
          <span className="text-border">·</span>
          <Link to="/catalog" className="font-600 text-accent hover:underline">
            Browse catalog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
