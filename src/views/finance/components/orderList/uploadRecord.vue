<!--
 * @Desc: 上传流水单 - dialog
-->
<template>
  <div class="dialog">
    <el-dialog title="上传流水单" width="600px" :visible.sync="dialogVisible" @closed="handleClosed">
      <el-form :model="formData" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item label="流水单" prop="record">
          <imgUpload ref="imgUploadRef" v-model="formData.record" :limit="1" @success="handleImgUploadSuccess" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :loading="isLoading" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import imgUpload from '@/components/imgUpload'
import { uploadRecord } from '@/api/finance'
export default {
  name: '',
  data() {
    return {
      isLoading: false,
      rules: {
        record: [{ required: true, message: '请上传流水单', trigger: 'change' }]
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  components: { imgUpload },
  created() {},
  mounted() {},
  methods: {
    handleClosed() {
      this.$refs.formRef.resetFields()
    },
    handleImgUploadSuccess() {
      this.$refs.formRef.clearValidate('headImg')
    },
    onSubmit() {
      this.validateFunc(() => {
        console.log(this.formData)
        const { id, record } = this.formData
        const Img = record.join(',')
        const params = { orderId: id, record: Img }
        console.log('-params-', params)
        uploadRecord(params).then(res => {
          console.log('-res-', res)
          this.$message({
            message: '操作成功！',
            type: 'success'
          })
          this.$emit('successUpload')
          this.dialogVisible = false
        })
      })
    },
    validateFunc(callback) {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          callback()
          return
        }
        return false
      })
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
