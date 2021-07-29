<template>
    <v-form
        v-model="isValid"
        class="white--text"
        @submit.prevent="submitHandler"
        ref="form"
    >
        <v-text-field
            v-model="form.email"
            class="login-page-text-field"
            outlined
            color="white"
            placeholder="Введите email"
            :rules="emailRules"
        >
            <template v-slot:label class="white--text">
                <span class="white--text">Email</span>
            </template>
        </v-text-field>

        <v-text-field
            v-model="form.password"
            type="password"
            class="login-page-text-field"
            outlined
            color="white"
            placeholder="Введите пароль"
            :rules="passwordRules"
            ref="passwordRef"
        >
            <template v-slot:label class="white--text">
                <span class="white--text">Пароль</span>
            </template>
        </v-text-field>

        <v-text-field
            v-model="repeatPassword"
            type="password"
            class="login-page-text-field"
            outlined
            color="white"
            placeholder="Введите пароль"
        >
            <template v-slot:label class="white--text">
                <span class="white--text">Подтвердите пароль</span>
            </template>
        </v-text-field>

        <v-btn
            class="ma-1 white--text"
            style="background-color: var(--sn-main-orange)"
            type="submit"
        >
            Войти
        </v-btn>

        <v-btn
            style="background-color: var(--sn-main-grey)"
            @click="$router.push('/login')"
        >
            Регистрация</v-btn
        >
    </v-form>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { validators } from '@/modules/validators';

interface IFormRegister {
    email: string;
    password: string;
    name: string;
    phone?: string;
}

@Component
export default class LoginPage extends Vue {
    isValid = false;
    form: IFormRegister = {
        email: '',
        password: '',
        name: '',
    };
    repeatPassword = '';

    emailRules = [
        validators.required('Введите email'),
        validators.isEmail('Email должен быть корректным'),
        validators.maxLength(40, 'Недопустимая длина email'),
    ];

    passwordRules = [
        validators.required('Введите пароль'),
        validators.minLength(6, 'Минимальная длина пароля 6 символов'),
        validators.shouldContain(
            this.repeatPassword,
            'Пароли должны совпадать'
        ),
    ];

    @Watch('repeatPassword')
    handleChangeRepeatPassword() {
        this.passwordRules.splice(
            this.passwordRules.length - 1,
            1,
            validators.shouldContain(
                this.repeatPassword,
                'Пароли должны совпадать'
            )
        );
        if (this.$refs.passwordRef && this.$refs.passwordRef.validate()) this.$refs.passwordRef.validate()
    }

    submitHandler() {
        console.log(this.form);
        console.log('isValid: ', this.isValid);
    }
}
</script>

<style>
.login-page-text-field .v-text-field__slot input {
    color: white !important;
}
.login-page-text-field .v-input__slot fieldset {
    border-color: white !important;
}
/*
.error--text * {
    color: yellow!important;
}
.error--text * {
    border-color: yellow!important;
}*/
</style>
