<template>
    <div id="app">
        <el-container>
            <el-header height="50px">
                <Header />
            </el-header>
            <el-main>
                <Home />
            </el-main>
        </el-container>
    </div>
</template>

<script>
import Home from "@/components/Home";
export default {
    name: "App",
    components: {
        Home,
    },
};
</script>

<style lang="less">
.el-header,.el-main,.el-footer{
    padding: 0;
}
.el-main{
    height: 93vh;
}
</style>
