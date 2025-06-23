import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
} from "@heroui/navbar";
import { useSignals } from "@preact/signals-react/runtime";

import { AppTheme } from "@/utils/components/app-theme";
import { AppLang } from "@/utils/components/app-lang";
import { Logo } from "@/components/icons";
import TypeButton from "@/types/type.button";
import { SessionToken } from "@/utils/services/app.event";

export const Navbar = ({ onToggle }: { onToggle: () => void }) => {
  useSignals();

  return (
    <>
      <HeroUINavbar
        className="container mx-auto bg-white dark:bg-black"
        maxWidth="full"
        position="sticky"
      >
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
          <AppLang />
          <AppTheme />

          {SessionToken.value && (
            <div className="block xl:hidden">
              <TypeButton
                action="default"
                label=""
                name="Menu"
                onPress={onToggle}
              />
            </div>
          )}

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
          {siteConfig.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.length - 1
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
