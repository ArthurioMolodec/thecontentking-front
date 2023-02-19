<!-- Register.vue -->
<template>
    <div class="full-content">
        <div class="bg-image">
            <Header/>
            <div class="content">
                <v-container >
                    <h1 class="title">Sign up</h1>
                    <div class="login-content">
                        <v-form>
                            <Input label="Name" type="string" class="input-placeholder" />
                            <Input label="Email" type="email" class="input-placeholder" />
                            <Input label="Password" type="password" class="input-placeholder" />
                            <Input label="Conform password" type="password" class="input-placeholder" />
                            <Button name="Sign up"  />
                            <p class="have-account">
                                Already have an account?
                            </p>
                            <SignUpUsing />
                        </v-form>
                    </div>
                </v-container>
            </div>
            <Footer />
        </div>
    </div>
</template>

<script>
    import Header from '../components/Header';
    import Footer from '../components/Footer';
    import Input from '../components/general/Input'
    import Button from '../components/auth/Button'
    import SignUpUsing from '../components/auth/SignUpUsing'
    export default {
        components: {
            Button,
            Header,
            Input,
            SignUpUsing,
            Footer,
        },
    }
</script>

<style type="scss">
    main {
        padding-top: 0 !important;
    }

    .input-placeholder {
        color: #FFFFFF80;
        opacity: 1;
        margin-bottom: 25px;
    }

    .title {
        font-size: 96px;
        font-style: normal;
        color: #FFFFFF;
        text-align: center;
        margin-bottom: 70px;
        margin-top: 100px;
    }

    .login-content {
        width: 500px;
        margin: 0 auto;
        padding: 30px 20px;
        background-color: #2F2F2F;
        border-radius: 12px;
    }

    .have-account {
        margin-top: 17px;
        text-align: center;
        color: #ffffff;
        font-size: 16px;
        font-weight: 400;
    }
</style>