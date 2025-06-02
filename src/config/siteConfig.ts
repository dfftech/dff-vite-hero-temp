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
export const siteConfig: { navMenuItems: MenuItem[] } = {
  navMenuItems: [
    {
      name: "Home",
      nameLang: {
        "en-US": "Home",
        "te-IN": "హోమ్",
        "ar-SA": "الرئيسية"
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
        "ar-SA": "الحساب"
      },
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
          name: "Profile",
          nameLang: {
            "en-US": "Profile",
            "te-IN": "ప్రొఫైల్",
            "ar-SA": "الملف الشخصي"
          },
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
          name: "Settings",
          nameLang: {
            "en-US": "Settings",
            "te-IN": "సెట్టింగ్స్",
            "ar-SA": "الإعدادات"
          },
          href: "/account/settings",
          icon: "Settings",
          permissions: {
            read: false,
            create: true,
            update: true,
            delete: false,
          },
        },
        {
          name: "Security",
          nameLang: {
            "en-US": "Security",
            "te-IN": "భద్రత",
            "ar-SA": "الأمان"
          },
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
      name: "Admin",
      nameLang: {
        "en-US": "Admin",
        "te-IN": "నిర్వాహకుడు",
        "ar-SA": "المشرف"
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
          name: "Users",
          nameLang: {
            "en-US": "Users",
            "te-IN": "వినియోగదారులు",
            "ar-SA": "المستخدمون"
          },
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
          name: "Roles",
          nameLang: {
            "en-US": "Roles",
            "te-IN": "పాత్రలు",
            "ar-SA": "الأدوار"
          },
          href: "/admin/roles",
          icon: "Tag",
          permissions: {
            read: false,
            create: true,
            update: true,
            delete: true,
          },
        },
        {
          name: "Permissions",
          nameLang: {
            "en-US": "Permissions",
            "te-IN": "అనుమతులు",
            "ar-SA": "الصلاحيات"
          },
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