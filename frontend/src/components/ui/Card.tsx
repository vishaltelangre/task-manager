import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};
const Card = ({ children, className = "" }: CardProps) => (
  <div
    className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-colors ${className}`}
  >
    {children}
  </div>
);

export default Card;
