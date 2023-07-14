<template>
  <div class="mdui-container-fluid">
    <div class="mdui-row">
      <div class="mdui-col-xs-3">
        <div class="mdui-row">
          <div class="mdui-col-xs-9">
            <el-input
              placeholder="输入要添加的根目录名"
              v-model="newCatalogRootName">
            </el-input>
          </div>
          <div class="mdui-col-xs-3">
            <button class="mdui-btn mdui-btn-icon mdui-ripple" @click="addCatalogRoot">
              <i class="mdui-icon material-icons">add</i>
            </button>
          </div>
        </div>
        <el-input
          placeholder="输入关键字进行过滤"
          v-model="filterText">
        </el-input>
        <el-tree
          :data="catalog"
          :props="defaultProps"
          :default-expand-all="true"
          @node-click="getArticle"
          :filter-node-method="filterNode"
          ref="tree"
        >
           <span class="custom-tree-node" slot-scope="{ node, data }">
              <span class="catalog-catlog" v-if="node.data.type==='CATALOG'">
                <i class="mdui-icon material-icons">&#xe2c8;</i>
                <span v-show="!labelEdit">{{ node.label }}</span>
                <span v-show="labelEdit&&labelEditNodeId===node.data.id">
                  <div class="mdui-textfield">
                    <el-input  v-model="labelEditNewLabel"
                           type="text" placeholder="文件夹名称"
                           @blur="updateFolderName"
                    />
                    </div>
                </span>
              </span>
              <span class="catalog-article" v-else>
                {{ node.label }}
              </span>
              <span>
                <span v-show="node.data.type==='CATALOG'">
                  <button class="mdui-btn mdui-btn-icon" @click="modifyFolder(node.data)">
                    <i class="mdui-icon material-icons">&#xe3c9;</i>
                  </button>
                  <button class="mdui-btn mdui-btn-icon" @click="addCatalog(node.data)">
                    <i class="mdui-icon material-icons">&#xe2cc;</i>
                  </button>
                </span>
                <span v-if="node.data.type==='CATALOG'">
                  <button class="mdui-btn mdui-btn-icon" @click="addArticle(node.data)">
                    <i class="mdui-icon material-icons">&#xe145;</i>
                  </button>
                </span>
                <span v-else>
                  <el-button type="text" size="mini">
                    添加子文章
                  </el-button>
                </span>
             </span>
           </span>
        </el-tree>
      </div>
      <div class="mdui-col-xs-9" v-show="showDetails">
        <div class="mdui-container-fluid"
             v-if="displayArticle">
          <div class="mdui-row title-row">
            <div class="mdui-col-xs-2">
              <button class="mdui-btn mdui-btn-icon"
                      @click="displayArticle=!displayArticle"
              >
                <!--                mdui-tooltip="{content: '编辑'}"-->
                <i class="mdui-icon material-icons"
                >
                  &#xe3c9;
                </i>
              </button>
            </div>

            <div class="mdui-col-xs-4">
              <div class="mdui-card-header"
                   style="font-size: 20px;display: flex;align-items: center"
              >
                {{ article.title }}
              </div>
            </div>

            <div class="mdui-col-xs-2">

            </div>
            <div class="mdui-col-xs-4">
              创建日期: {{ article.createdTime }}
            </div>
          </div>
          <mavon-editor
            v-model="article.text"
            :toolbars-flag="false"
            :subfield="false"
            default-open="preview"
          />
        </div>
        <div class="mdui-container-fluid"
             v-else>
          <div class="mdui-row title-row">
            <div class="mdui-col-xs-8">
              <div class="mdui-textfield">
                <input class="mdui-textfield-input"
                       type="text"
                       placeholder="请输入标题"
                       v-model="article.title"
                />
              </div>
            </div>
            <div class="mdui-col-xs-4">
<!--              添加tag按钮-->
              <i class="mdui-icon material-icons" >&#xe80e;</i>
            </div>
          </div>
          <mavon-editor
            v-model="article.text"
            :toolbars-flag="true"
            :subfield="true"
            default-open="preview"
            @change="handleChange"
            @save="saveData"
          />
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import editor_api from "../../../api/editor_api";
import http from "../../../api/http";

export default {
  name: "EditorPage",
  data () {
    return {
      // 目录
      catalog: [],

      article: {
        title: "",
        text: "",
        id: "",
        tagId: "",
        createdTime: ""
      },

      newCatalogRootName: "",

      displayArticle: true,
      showDetails: false,

      labelEdit: false,
      labelEditNodeId: null,
      labelEditNewLabel: '',

      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    /**
     * 编辑文件夹名称
     */
    modifyFolder(data) {
      this.labelEdit=true
      this.labelEditNodeId = data.id
      this.labelEditNewLabel = data.label
    },
    /**
     * 更新文件夹名称
     */
    updateFolderName() {
      this.labelEdit = false
      let data = {
        id: this.labelEditNodeId,
        label: this.labelEditNewLabel
      }
      editor_api.updateCatalog(data)
        .then(res => {
          if (res.status === 200 && res.data) {
            let data = res.data
            if (data.code === 404) {
              this.$message.error(data.message)
            } else {
              this.$message.success('更改文件夹名成功！')
              this.loadCatalog()
            }
          } else {
            this.$message.error('更改文件夹名失败！')
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    /**
     * 过滤节点
     */
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // testNode(node){
    //   console.log(node)
    // },
    /**
     * 显示文章
     * @param node 点击的节点
     */
    getArticle (node) {
      console.log(node)
      if (node.type === 'ARTICLE') {
        editor_api.getArticle(node.articleId)
          .then(res => {
            if (res.status === 200) {
              this.article = res.data
            }
            this.showDetails = true
            this.displayArticle = true
          })
          .catch(e => {
            console.log(e)
          })
      }
      // else {
      //   this.showDetails = false
      // }
    },
    /**
     * 增加目录
     */
    addCatalog(data) {
      console.log(data)
      let postData = {
        parent: data.id,
        label: "新文件夹",
        type: "CATALOG"
      }
      editor_api.insertCatalog(postData)
        .then(res => {
          if (res.status === 200 && res.data) {
            let data = res.data
            if (data.code === 404) {
              this.$message.error(data.message)
            } else {
              this.$message.success('创建目录成功！')
              this.loadCatalog()
            }
          } else {
            this.$message.error('创建目录失败!')
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    /**
     * 添加根目录
     */
    addCatalogRoot() {
      console.log(this.newCatalogRootName)
      if (this.newCatalogRootName.length === 0) {
        this.$message.error("请输入根目录名称！")
        return
      }
      editor_api.insertRoot({name: this.newCatalogRootName})
        .then(res => {
          if (res.status === 200 && res.data) {
            let data = res.data
            if (data.code === 404) {
              this.$message.error(data.message)
            } else {
              this.$message.success('创建目录成功！')
              this.loadCatalog()
            }
          } else {
            this.$message.error('创建目录失败!')
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    /**
     * 添加新文章
     */
    addArticle(data) {
      console.log(data)
      editor_api.insertArticle({
        title: '新文章',
        text: ''
      })
        .then(res => {
          if (res.status === 200) {
            let article = res.data
            // console.log(article)
            if (article.code === 404) {
              this.$message.error(article.message)
              return
            }
            editor_api.insertCatalog({
              parent: data.id,
              type: 'ARTICLE',
              articleId: article.id,
              label: '新文章'
            })
              .then(res => {
                if (res.status === 200 && res.data) {
                  this.loadCatalog()
                  this.$message.success('创建新文章成功！')
                }
              })
          } else {
            this.$message.error('创建文章失败！')
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    /**
     * 编辑器发生改变时的措施
     * @param value
     */
    handleChange(value) {
      console.log(value)
      this.article.text = value
      this.saveData(value, null,true)
    },
    /**
     * 保存数据
     */
    saveData(value, data, fromChange) {
      console.log(fromChange)
      // console.log(JSON.stringify(this.article))
      editor_api.updateArticle(this.article)
        .then(res => {
          console.log(res)
          if (!(res.status === 200 && res.data)) {
            this.$message.error("保存失败,请检查服务器网络!");
          }
          if (!fromChange) {
            if (res.data.code === 404) {
              this.$message.error(res.data.message)
            } else {
              this.$message.success('保存成功！')
            }
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    loadCatalog() {
      editor_api.getCatalog()
        .then(res => {
          if (res.status === 200) {
            this.catalog = res.data
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  /**
   * 需要加载目录和设置默认显示
   */
  mounted() {
    this.loadCatalog()
  }
}
</script>

<style scoped>
.title-row {
  display: flex;
  align-items: center;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.catalog-catlog{
  color: blue;
}

.catalog-article{
  color: #2c3e50;
}
</style>
