<template>
    <div>
        <div class="main">
            <div class="address-content">
                <div class="add">
                    <el-button
                        type="primary"
                        size="medium"
                        @click="dialogVisible = true"
                        >添加地址</el-button
                    >
                </div>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column type="index" width="50"> </el-table-column>
                    <el-table-column
                        prop="detail"
                        label="地址"
                        width="400"
                    ></el-table-column>
                    <el-table-column
                        prop="consignee"
                        label="收件人"
                        width="100"
                    ></el-table-column>
                    <el-table-column prop="phone" label="电话号码" width="200">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)"
                                >编辑</el-button
                            >
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)"
                                >删除</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
                <!-- --------------------------------------------------------------------------------添加地址 -->
                <el-dialog
                    title="添加地址"
                    :visible.sync="dialogVisible"
                    width="30%"
                    :before-close="handleClose"
                >
                    <el-form
                        ref="form"
                        label-position="right"
                        label-width="90px"
                        :model="formData"
                        label-suffix=":"
                        :rules="rules"
                    >
                        <el-form-item label="地址" prop="detail">
                            <el-input v-model="formData.detail"></el-input>
                        </el-form-item>
                        <el-form-item label="收件人" prop="consignee">
                            <el-input v-model="formData.consignee"></el-input>
                        </el-form-item>
                        <el-form-item label="电话号码" prop="phone">
                            <el-input
                                v-model.number="formData.phone"
                            ></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false"
                            >取 消</el-button
                        >
                        <el-button type="primary" @click="submitForm('form')"
                            >确 定</el-button
                        >
                    </span>
                </el-dialog>
                <!-- -------------------------------------------------------------------------修改地址 -->
                <el-dialog
                    title="修改地址"
                    :visible.sync="updateVisible"
                    width="30%"
                    :before-close="handleClose"
                >
                    <el-form
                        ref="updateForm"
                        label-position="right"
                        label-width="90px"
                        :model="updateData"
                        label-suffix=":"
                        :rules="rules"
                    >
                        <el-form-item label="地址" prop="detail">
                            <el-input v-model="updateData.detail"></el-input>
                        </el-form-item>
                        <el-form-item label="收件人" prop="consignee">
                            <el-input v-model="updateData.consignee"></el-input>
                        </el-form-item>
                        <el-form-item label="电话号码" prop="phone">
                            <el-input
                                v-model.number="updateData.phone"
                            ></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="updateVisible = false"
                            >取 消</el-button
                        >
                        <el-button
                            type="primary"
                            @click="submitUpdateForm('updateForm')"
                            >确 定</el-button
                        >
                    </span>
                </el-dialog>
            </div>
        </div>
    </div>
</template>
<script>
import addressApi from "@/api/addressApi";
export default {
    data() {
        var checkPhone = (rule, value, callback) => {
            if (value.toString().length != 11) {
                console.log(typeof value);
                callback(new Error("请输入长度为11的数字"));
            } else {
                callback();
            }
        };
        return {
            tableData: [],
            dialogVisible: false,
            updateVisible: false,
            updateIndex: undefined,
            formData: {
                userId: "",
                consignee: "",
                phone: "",
                detail: "",
                id: "",
            },
            updateData: {
                userId: "",
                consignee: "",
                phone: "",
                detail: "",
                id: "",
            },
            rules: {
                detail: [
                    {
                        required: true,
                        message: "不能为空",
                        trigger: "blur",
                    },
                ],
                consignee: [
                    {
                        required: true,
                        message: "不能为空",
                        trigger: "blur",
                    },
                ],
                phone: [
                    { required: true, message: "不能为空", trigger: "blur" },
                    {
                        type: "number",
                        message: "请输入数字",
                        trigger: "blur",
                    },
                    { validator: checkPhone, trigger: "blur" },
                ],
            },
        };
    },
    methods: {
        //点击更新按钮回调
        handleEdit(index, row) {
            row.phone = Number(row.phone);
            this.updateData = row;
            this.updateIndex = index;
            this.updateVisible = true;
        },
        //惦记你删除按钮回调
        handleDelete(index, row) {
            this.$confirm("请确定是否删除该地址", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    //..........................................................................删除接口
                    addressApi.deleteAddress(row.id).then(res=>{
                        if(res.code==1){
                            this.$message.success("删除成功")
                        }else{
                            this.$message.warning(`删除失败,code=${res.code}`)
                        }
                    })
                    this.tableData.splice(index, 1);
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
        handleClose(done) {
            done();
        },
        //提交添加地址表格
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.formData.userId = sessionStorage.getItem("userToken");
                    this.formData.id = new Date().getTime();
                    // 判断code=1?成功 则执行一下操作
                    // .................................................................................................地址添加接口
                    addressApi.saveAddress(this.formData).then((res) => {
                        if (res.code == 1) {
                            this.$message.success("地址添加成功");
                            console.log(this.formData);
                            this.tableData.unshift(this.formData);
                            this.dialogVisible = false;
                        }
                    });
                    // request({
                    //     method:"POST",
                    //     url:'/address/insert',
                    //     data:this.formData
                    // })
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        //提交修改地址表格
        submitUpdateForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    //.............................................................................修改地址接口
                    addressApi.updateAddress(this.updateData).then((res) => {
                        if (res.code == 1) {
                            this.$message.success("地址修改成功");
                            this.$set(
                                this.formData,
                                this.updateIndex,
                                this.updateData
                            );
                            console.log("update成功");
                            this.updateVisible = false;
                        }
                    });
                } else {
                    console.log("error update!!");
                    return false;
                }
            });
        },
    },
    //.............................................................................................................获取地址接口,调试需要改
    created() {
        addressApi.getAddressList().then((res) => {
            console.log(res);
            if (res.code == 1) {
                this.tableData = res.data;
            } else {
                this.$message.warning("获取地址列表失败,但是服务器已响应");
            }
        });
    },
    //.............................................................................................................调试需要改
    mounted() {
        sessionStorage.setItem("userId", "123");
    },
};
</script>
<style lang="less" scoped>
.main {
    width: 100%;
    display: flex;
    justify-content: center;
    .address-content {
        width: 900px;
    }
    .add {
        display: flex;
        justify-content: right;
        margin: 10px;
    }
}
</style>