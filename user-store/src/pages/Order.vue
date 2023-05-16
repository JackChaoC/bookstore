<template>
    <div class="content">
        <el-table 
        :data="orderList" 

        >
            <el-table-column
                type="index"
                width="50">
            </el-table-column>
            <el-table-column prop="id" label="订单编号" width="180">
            </el-table-column>
            <el-table-column prop="bookName" label="商品" width="180">
            </el-table-column>
            <el-table-column prop="orderTime" label="下单时间"> </el-table-column>
            </el-table-column>
            <el-table-column prop="amount" label="购买数量"> </el-table-column>
            </el-table-column>
            <el-table-column prop="consignee" label="配送地址"> </el-table-column>
            </el-table-column>
            <el-table-column prop="number" label="单价"> </el-table-column>
        </el-table>
    </div>
</template>
<script>
import orderApi from "@/api/orderApi";
export default {
    data() {
        return {
            orderList: [],
        };
    },
    methods: {
        headStyle() {
            return "text-align:center";
        },
    },
    created() {
        orderApi.getOrderList(sessionStorage.getItem('userToken')).then((res) => {
            if (res.code == 1) {
                this.orderList = res.data;
            } else {
                this.$message.warning("获取订单列表失败,但是服务器已响应");
            }
        });
    },
};
</script>
<style lang="less" scoped>
.content {
    width: 80%;
    margin: 0 20px;
    margin-left: 50%;
    transform: translate(-48%, 0);
}
</style>