<template>
    <div>
        <v-text-field
                :placeholder="label"
                class="general-input"
                :css="placeholderStyle"
                :type="type"
                variant="plain"
                hide-details
        ></v-text-field>
    </div>
</template>

<script>
    export default {
        props: ['label', "type"],
        data() {
            return {
                bgColor: 'red',
                inputId: 'input-' + Math.random().toString(36).substr(2, 9),
                placeholderStyle: {
                    color: 'red'
                }
            };
        },
    };
</script>

<style>
    .general-input .v-input__control  {
        background-color: #242424;
        border-radius: 12px;
        padding-left: 20px;
    }

    .general-input input {
        padding-top: 3px;
    }
</style>


