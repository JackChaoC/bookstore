<template>
    <div>
        <div class="search">
            <el-input
                placeholder="请输入内容"
                v-model="input3"
                class="input-with-select"
            >
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div>
        <div class="main">
            <div class="book-content">
                <ul class="book-ul">
                    <li class="book-li" v-for="item in bookList" :key="item.id">
                        <img :src="item.bookUrl" alt="" />
                        <p class="book-name">{{ item.bookName }}</p>
                        <p class="book-category">
                            分类:&nbsp;{{ item.bookType }}
                        </p>
                        <p class="book-price">
                            <span>￥</span>{{ item.bookPrice }}
                        </p>
                        <button class="buy" @click="toDetail(item)">
                            立即抢购
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { mapMutations } from "vuex";
import bookApi from "@/api/bookApi";
export default {
    data() {
        return {
            input3: "",
            bookList: [],
        };
    },
    methods: {
        toDetail(item) {
            this.$router.push({
                name: "detail",
            });
            this.SAVEDETAILBOOK(item)
        },
        ...mapMutations(['SAVEDETAILBOOK'])
    },
    created() {
        bookApi.getBookList().then((res) => {
            if (res.code == 1) {
                this.bookList = res.data;
                console.log(res);
            }
        });
    },
};
</script>
<style lang="less" scoped>
.search {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 60px;
    .el-input {
        width: 400px;
    }
}
.main {
    display: flex;
    width: 100%;
    height: auto;
    justify-content: center;
    background-color: rgb(248, 248, 248);
    .book-content {
        width: 80%;
        ul {
            display: flex;
            justify-content: left;
            flex-wrap: wrap;
            li {
                width: 200px;
                height: 300px;
                margin: 20px;
                box-shadow: 0 0 20px 5px #a5a5a5;
                img {
                    width: 75%;
                    height: 75%;
                    margin-left: 12.5%;
                }
                p {
                    margin: 5px;
                    height: 15px;
                    line-height: 15px;
                    text-align: center;
                }
                .book-category {
                    text-align: left;
                    font-size: 14px;
                    margin-bottom: 10px;
                    color: rgb(92, 92, 92);
                }
                .book-price {
                    text-align: left;
                    color: #e21222;
                    span {
                        font-size: 16px;
                    }
                    font-size: 24px;
                }
                .buy {
                    border: none;
                    background-color: transparent;
                    outline: none;
                    background-color: #e03340;
                    color: white;
                    width: 70px;
                    height: 30px;
                    position: relative;
                    bottom: 32px;
                    left: 120px;
                    transition: 0.1s ease;
                }
                .buy:hover {
                    width: 72px;
                    height: 32px;
                }
            }
        }
    }
}
</style>