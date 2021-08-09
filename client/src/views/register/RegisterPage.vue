<template>
    <v-form
        v-model="isValid"
        class="white--text"
        @submit.prevent="submitHandler"
        ref="formRef"
    >
        <v-text-field
            v-model="form.email"
            class="register-page-text-field"
            validate-on-blur
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
            v-model="form.name"
            class="register-page-text-field"
            validate-on-blur
            outlined
            color="white"
            placeholder="Введите имя"
            :rules="nameRules"
        >
            <template v-slot:label class="white--text">
                <span class="white--text">Имя</span>
            </template>
        </v-text-field>

        <v-text-field
            v-model="form.password"
            type="password"
            class="register-page-text-field"
            validate-on-blur
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
            class="register-page-text-field"
            outlined
            color="white"
            placeholder="Введите пароль"
        >
            <template v-slot:label class="white--text">
                <span class="white--text">Подтвердите пароль</span>
            </template>
        </v-text-field>

        <v-text-field
            v-model="form.phone"
            type="text"
            class="register-page-text-field"
            validate-on-blur
            outlined
            color="white"
            placeholder="Введите телефон"
            hint="(необязательно)"
            v-mask="'+7 (###) ###-##-##'"
            :rules="phoneRules"
        >
            <template v-slot:label class="white--text">
                <span class="white--text">Телефон(необязательно)</span>
            </template>
        </v-text-field>

        <v-btn
            class="ma-1 white--text"
            style="background-color: var(--sn-main-grey)"
            @click="$router.push('/login')"
        >
            вернуться
        </v-btn>

        <v-btn style="background-color: var(--sn-main-orange)" type="submit">
            Зарегестрироваться</v-btn
        >
    </v-form>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { validators } from '@/modules/validators';
import { VForm } from '@/types/VForm';
import { IFormRegister } from '@/types/user';
import { mapActions } from 'vuex';
import { ActionTypes } from '@/store/types';

@Component
export default class RegisterPage extends Vue {
    isValid = false;
    form: IFormRegister = {
        email: '',
        password: '',
        name: '',
        phone: '',
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

    nameRules = [
        validators.required('Необходимо ввести имя'),
        validators.minLength(2, 'Минимум 2 символа'),
    ];

    phoneRules = [validators.minLength(18, 'Укажите корректный телефон')];

    get passwordRef(): VForm {
        return this.$refs.passwordRef as VForm;
    }

    get formRef(): VForm {
        return this.$refs.formRef as VForm;
    }

    @Watch('repeatPassword')
    handleChangeRepeatPassword(): void {
        this.passwordRules.splice(
            this.passwordRules.length - 1,
            1,
            validators.shouldContain(
                this.repeatPassword,
                'Пароли должны совпадать'
            )
        );
        this.passwordRef.validate();
    }

    async submitHandler(): Promise<void> {
        if (!this.isValid) {
            this.formRef.validate();
            return;
        }

        await this.$store.dispatch(ActionTypes.REGISTER, this.form);
        await this.$router.push('/');
    }
}
</script>

<style>
.register-page-text-field:not(.error--text) .v-text-field__slot input {
    color: white !important;
}
.register-page-text-field:not(.error--text) .v-input__slot fieldset {
    border-color: white !important;
}

.register-page-text-field.error--text * {
    color: var(--sn-main-red) !important;
}
</style>
