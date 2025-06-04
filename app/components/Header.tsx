"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Menu, X, Minus, Plus } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

const collapsibleData = [
  {
    title: "Categories",
    items: ["Face Makeup"],
  },
  {
    title: "Makeup",
    items: ["Face Makeup", "Lip Makeup", "Eye Makeup"],
  },
];

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [openStates, setOpenStates] = useState(collapsibleData.map(() => true));

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const toggleOpen = (index: number) => {
    setOpenStates((prev) =>
      prev.map((open, i) => (i === index ? !open : open))
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#3F3F3F] flex justify-between items-center pl-[24.0rem] pr-[5rem] py-[2.4rem]">
      <Link href="/products">
        <h1 className="text-[3.2rem] font-normal text-white">Hashtechy</h1>
      </Link>

      {isLoggedIn && (
        <div className="flex items-end gap-[2rem]">
          <Button
            variant="link"
            onClick={handleLogout}
            className="text-[3.2rem] cursor-pointer text-white"
          >
            Logout
          </Button>

          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <button className="text-white text-[2rem] ">
                <Menu className="text-white w-[2.4rem] h-[2.4rem] cursor-pointer" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[500px] bg-[#D6D6D6] p-0 top-[9.6rem]"
            >
              <SheetHeader className="px-8 py-[1.2rem]">
                <div className="flex items-center justify-between">
                  <SheetTitle className="text-[2rem] font-normal text-black">
                    Close Menu
                  </SheetTitle>
                  <button
                    onClick={() => setIsSheetOpen(false)}
                    className="text-black hover:text-gray-600 cursor-pointer"
                  >
                    <X className="w-[2.4rem] h-[2.4rem]" />
                  </button>
                </div>
              </SheetHeader>

              <div className="px-8">
                {collapsibleData.map((section, index) => (
                  <Collapsible
                    key={index}
                    open={openStates[index]}
                    onOpenChange={() => toggleOpen(index)}
                    className={!openStates[index] ? "mb-6" : "mb-6"}
                  >
                    <CollapsibleTrigger className="cursor-pointer flex items-center justify-between w-full text-left">
                      <span className="text-[2rem] font-normal text-[#000000]">
                        {section.title}
                      </span>
                      {openStates[index] ? (
                        <Minus className="w-[2.4rem] h-[2.4rem] font-normal" />
                      ) : (
                        <Plus className="w-[2.4rem] h-[2.4rem] font-normal" />
                      )}
                    </CollapsibleTrigger>

                    <CollapsibleContent className="mt-2 ml-4 space-y-3">
                      {section.items.map((item, i) => (
                        <button
                          key={i}
                          className="block text-[2rem] font-normal text-[#000000]"
                        >
                          {item}
                        </button>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      )}
    </header>
  );
};

export default Header;
