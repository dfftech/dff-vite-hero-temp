// src/config/siteConfig.ts

import { IconName } from "@/types/type.icon";

// Define the MenuItem type here and export it
export type MenuItem = {
  name: string; // Default name (English)
  nameLang: {
    "en-US": string;
    "te-IN": string;
    "ar-SA": string;
  };
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
export const SiteConfig: MenuItem[] = [
  {
    name: "Home",
    nameLang: {
      "en-US": "Home",
      "te-IN": "హోమ్",
      "ar-SA": "الرئيسية",
    },
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
    name: "Account",
    nameLang: {
      "en-US": "Account",
      "te-IN": "ఖాతా",
      "ar-SA": "الحساب",
    },
    href: "/account",
    icon: "User",
    permissions: {
      read: true,
      create: true,
      update: true,
      delete: false,
    },
  },
  {
    name: "Admin",
    nameLang: {
      "en-US": "Admin",
      "te-IN": "నిర్వాహకుడు",
      "ar-SA": "المشرف",
    },
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
        name: "Profile",
        nameLang: {
          "en-US": "Profile",
          "te-IN": "ప్రఫైల్",
          "ar-SA": "الملف الشخصي",
        },
        href: "/profile",
        icon: "Users",
        permissions: {
          read: true,
          create: true,
          update: false,
          delete: false,
        },
      },
      {
        name: "Permissions",
        nameLang: {
          "en-US": "Permissions",
          "te-IN": "అనుమతులు",
          "ar-SA": "الصلاحيات",
        },
        href: "/permissions",
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
];
