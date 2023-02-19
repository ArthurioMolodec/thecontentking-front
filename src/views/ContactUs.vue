<!-- ContactUs.vue -->
<template>
    <div class="full-content">
        <div class="bg-image">
            <Header/>
            <div class="content">
                <v-container>
                    <h1 class="title">Contact Us</h1>
                    <div class="contact-us">
                        <p class="white-text mb-3">
                            We're here to help! Whether you have a question, concern, or just want to say hello, feel free to reach out to us using the information below.
                        </p>
                        <div class="mb-3">
                            <p>
                                Email: [Your email address]
                            </p>
                            <p>
                                Phone: [Your phone number]
                            </p>
                            <p>
                                Address: [Your company address]
                            </p>
                        </div>
                        <div class="mb-3">
                            <p>
                                Or, use the form below to send us a message directly.
                            </p>

                            <p>
                                [Form fields: Name, Email, Subject, Message]
                            </p>
                        </div>

                        <p>
                            Thank you for contacting us! We'll get back to you as soon as possible.
                        </p>
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
    export default {
        data() {
            return {
                email: '',
                password: '',
            }
        },
        components: {
            Header,
            Footer,
        },
    }
</script>

<style type="scss">
    main {
        padding-top: 0 !important;
    }

    .contact-us {
        width: 45%;
        text-align: center;
        margin: 0 auto;
        margin-top: 100px;
        color: white;
    }

    .input-placeholder {
        color: #FFFFFF80;
        opacity: 1;
        margin-bottom: 25px;
    }
</style>
