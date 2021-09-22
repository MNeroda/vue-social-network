<template>
    <v-form
        v-model="isValid"
        class="white--text"
        @submit.prevent="submitHandler"
        ref="formRef"
    >
        <v-text-field
            v-model="form.email"
            class="login-page-text-field"
            validate-on-blur
            outlined
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
            validate-on-blur
            outlined
            color="white"
            placeholder="Введите пароль"
            :rules="passwordRules"
        >
            <template v-slot:label class="white--text">
                <span class="white--text">Пароль</span>
            </template>
        </v-text-field>

        <v-btn
            class="ma-1 white--text bg-orange"
            type="submit"
            :disabled="isLoading"
        >
            Войти
        </v-btn>

        <v-btn class="bg-grey" @click="$router.push('/register')">
            Создать профиль</v-btn
        >
    </v-form>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { validators } from '@/modules/validators';
import { IFormLogin } from '@/types/user';
import { ActionTypes } from '@/store/types';
import { VForm } from '@/types/VForm';

@Component
export default class LoginPage extends Vue {
    isValid = false;
    isLoading = false;
    form: IFormLogin = {
        email: '',
        password: '',
    };

    login!: (form: IFormLogin) => Promise<void>;

    emailRules = [
        validators.required('Введите email'),
        validators.isEmail('Email должен быть корректным'),
        validators.maxLength(40, 'Недопустимая длина email'),
    ];

    passwordRules = [
        validators.required('Введите пароль'),
        validators.minLength(6, 'Минимальная длина пароля 6 символов'),
    ];

    get formRef(): VForm {
        return this.$refs.formRef as VForm;
    }

    async test() {
        await this.$store.dispatch(ActionTypes.REFRESH_TOKEN);
    }

    async submitHandler() {
        if (!this.isValid) {
            this.formRef.validate();
            return;
        }
        this.isLoading = true;
        await this.$store.dispatch(ActionTypes.LOGIN, this.form);
        this.isLoading = false;
        await this.$router.push('/');
    }
}
</script>

<!--
    Из-за отсутствия опций по измениению цветов во vuetify приходится извращаться таким способом
    Если возникнет необходимость сделать подобное в другом компоненте, то там к инпуту добавить уникальный класс
    и в дальнейшем прописывать стили как для класса login-page-text-field


    к тому же текущий блок стилей невозможно сделать scoped из-за того, что необходимо передавать стили во vuetify компоненты
    Если возникнет нужда написать класы не предназначенные для инпутов рекомендуемо
    создать еще один блок <style> и сделать его scoped.
-->
<style lang="scss">
.login-page-text-field:not(.error--text) .v-text-field__slot input {
    color: white !important;
}
.login-page-text-field:not(.error--text)
    .v-input__control
    .v-input__slot
    fieldset {
    border-color: white !important;
}

.login-page-text-field.error--text * {
    color: $sn-main-red !important;
}
</style>
