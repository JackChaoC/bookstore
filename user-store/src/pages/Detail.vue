<template>
    <div>
        <el-row>
            <el-col :span="10">
                <div class="l-content">
                        <img-zoom 
                        height="400"
                        width="400"
                        :src="book.bookUrl" 
                        class="img" 
                        :configs="configs" 
                        :bigsrc="book.bookUrl"
                        ></img-zoom>
                    
                </div>
                
                
            </el-col>
            <el-col :span="14">
                <div class="r-content">
                    <el-row class="name"
                        ><p>
                            {{book.name}}
                        </p></el-row
                    >
                    <el-row class="price"
                        ><p>
                            <span class="span1">价&nbsp;&nbsp;&nbsp;格</span
                            ><span class="span2 spanR1">¥&nbsp;</span
                            ><span class="span3">{{book.bookPrice}}</span>
                        </p></el-row
                    >
                    <el-row class="author"
                        ><p>
                            作&nbsp;&nbsp;&nbsp;者<span class="spanR2"
                                >{{book.bookAuthor}}</span
                            >
                        </p></el-row
                    >
                    <el-row class="publish-house"
                        ><p>
                            出&nbsp;版&nbsp;社<span class="spanR3"
                                >{{book.bookPress}}</span
                            >
                        </p></el-row
                    >
                    <el-row class="publish-time"
                        ><p>
                            发&nbsp;行&nbsp;日&nbsp;期<span class="spanR4"
                                >{{book.bookPubDate}}</span
                            >
                        </p></el-row
                    >
                    <el-row class="publish-time"
                        ><p>
                            简&nbsp;&nbsp;&nbsp;介<span class="spanR5"
                                >{{book.bookOutline}}</span
                            >
                        </p></el-row
                    >
                    <el-row class="buy">
                        <el-input-number
                            v-model="num"
                            @change="handleChange"
                            size="mini"
                            :min="1"
                            :max="10"
                            label="描述文字"
                            disabled
                        ></el-input-number>
                        <el-row class="btn">
                            <button @click="addShopCar()">加入购物车</button>
                        </el-row>
                    </el-row>
                </div>
            </el-col>
        </el-row>
        <div class="line">
        </div>
        <div class="title">
            <p class="p1">评论</p> <p class="p2"> 312</p>
        </div>
        <div class="add-common">
            <img src="./img/touxiang.png" alt="">
            <input type="input" v-model="commentData" placeholder="请输入内容" ></input>
            <button @click="addComment">发布</button>
        </div>
        <div class="common" v-for="item in comments">
            <div class="user">
                <img src="./img/touxiang.png" alt="">
                <p>{{item.userId}}</p>
            </div>
            <div class="user-common">
                <p>{{item.commentContent}}</p>
                <p class="comment-date">{{item.commentDate}}</p>
            </div>
        </div>
        
    </div>
</template>
<script>
import { nanoid } from "nanoid";
import imgZoom from "vue2.0-zoom";
import { mapMutations, mapState } from "vuex";
import bookApi from "@/api/bookApi";
import dayjs from "dayjs";
export default {
    components: { imgZoom },
    data() {
        return {
            num: 1,
            input: "",
            configs: {
                width: 500,
                height: 500,
                maskWidth: 200,
                maskHeight: 200,
                maskColor: "red",
                maskOpacity: 0.2,
            },
            comments: [],
            commentData: "",
        };
    },

    methods: {
        handleChange(value) {
            console.log(value);
        },
        ...mapMutations(["ADDSHOPCAR"]),
        addShopCar() {
            this.ADDSHOPCAR();
            this.$message.success("添加成功");
            console.log(this.detailBook);
            console.log(this.shopCar);
        },
        addComment() {
            bookApi
                .insertComment({
                    bookId: this.detailBook.bookId,
                    commentContent: this.commentData,
                    commentDate: undefined,
                    id: nanoid(),
                    userId: sessionStorage.getItem("userToken"),
                    username: "",
                })
                .then((res) => {
                    if (res.code == 1) {
                        this.commentData = "";
                        this.$message.success("评论发表成功");
                        this.getCommentList();
                    }
                });
        },
        getCommentList() {
            bookApi.getComment(this.detailBook.bookId).then((res) => {
                this.comments = res.data.sort((a, b) => {
                    return (
                        dayjs(b.commentDate).unix() -
                        dayjs(a.commentDate).unix()
                    );
                });
            });
        },
    },
    computed: {
        ...mapState(["detailBook", "shopCar"]),
        book() {
            return this.$store.state.detailBook;
        },
    },
    created() {
        bookApi.getComment(this.detailBook.bookId).then((res) => {
            this.comments = res.data.sort((a, b) => {
                return (
                    dayjs(b.commentDate).unix() - dayjs(a.commentDate).unix()
                );
            });
        });
    },
    mounted() {
        console.log(this.detailBook);
    },
};
</script>
<style lang="less" scoped>
.l-content {
    .img {
        float: right;
        margin-bottom: 40px;
        margin-top: 40px;
    }
}
.r-content {
    margin-top: 40px;
    width: 800px;
    .el-row {
        margin: 30px;
        margin-left: 10px;
        padding-left: 10px;
    }
    .name {
        font-size: 16px;
        color: #666666;
        font-weight: 600;
    }
    .price {
        height: 40px;
        background: #f3f3f3;
        line-height: 40px;
        border-radius: 4px;
        span {
            display: inline-block;
            height: 40px;
        }
        .span1 {
            font-size: 14px;
            color: #999999;
            position: relative;
            bottom: 3px;
        }
        .span2 {
            color: #e4393c;
            position: relative;
            bottom: 2px;
        }
        .span3 {
            color: #e4393c;
            font-size: 24px;
        }
    }
    .author {
        p {
            color: #999999;
            font-size: 14px;
        }
    }
    .publish-house {
        p {
            color: #999999;
            font-size: 14px;
        }
    }
    .publish-time {
        p {
            color: #999999;
            font-size: 14px;
        }
    }
    .buy {
        .btn {
            margin: 0;
            position: relative;
            right: 10px;
            button {
                border: 0;
                background-color: #df3033;
                width: 130px;
                height: 50px;
                margin-top: 10px;
                color: white;
                font-size: 18px;
                font-weight: 600;
                cursor: pointer;
            }
        }
    }
    .spanR1 {
        margin-left: 38px;
    }
    .spanR2 {
        color: #676767;
        margin-left: 38px;
    }
    .spanR3 {
        color: #676767;
        margin-left: 28px;
    }
    .spanR4 {
        color: #676767;
        margin-left: 10px;
    }
    .spanR5 {
        color: #676767;
        margin-left: 38px;
    }
}
.line {
    width: 1200px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    border-top: 1px solid rgb(224, 224, 224);
}
.title {
    margin: 20px;
    p {
        display: inline-block;
    }
    .p1 {
        margin-left: 200px;
        font-size: 20px;
        font-weight: 400;
    }
    .p2 {
        font-size: 14px;
        color: #919191;
    }
}
.add-common {
    margin-top: 20px;
    display: flex;
    img {
        margin: 5px;
        margin-left: 250px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    input {
        margin-left: 15px;
        margin-right: 15px;
        width: 600px;
        height: 47px;
        border: 1px solid #f1f2f3;
        background: #f1f2f3;
        text-indent: 10px;
        border-radius: 4px;
    }
    input:hover {
        background: white;
        border: #dddddd 1px solid;
    }
    button {
        width: 70px;
        height: 50px;
        background: #80d7f6;
        border: 0;
        border-radius: 4px;
        font-size: 16px;
        font-weight: 550;
        color: white;
    }
    button:hover {
        background: #00aeec;
    }
}
.common {
    margin: 20px;

    margin-left: 250px;
    .user {
        display: flex;
        img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
        p {
            margin-left: 18px;
            margin-top: 5px;
            font-size: 13px;
            color: #61666d;
        }
    }
    .user-common {
        font-size: 15px;
        margin-left: 56px;
        width: 700px;
        line-height: 24px;
        font-family: "微软雅黑";
        .comment-date {
            font-size: 12px;
            color: #61666d;
        }
    }
}
</style>