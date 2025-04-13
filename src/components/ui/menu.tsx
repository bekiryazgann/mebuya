import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Menu component
export const Menu = ({ children }: { children: React.ReactNode }) => {
  return <DropdownMenu>{children}</DropdownMenu>;
};

// MenuButton component
export const MenuButton = ({
  as: Component = Button,
  children,
  ...props
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  [key: string]: any;
}) => {
  return (
    <DropdownMenuTrigger asChild>
      <Component {...props}>{children}</Component>
    </DropdownMenuTrigger>
  );
};

// MenuList component
export const MenuList = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) => {
  return (
    <DropdownMenuContent className={className} {...props}>
      {children}
    </DropdownMenuContent>
  );
};

// MenuItem component
export const MenuItem = ({
  children,
  className,
  onClick,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  [key: string]: any;
}) => {
  return (
    <DropdownMenuItem className={className} onClick={onClick} {...props}>
      {children}
    </DropdownMenuItem>
  );
};