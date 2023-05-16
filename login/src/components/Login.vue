<template>
    <div>
        <div class="login">
            <div>
                <el-radio-group v-model="tabPosition" @change="message">
                    <el-radio-button label="user" :plain="true"
                        >用户登录</el-radio-button
                    >
                    <el-radio-button label="manager" :plain="true"
                        >管理员登录</el-radio-button
                    >
                </el-radio-group>
            </div>
            <div class="login_form">
                <span>账号：</span>
                <input
                    type="text"
                    placeholder="请输入账号"
                    v-model.number.trim="username"
                />
                <br />
                <span>密码：</span>
                <input
                    type="password"
                    placeholder="请输入密码"
                    v-model.trim="password"
                />
            </div>
            <div class="btn">
                <button class="login_btn" @click="login">登录</button>
            </div>
            <div class="dialog">
                <el-button type="text" @click="dialogVisible = true"
                    >注册账号</el-button
                >
                <el-dialog
                    title="用户注册"
                    :visible.sync="dialogVisible"
                    width="30%"
                    :before-close="handleClose"
                >
                    <div>
                        <el-form
                            label-position="right"
                            size="small"
                            label-width="80px"
                        >
                            <el-form-item label="账号">
                                <el-input
                                    v-model.number.trim="username"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="密码">
                                <el-input
                                    type="password"
                                    v-model.trim="password"
                                ></el-input>
                            </el-form-item>
                        </el-form>
                    </div>

                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false"
                            >取 消</el-button
                        >
                        <el-button type="primary" @click="Register"
                            >确 定</el-button
                        >
                    </span>
                </el-dialog>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tabPosition: "user",
            username: "",
            password: "",
            dialogVisible: false,
        };
    },
    computed: {
        isUser() {
            return this.tabPosition === "user" ? true : false;
        },
    },
    methods: {
        message() {
            if (this.isUser) {
                this.$message({
                    message: "切换至用户登录",
                    type: "success",
                    duration: 1000,
                });
            } else {
                this.$message({
                    message: "切换至管理员登录",
                    type: "success",
                    duration: 1000,
                });
            }
        },
        handleClose(done) {
            this.$confirm("确认关闭？")
                .then((_) => {
                    done();
                })
                .catch((_) => {});
        },
        //登录方法
        login() {
            if (this.username === "" || this.password === "") {
                this.$message.warning("账号或密码不能为空");
            } else {
                //用户登录
                if (this.isUser) {
                    this.$http
                        .post(
                            //登录接口
                            "/user/login",
                            //登录参数
                            {
                                username: this.username,
                                password: this.password,
                            }
                        )
                        .then(
                            (res) => {
                                if (res.code == "1") {
                                    console.log("成功:");
                                    console.log(res);
                                    //1-1.判断是否成功看状态码,
                                    //1-2.设置Token
                                    if (res.data.id) {
                                        sessionStorage.setItem(
                                            "userToken",
                                            res.data.id
                                        );
                                        console.log("Token设置成功");
                                    } else {
                                        console.log("Token设置失败");
                                    }
                                    this.$message.success("登录成功");
                                    //1-3.转跳html
                                    // window.open('http://localhost:8081')
                                    window.location.href =
                                        "http://localhost:8080/dist2/index.html";
                                    // window.location.href = "http://localhost:8080";
                                } else {
                                    console.log(res);
                                    this.$message.success(
                                        "登录失败,账号错误?密码错误?反正已经反问到服务器了"
                                    );
                                }

                                //1-1 失败则提示账号密码错误
                            },
                            (err) => {
                                this.$message.success("访问出错");
                                console.log("失败:", err);
                            }
                        );
                } else {
                    //管理员登录
                    this.$http
                        .post(
                            //登录接口
                            "/employee/login",
                            //登录参数
                            {
                                username: this.username,
                                password: this.password,
                            }
                        )
                        .then(
                            (res) => {
                                if (res.code == "1") {
                                    console.log("成功:");
                                    console.log(res);
                                    //1-1.判断是否成功看状态码,
                                    //1-2.设置Token
                                    if (res.data.id) {
                                        sessionStorage.setItem(
                                            "employeeToken",
                                            res.data.id
                                        );
                                        console.log("Token设置成功");
                                    } else {
                                        console.log("Token设置失败");
                                    }
                                    this.$message.success("登录成功");
                                    //1-3.转跳html
                                    // window.open('https://localhost:8081')
                                    window.location.href =
                                        "http://localhost:8080/backend/index.html";
                                } else {
                                    console.log(res);
                                    this.$message.success(
                                        "登录失败,账号不存在?密码错误?反正已经反问到服务器了"
                                    );
                                }

                                //1-1 失败则提示账号密码错误
                            },
                            (err) => {
                                this.$message.success("访问出错");
                                console.log("失败", err);
                            }
                        );
                }
            }
        },
        Register() {
            if (this.username === "" || this.password === "") {
                this.$message.warning("账号或密码不能为空");
            } else {
                this.$http
                    .post(
                        //登录接口
                        "/user/register",
                        //登录参数
                        {
                            username: this.username,
                            password: this.password,
                        }
                    )
                    .then(
                        (res) => {
                            if (res.code == "1") {
                                console.log("成功:");
                                console.log(res);
                                this.$message.success("注册成功");
                                this.dialogVisible = false;
                            } else {
                                this.$message.success(
                                    "注册失败,有可能是账号已注册过,但是已经访问到服务器了"
                                );
                            }
                        },
                        (err) => {
                            this.$message.success("访问出错");
                            console.log("失败:", err);
                        }
                    );
            }
        },
    },
};
</script>
<style lang="css">
body {
    padding: 0;
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    background-image: linear-gradient(#a18cd1 0%, #fbc2eb 100%);
    background-size: cover;
    flex: 1;
    align-items: center;
}
.login {
    text-align: center;
    margin: 0 auto;
    width: 500px;
    height: 400px;
    background-color: rgba(87, 86, 86, 0.2);
    border-radius: 25px;
    box-shadow: 5px 2px 35px -7px #ff9a9e;
}

.login_form {
    padding: 20px;
}
.login_form span {
    color: rgb(131, 220, 255);
    font-size: 18px;
    font-weight: 100;
}
.login_form input {
    background-color: transparent;
    width: 320px;
    padding: 2px;
    text-indent: 2px;
    color: white;
    font-size: 20px;
    height: 45px;
    margin: 30px 30px 30px 5px;
    outline: none;
    border: 0;
    border-bottom: 1px solid rgb(131, 220, 255);
}
input::placeholder {
    color: #fbc2eb;
    font-weight: 100;
    font-size: 18px;
    font-style: italic;
}
.login_btn {
    background-color: rgba(255, 255, 255, 0.582);
    border: 1px solid rgb(190, 225, 255);
    padding: 5px;
    width: 160px;
    height: 50px;
    border-radius: 30px;
    font-size: 20px;
    color: rgb(100, 183, 255);
    font-weight: 100;
    margin-top: 15px;
}
.login_btn:hover {
    box-shadow: 2px 2px 15px 2px rgb(190, 225, 255);
    background-color: transparent;
    color: white;
    /* 选择动画 */
    animation: login_mation 0.5s;
}

/* 定义动画 */
@keyframes login_mation {
    from {
        background-color: rgba(255, 255, 255, 0.582);
        box-shadow: 0px 0px 15px 2px rgb(190, 225, 255);
    }
    to {
        background-color: transparent;
        color: white;
        box-shadow: 2px 2px 15px 2px rgb(190, 225, 255);
    }
}
.dialog {
    position: relative;
    width: 120px;
    height: 30px;
    left: 70%;
    bottom: 10%;
}
</style>