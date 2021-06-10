// 字段转中文 - 局部
/**
 * 字段转中文
 * 传v时返回匹配的label(用于转换中文)，不传v时返回data数组(用于el-select等数据)
 */
const getData = (data, v) => {
  if (v === undefined) {
    return data
  } else {
    for (let i = 0; i < data.length; i++) {
      if (data[i].value === v) {
        return data[i].label
      }
    }
  }
}

/**
 * 内容管理 - 币种
 */
export function getCoinList(v) {
  const data = [
    { value: '1', label: 'USD' },
    { value: '2', label: 'PHP' },
    { value: '3', label: 'CNY' },
    { value: '4', label: 'KRW' },
    { value: '5', label: 'MYR' },
    { value: '6', label: 'IDR' }
  ]
  return getData(data, v)
}
