export function Card({ className = "", children }) {
  return (
    <div className={`bg-white rounded-xl shadow-lg border border-green-100 ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ className = "", children }) {
  return <div className={`p-6 border-b border-gray-200 ${className}`}>{children}</div>;
}

export function CardContent({ className = "", children }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

export function CardFooter({ className = "", children }) {
  return <div className={`p-4 border-t border-gray-200 ${className}`}>{children}</div>;
}

