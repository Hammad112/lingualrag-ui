declare module 'rtl-detect' {
  export function isRTLText(text: string): boolean;
  export function isRTLChar(char: string): boolean;
  export function isRTLLang(lang: string): boolean;
  export function getPrimaryLanguage(lang: string): string;
  const isRTL: {
    isRTLText: (text: string) => boolean;
    isRTLChar: (char: string) => boolean;
    isRTLLang: (lang: string) => boolean;
    getPrimaryLanguage: (lang: string) => string;
  };
  export default isRTL;
}
