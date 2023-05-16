<template>
    <div id="app">
        <h1>欢迎登录图书商城!</h1>
        <Login/>
    </div>
</template>

<script>
import Login from '@/components/Login'
export default {
    name: "App",
    components: {
        Login
    },
};
</script>

<style>
h1{
    position: absolute;
    font-size: 70px;
    width: 580px;
    left: 50%;
    transform: translate(-50%,-160%);
    color: rgb(140, 42, 231);
}
</style>
