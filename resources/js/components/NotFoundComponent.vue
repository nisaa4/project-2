<template>
    <div>
        <h1>404 <br> NOT FOUND</h1>
        <button @click="goBackward">Back</button>
    </div>
</template>

<script>
export default {
    methods: {
        goBackward() {
            this.$router.go(-1)
        },
    }
}
</script>