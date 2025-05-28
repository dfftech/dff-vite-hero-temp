import { useEffect, useState } from "react";
import { Sidebar as ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import React from "react";
import { effect } from "@preact/signals";

import { CurrentTheme } from "./theme-switch";

import { RouterChange } from "@/utils/app.event";
import { TypeIcon } from "@/types/type.icon";
import { AppRouter } from "@/utils/app.router";
import TypeButton from "@/types/type.button";

type Theme = "light" | "dark";

type MenuItem = {
  label: string;
  href: string;
  icon?: string;
  permissions?: {
    read: boolean;
    write: boolean;
    delete: boolean;
  };
  children?: MenuItem[];
};

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const Sidebar = ({
  isOpen = false,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const [theme, setTheme] = React.useState<Theme>("dark");
  const [toggled, setToggled] = useState(isOpen);

  useEffect(() => {
    setToggled(isOpen);
  }, [isOpen]);

  const handleToggle = () => {
    setToggled(!toggled);
    onToggle();
  };

  useEffect(() => {
    effect(() => setTheme(CurrentTheme.value === "light" ? "light" : "dark"));
  }, []);

  function handleMenu(href: string): void {
    RouterChange(href, {});
  }

  return (
    <ProSidebar
      backgroundColor={hexToRgba(themes[theme].sidebar.backgroundColor, 0.5)}
      breakPoint="xl"
      className="h-[calc(100vh-88px)] overflow-y-auto"
      rootStyles={{
        color: themes[theme].sidebar.color,
        backgroundColor: themes[theme].sidebar.backgroundColor,
        border: "0px solid #99a1af",
        borderRadius: "0 rem",
      }}
      toggled={isOpen}
      onBackdropClick={handleToggle}
    >
      <SidebarHeader />
      <Menu>
        {siteConfig.navMenuItems.map((item, index) => (
          item.children ? (
            <SubMenu
              key={`${item.label}-${index}`}
              label={item.label}
            >
              {item.children.map((child, childIndex) => (
                <MenuItem
                  key={`${child.label}-${childIndex}`}
                  onClick={() => handleMenu(child.href)}
                >
                  {child.label}
                </MenuItem>
              ))}
            </SubMenu>
          ) : (
            <MenuItem
              key={`${item.label}-${index}`}
              onClick={() => handleMenu(item.href)}
            >
              {item.label}
            </MenuItem>
          )
        ))}
      </Menu>
    </ProSidebar>
  );
};

function SidebarHeader() {
  return (
    <aside className="sticky top-0 z-10 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-700">
      <div className="sticky top-0 flex items-center justify-between p-4">
        <h2 className="text-lg font-semibold">Welcome</h2>
        <div className="-mr-6">
          <TypeButton
            action="default"
            label=""
            name="LogOut"
            variant="light"
            onPress={() => RouterChange(AppRouter.LOGIN)}
          />
        </div>
      </div>
    </aside>
  );
}

const themes = {
  light: {
    sidebar: {
      backgroundColor: "#F8FAFC",
      color: "#607489",
    },
    menu: {
      fontSize: "small",
      menuContent: "#fbfcfd",
      icon: "#0098e5",
      hover: {
        backgroundColor: "#c5e4ff",
        color: "#44596e",
      },
      disabled: {
        color: "#9fb6cf",
      },
    },
  },
  dark: {
    sidebar: {
      backgroundColor: "#000000",
      color: "#8ba1b7",
    },
    menu: {
      fontSize: "small",
      menuContent: "#082440",
      icon: "#59d0ff",
      hover: {
        backgroundColor: "#00458b",
        color: "#b6c8d9",
      },
      disabled: {
        color: "#3e5e7e",
      },
    },
  },
};

export const siteConfig = {
  navMenuItems: [
    {
      label: "Home",
      href: "/",
      permissions: {
        read: true,
        write: false,
        delete: false
      }
    },
    {
      label: "Account",
      href: "/account",
      permissions: {
        read: true,
        write: true,
        delete: false
      },
      children: [
        {
          label: "Profile",
          href: "/account",
          permissions: {
            read: true,
            write: true,
            delete: false
          }
        },
        {
          label: "Settings",
          href: "/account",
          permissions: {
            read: true,
            write: true,
            delete: false
          }
        },
        {
          label: "Security",
          href: "/account",
          permissions: {
            read: true,
            write: true,
            delete: false
          }
        }
      ]
    },
    {
      label: "Admin",
      href: "/admin",
      permissions: {
        read: true,
        write: true,
        delete: true
      },
      children: [
        {
          label: "Users",
          href: "/account",
          permissions: {
            read: true,
            write: true,
            delete: true
          }
        },
        {
          label: "Roles",
          href: "/account",
          permissions: {
            read: true,
            write: true,
            delete: true
          }
        },
        {
          label: "Permissions",
          href: "/account",
          permissions: {
            read: true,
            write: true,
            delete: true
          }
        }
      ]
    }
  ],
};
