<template>
    <div class="main">
        <div class="content">
            <div class="content-top">
                <span>购物车</span>
                <el-select
                    v-model="value"
                    placeholder="请选择配送地址"
                    size="mini"
                >
                    <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.detail"
                        :value="item.detail"
                    >
                    </el-option>
                </el-select>
            </div>
            <div class="category">
                <span class="span1">宝贝</span>
                <span class="span2">单价</span>
                <span class="span3">数量</span>
            </div>
            <div class="item" v-for="item in shopCar">
                <div class="item-content">
                    <div class="goods">
                        <img :src="item.bookUrl" alt="" />
                        <span>商品名</span>
                    </div>
                    <div class="price">
                        <p>
                            ￥<span>{{ item.bookPrice }}</span>
                        </p>
                    </div>
                    <div class="numb">
                        <span>{{ item.number }}</span>
                    </div>
                </div>
            </div>
            <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose"
            >
                <span>这是一段信息</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false"
                        >确 定</el-button
                    >
                </span>
            </el-dialog>
        </div>
        <div class="bottom">
            <p class="p1">
                已选商品&nbsp;<span>{{ shopCar.length }}</span
                >&nbsp;件
            </p>
            <p class="p2">
                合计:<span>{{ totalPrice }}</span>
            </p>
            <p class="p3" @click="jiesuan">结算</p>
        </div>
    </div>
</template>
<script>
import addressApi from "@/api/addressApi";
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";
import orderApi from "@/api/orderApi";
export default {
    data() {
        return {
            options: [],
            value: "",
            dialogVisible: false,
        };
    },
    computed: {
        ...mapGetters(["totalPrice"]),
        ...mapState(["shopCar"]),
    },
    created() {
        addressApi.getAddressList().then((res) => {
            if (res.code == 1) {
                this.options = res.data;
            } else {
                this.$message.warning("获取地址列表失败,但是服务器已响应");
            }
        });
    },
    methods: {
        changeTreeDate(zf_jsonObj, newKey, oldKey) {
            let str = JSON.stringify(zf_jsonObj);
            let reg = new RegExp(oldKey, "g");
            let newStr = str.replace(reg, newKey);
            return JSON.parse(newStr);
        },
        ...mapMutations(["CLEARSHOPCAR"]),
        jiesuan() {
            this.handleClose();
        },
        handleClose(done) {
            this.$confirm("确认结算")
                .then((_) => {
                    let _data = this.changeTreeDate(this.shopCar,"addressBookId","bookId")
                    _data = this.changeTreeDate(_data,"amount","bookPrice")
                    orderApi
                        .insertOrder(_data)
                        .then((res) => {
                            if (res.code == 1) {
                                this.$message.success("结算成功!");
                                this.CLEARSHOPCAR();
                            } else {
                                this.$message.warning(
                                    "结算失败,但是已访问到服务器"
                                );
                            }
                        });
                    done();
                })
                .catch((_) => {});
        },
    },
};
</script>
<style lang="less" scoped>
.main {
    display: flex;
    justify-content: center;
    background: #eae8eb;
    height: 93vh;
    overflow: auto;
    .content {
        background: white;
        width: 1000px;
        padding: 20px;
        margin-top: 20px;
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
        height: 2000px;
        .content-top {
            display: flex;
            justify-content: space-between;
        }
        .category {
            height: 30px;
            width: 100%;
            border-top: solid 1px #dcdcdc;
            line-height: 30px;
            font-size: 12px;
            margin: 20px 0;
            span {
                display: inline-block;
            }
            .span1 {
                width: 50%;
                text-align: center;
            }
            .span2 {
                width: 25%;
            }
            .span3 {
                width: 25%;
            }
        }
        .item {
            border-radius: 10px;
            margin-bottom: 20px;
            height: 120px;
            width: 100%;
            background: #eaf8ff;
            border: 1px solid #d6ebff;
            .item-content {
                margin-top: 20px;
                background: white;
                height: 100px;
                display: flex;
                line-height: 100px;
                .goods {
                    height: 100px;
                    width: 50%;
                    span {
                        position: relative;
                        bottom: 40%;
                        left: 25%;
                    }
                    img {
                        margin: 10px;
                        width: 80px;
                        height: 80px;
                    }
                }
                .price {
                    width: 25%;
                }
                .numb {
                    width: 25%;
                }
            }
        }
    }
    .bottom {
        background: white;
        height: 70px;
        width: 1040px;
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translateX(-50.7%);
        border-top: #dcdcdc 1px solid;
        display: flex;
        justify-content: right;
        align-items: center;
        font-size: 14px;
        p {
            display: inline-block;
            span {
                color: #ff4400;
                font-size: 24px;
            }
        }
        .p1 {
            width: 12%;
            line-height: 70px;
        }
        .p2 {
            width: 10%;
            line-height: 70px;
        }
        .p3 {
            width: 70px;
            height: 40px;
            background: #ff4400;
            color: white;
            line-height: 40px;
            text-align: center;
            margin-right: 30px;
            border-radius: 20px;
            transition: 0.3s ease;
        }
        .p3:hover {
            width: 74px;
            height: 42px;
            line-height: 43px;
            font-size: 16px;
            cursor: pointer;
        }
    }
}
</style>