import React from "react";
import { Search, ShoppingCart, User } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface HeaderProps {
  logoText?: string;
  cartItemCount?: number;
  onSearchSubmit?: (searchTerm: string) => void;
  onCartClick?: () => void;
  onProfileClick?: () => void;
}

const Header = ({
  logoText = "Детский Гардероб",
  cartItemCount = 0,
  onSearchSubmit = () => {},
  onCartClick = () => {},
  onProfileClick = () => {},
}: HeaderProps) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(searchTerm);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <a
            href="/"
            className="text-2xl font-bold text-pink-600 hover:text-pink-700 transition-colors"
          >
            {logoText}
          </a>
        </div>

        {/* Search */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex flex-1 max-w-md mx-4"
        >
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Поиск детской одежды..."
              className="pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              className="absolute right-0 top-0"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </form>

        {/* Navigation */}
        <div className="flex items-center space-x-4">
          {/* Cart */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onCartClick}
            className="relative"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Button>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onProfileClick}>
                Личный кабинет
              </DropdownMenuItem>
              <DropdownMenuItem>Мои заказы</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Избранное</DropdownMenuItem>
              <DropdownMenuItem>Выйти</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <form onSubmit={handleSearchSubmit} className="flex w-full">
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Поиск детской одежды..."
              className="pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              className="absolute right-0 top-0"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </header>
  );
};

export default Header;
