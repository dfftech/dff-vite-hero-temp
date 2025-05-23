import React from "react";
import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
} from "@heroui/navbar";

import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";
import TypeButton from "@/types/type.button";

export const Navbar = ({ onToggle }: { onToggle: () => void }) => {
  return (
    <>
      <HeroUINavbar maxWidth="xl" position="sticky">
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand className="gap-3 max-w-fit">
            <Link
              className="flex justify-start items-center gap-1"
              color="foreground"
              href="/"
            >
              <Logo />
              <p className="font-bold text-inherit">ACME</p>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="basis-1 pl-4" justify="end">
          <ThemeSwitch />
          <div className="block xl:hidden">
            <TypeButton
              action="default"
              label=""
              name="Menu"
              onPress={onToggle}
            />
          </div>

          {/* <NavbarMenuToggle
            className="block lg:hidden"
            onClick={(e) => {
              e.isPropagationStopped();
              onToggle();
            }}
          /> */}
        </NavbarContent>

        {/* <NavbarMenu >
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>

      </NavbarMenu> */}
      </HeroUINavbar>
    </>
  );
};
