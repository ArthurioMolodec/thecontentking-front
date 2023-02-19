<template>
    <div>
        <v-text-field
                :placeholder="label"
                class="general-input"
                :css="placeholderStyle"
                :type="type"
                variant="plain"
                hide-details
                v-model="value"
        ></v-text-field>
    </div>
</template>

<script>
    export default {
        props: ['label', "type", "modelValue"],
        data() {
            return {
                value: this.modelValue,
                bgColor: 'red',
                inputId: 'input-' + Math.random().toString(36).substr(2, 9),
                placeholderStyle: {
                    color: 'red'
                }
            };
        },
        watch: {
            value(value) {
                this.$emit('update:modelValue', value);
            }
        }
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


