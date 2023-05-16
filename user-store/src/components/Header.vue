<template>
    <div class="header-container">
        <div class="l-content">
            <span>{{title}}</span>
        </div>
        <div class="r-content">
            <span class="username">用户&nbsp{{ userId }}&nbsp,你好!</span>
            <span @click="openShoppingCar"
                ><i class="el-icon-shopping-cart-2 icon shopping-car icon1"></i
            ></span>
            <span @click="toHome">
                <i class="el-icon-house icon icon1"></i>
            </span>
            <el-dropdown :hide-on-click="false" @command="dropDown">
                <i class="el-icon-user icon"></i>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="1"> 订单 </el-dropdown-item>
                    <el-dropdown-item :command="2"> 地址设置 </el-dropdown-item>
                    <el-dropdown-item :command="3"> 退出登录 </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";

export default {
    data() {
        return {
            userId:sessionStorage.getItem('userToken')
        }
    },
    methods: {
        toHome() {
            this.$router.push("store");
        },
        toOrder() {
            this.$router.push("order");
        },
        toAddress() {
            this.$router.push("address");
        },
        logOut() {
            sessionStorage.setItem("userToken", "");
            this.$message.success("退出登录成功");
            //退登录装调到静态资源路径
            window.location.href = "https://www.baidu.com";
        },
        dropDown(a) {
            if(a===1){
                this.toOrder()
            }else{
                if(a===2){
                    this.toAddress()
                }else{
                    this.logOut()
                }
            }
        },
        openShoppingCar() {
            this.OPENDRAWER();
        },

        ...mapMutations(["OPENDRAWER"]),
    },
    computed: {
        ...mapState(["drawer"]),
        title(){
            return this.$route.meta.title
        }
    },

};
</script>
<style lang="less" scoped>
.header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0;
    margin: 0;
    background: #DF3033;
    height: 50px;
    width: 100%;
    .l-content {
        margin-left: 10px;
        color: rgb(242, 242, 242);
        font-size: 14px;
        span{
            margin-left: 10px;
        }
    }
    .r-content {
        width: 300px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        text-align: center;
        margin-right: 10px;
        color: rgb(241, 241, 241);
        .el-dropdown-link {
            margin-right: 10px;
        }
    }
    .username {
        margin-right: 10px;
    }
    .icon {
        font-size: 25px;
        color: rgb(238, 238, 238);
    }
    .icon1:hover {
        font-size: 28px;
        transition: 0.1s ease;
        cursor: pointer;
    }
    .shopping-car {
        margin-top: 2px;
    }
}
</style>