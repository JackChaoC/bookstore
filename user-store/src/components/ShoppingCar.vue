<template>
    <div>
        <el-drawer
            title="购物车"
            :visible.sync="drawer"
            direction="rtl"
            :before-close="handleClose"
        >
            <div class="clear-car">
                <span class="span1"><i class="el-icon-arrow-left"> </i></span>
                <span class="span2" @click="clearCar"><i class="el-icon-delete">&nbsp;清空购物车&nbsp;&nbsp;</i></span>
            </div>
            <div class="car-content">
                <div class="car-item" v-for="item in shopCar">
                    <div class="car-item-l">
                        <img :src="item.bookUrl" alt="" />
                        <div>
                            <p class="name">{{item.name}}</p>
                            <p class="price">￥{{item.bookPrice}}</p>
                        </div>
                    </div>

                    <el-input-number
                        @change="numberChange(item)"
                        v-model="item.number"
                        :min="0"
                        label="描述文字"
                        size="mini"
                    ></el-input-number>
                </div>
            </div>

            <div class="car-bottom">
                <div class="icon">
                    <el-badge :value="typeNumber" class="item">
                        <i class="el-icon-shopping-cart-full"></i>
                    </el-badge>
                </div>
                <div class="mid">
                    <p>
                        <span class="span1">总额:&nbsp;</span
                        ><span class="span2">{{totalPrice}}</span
                        ><span class="span3">&nbsp;&nbsp;&nbsp;￥</span>
                    </p>
                </div>
                <div class="settle-accounts">
                    <span @click="toSettleAccounts">结算</span>
                </div>
            </div>
        </el-drawer>
    </div>
</template>
<script>
import { mapState, mapMutations ,mapGetters} from "vuex";
export default {
    data() {
        return {
            num1: 1,
            num2: 1,
            num3: 1,
            num4: 1,
            num5: 1,
            num6: 1,
            num7: 1,
        };
    },
    computed: {
        ...mapState(["drawer","shopCar"]),
        ...mapGetters(['totalPrice']),
        typeNumber(){
            return this.shopCar.length
        }
    },
    methods: {
        ...mapMutations(["CLOSEDRAWER","CLEARSHOPCAR","REMOVESHOPCAR"]),
        handleClose() {
            this.CLOSEDRAWER();
        },
        clearCar(){
            this.CLEARSHOPCAR()
            this.$message.success('清除成功')
        },
        toSettleAccounts(){
            this.CLOSEDRAWER();
            this.$router.push('settleAccounts')
        },
        numberChange(item){
            if(item.number==0){
                this.REMOVESHOPCAR(item.bookId)
            }
        }
    },
};
</script>
<style lang="less" scoped>
.clear-car {
    display: flex;
    justify-content: space-between;
    height: 50px;
    line-height: 40px;
    .span1 {
        margin: 5px;
        height: 40px;
        display: inline-block;
        text-align: center;
        width: 30px;
        font-size: 30px;
        border-right: rgb(235, 235, 235) solid 1px;
    }
    .span2 {
        margin: 5px;
        height: 40px;
        font-size: 14px;
    }
    .span2:hover{
        cursor: pointer;
    }
}
.car-content {
    padding: 2%;
    background: rgb(246, 246, 246);
    height: 100%;
    .car-item {
        display: flex;
        height: 100px;
        min-width: 300px;
        justify-content: space-between;
        background: rgb(255, 255, 255);
        .car-item-l {
            img {
                height: 80px;
                width: 80px;
                margin: 10px;
            }
            div {
                display: inline-block;
            }
            p {
                position: relative;
                font-size: 14px;
                margin: 10px;
                bottom: 11px;
            }
            .name {
                color: #000;
            }
            .price {
                color: rgb(233, 37, 37);
            }
        }

        .el-input-number {
            height: 30px;
            position: relative;
            top: 60px;
            right: 10px;
        }
    }
}
.car-bottom {
    position: absolute;
    bottom: 0px;
    right: 0px;
    height: 50px;
    width: 100%;
    background: rgb(255, 255, 255);
    display: flex;
    justify-content: space-between;
    .icon {
        height: 50px;
        i {
            height: 46px;
            width: 46px;
            margin: 2px;
            border-radius: 50%;
            font-size: 25px;
            background: #f10215;
            text-align: center;
            line-height: 50px;
            color: rgb(255, 255, 255);
        }
    }
    .mid {
        width: 50%;
        line-height: 50px;
        .span1 {
            font-size: 14px;
            color: rgb(184, 184, 184);
        }
        .span2 {
            font-size: 35px;
            color: #f10215;
        }
        .span3 {
            font-size: 14px;
            color: #f10215;
        }
    }
    .settle-accounts {
        width: 100px;
        background: #f10215;
        line-height: 50px;
        font-size: 20px;
        color: white;
        text-align: center;
    }
    .settle-accounts:hover{
        cursor: pointer;
    }
}
</style>