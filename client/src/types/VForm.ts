//https://stackoverflow.com/questions/52109471/typescript-in-vue-property-validate-does-not-exist-on-type-vue-element

export type VForm = Vue & {
    validate: () => boolean;
    resetValidation: () => boolean;
    reset: () => void;
};