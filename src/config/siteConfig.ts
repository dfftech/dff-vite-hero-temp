// src/config/siteConfig.ts

import { IconName } from "@/types/type.icon";

// Define the MenuItem type here and export it
export type MenuItem = {
  label: string;
  href: string;
  icon?: IconName;
  permissions?: {
    read: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  children?: MenuItem[];
};

// Export the siteConfig object
export const siteConfig: { navMenuItems: MenuItem[] } = {
  navMenuItems: [
    {
      label: "Home",
      href: "/",
      icon: "LayoutDashboard",
      permissions: {
        read: true,
        create: false,
        update: false,
        delete: false,
      },
    },
    {
      label: "Account",
      href: "/account",
      icon: "User",
      permissions: {
        read: true,
        create: true,
        update: true,
        delete: false,
      },
      children: [
        {
          label: "Profile",
          href: "/account/profile",
          icon: "User",
          permissions: {
            read: true,
            create: true,
            update: true,
            delete: false,
          },
        },
        {
          label: "Settings",
          href: "/account/settings",
          icon: "Settings",
          permissions: {
            read: false, // Example: this item won't show
            create: true,
            update: true,
            delete: false,
          },
        },
        {
          label: "Security",
          href: "/account/security",
          icon: "Lock",
          permissions: {
            read: true,
            create: true,
            update: true,
            delete: false,
          },
        },
      ],
    },
    {
      label: "Admin",
      href: "/admin",
      icon: "Shield",
       permissions: {
        read: true,
        create: true,
        update: true,
        delete: true,
      },
      children: [
        {
          label: "Users",
          href: "/admin/users",
          icon: "Users",
          permissions: {
            read: true,
            create: true,
            update: true,
            delete: true,
          },
        },
        {
          label: "Roles",
          href: "/admin/roles",
          icon: "Tag",
          permissions: {
            read: false, // Example: this child won't show
            create: true,
            update: true,
            delete: true,
          },
        },
        {
          label: "Permissions",
          href: "/admin/permissions",
          icon: "Key",
          permissions: {
            read: true,
            create: true,
            update: true,
            delete: true,
          },
        },
      ],
    },
  ],
}; 