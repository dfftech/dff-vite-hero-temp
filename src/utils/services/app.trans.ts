import { SessionLang } from "./app.event";

export const trans = (nameLang: { [key: string]: string }, defaultName: string) => {
    const val = nameLang[SessionLang.value];
    return val === '' || val === undefined || val === null ? defaultName : val;
};