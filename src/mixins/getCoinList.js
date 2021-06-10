import { getCoinList } from '@/api/content'
import storage from '@/utils/storage'
export default {
  data() {
    return {
      coinList: []
    }
  },
  created() {
    if (storage.getItem('accept_coin_list')) {
      this.coinList = storage.getItem('accept_coin_list')
    } else {
      this.getMixinsCoinList()
    }
  },
  mounted() {
    this.getMixinsCoinList()
  },
  methods: {
    async getMixinsCoinList() {
      getCoinList().then(res => {
        const { data } = res
        data && (this.coinList = this.setCoinList(data))
        // console.log('-coin-list-', this.coinList)
      })
    },
    setCoinList(list) {
      let result = list.map((val, index) => {
        return { value: index + 1, label: val.coin }
      })
      result.unshift({ value: '', label: '全部' })
      storage.setItem('accept_coin_list', JSON.stringify(result))
      return result
    }
  }
}
