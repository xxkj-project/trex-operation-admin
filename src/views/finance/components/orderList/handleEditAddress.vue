<!--
 * @Desc: 修改地址 - dialog
-->
<template>
  <div class="dialog">
    <el-dialog title="修改地址" width="600px" :visible.sync="dialogVisible" @closed="handleClosed">
      <el-form :model="formData" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item label="地址" prop="address">
          <el-input v-model="formData.address"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="isLoading" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { editAddress } from '@/api/finance'
export default {
  name: '',
  data() {
    return {
      isLoading: false,
      rules: {
        address: [{ required: true, message: '请输入地址', trigger: 'blur' }]
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
  components: {},
  created() {},
  mounted() {},
  methods: {
    handleClosed() {
      this.handleReset()
    },
    onSubmit() {
      this.validateFunc(() => {
        const { id, address } = this.formData
        const params = { orderId: id, address }
        console.log('-params-', params)
        editAddress(params).then(res => {
          console.log('-res-', res)
          this.$message({
            message: '操作成功！',
            type: 'success'
          })
          this.$emit('success')
          this.dialogVisible = false
        })
      })
    },
    handleReset() {
      this.$refs.formRef.resetFields()
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
.el-input,
.el-input-number,
.el-select {
  width: 180px;
}
</style>
