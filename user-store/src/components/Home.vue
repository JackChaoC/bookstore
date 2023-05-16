<template>
    <div>
        <keep-alive include="detail">
            <router-view></router-view>
        </keep-alive>
        <shopping-car/>
    </div>
</template>
<script>
import ShoppingCar from "@/components/ShoppingCar.vue";
export default {
    components: {
        ShoppingCar,
    },
    data() {
        return {
            fileList: [],
        };
    },
    methods: {
        submitUpload() {
            console.log(this.fileList);
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
    },
};
</script>
<style lang="less" scoped>
</style>