<template>
    <div>
        <h1>{{id?'编辑':'新建'}}物品</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="图标">
                <el-upload
                        class="avatar-uploader"
                        :action="$http.defaults.baseURL + '/upload'"
                        :headers="getAuthHeaders()"
                        :show-file-list="false"
                        :on-success="afterUpload">
                    <img v-if="model.icon" :src="model.icon" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item >
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        props:{
            id:{}
        },
        name: "ItemEdit",
        created(){
            this.id && this.fetch();
        },
        data(){
            return{
                model:{},
            }
        },
        methods:{
            afterUpload(res){
                // this.model.icon = res.url
                //新增的数据通过set去绑定，如果直接用=，会导致无法使用
                this.$set(this.model,'icon',res.url)
            },
            save(){
                if (this.id){
                    this.$http.put(`rest/items/${this.id}`,this.model).then(()=>{
                        this.$message({
                            type:'success',
                            message:'修改成功'
                        });
                        this.$router.push('/items/list');
                    });

                }else {
                    this.$http.post('rest/items',this.model).then(()=>{
                        this.$message({
                            type:'success',
                            message:'保存成功'
                        })
                        this.$router.push('/items/list');
                    });

                }

          },
            async fetch(){
                const res = await this.$http.get(`rest/items/${this.id}`)
                this.model = res.data
            },
        }
    }
</script>

<style scoped>

</style>
