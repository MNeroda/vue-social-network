export const validators = {
    isEmail: (textError: string) => (v: string) =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || textError,
    required: (textError: string) => (v: string) => !!v || textError,
    minLength: (minLength: number, textError: string) => (v: string) =>
        v.length >= minLength || textError,
    maxLength: (maxLength: number, textError: string) => (v: string) =>
        v.length <= maxLength || textError,
    shouldContain:
        (shouldContain: string, textError: string) => (v: string) => {
            console.log('sc: ', shouldContain);
            return v === shouldContain || textError;
        },
};
