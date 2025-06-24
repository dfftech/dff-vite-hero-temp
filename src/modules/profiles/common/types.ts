export type ProfileType = {
  id: string;
  nameLang: Record<string, string>;
  active: boolean;
  updatedAt: string;
};

export const profileInitValues: ProfileType = {
  id: "",
  nameLang: {},
  active: true,
  updatedAt: new Date().toISOString(),
};
