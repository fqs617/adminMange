export default {
  data() {
    return {
      // 选中值存储
      selection: new Map(),
      len: 0
    }
  },

  props: {
    // 默认选中的值
    select: {
      type: Array,
      default: () => []
    },
    // 可选中的sku 默认200
    selectNumber: {
      type: Number,
      default: 200
    }
  },

  watch: {
    select(val) {
      let copyVal = this.$bqUtils.copy(val)
      if (copyVal.length <= 0) {
        return
      }
      this.selection.clear()
      copyVal.forEach(row => {
        row.checked = true
        this.onAddSelection(row)
      })
      this.$nextTick(() => {
        this.toggleSelection()
      })
    }
  },

  mounted() {
    if (this.select.length > 0) {
      this.selection.clear()
      this.select.forEach(row => {
        row.checked = true
        this.onAddSelection(row)
      })
    }
  },

  methods: {

    onSelect(selection, row) {
      this.onAddSelection(row)
    },

    onAddSelection(row) {
      let sku = row.sku
      if (!row.checked) {
        this.selection.has(sku) && this.selection.delete(sku)
        this.initLen()
        return
      }
      if (!this.selection.has(sku)) {
        this.selection.set(sku, row)
        this.initLen()
      }
    },

    onSelectAll(selection) {
      // 如果selection 是 空则移除当页的全部选中
      if (selection.length === 0) {
        this.list.forEach(row => {
          this.selection.delete(row.sku)
        })
        this.initLen()
        return
      }
      selection.map(row => {
        row.checked = true
        return row
      }).forEach(row => {
        this.onAddSelection(row)
      })
    },

    onSelection(selection) {
      if (selection.length <= 0) {
        return
      }
      let list = this.$bqUtils.copy(this.list)
      list.forEach(item => {
        let index = selection.findIndex(sel => sel.sku === item.sku)
        item.checked = index !== -1
      })
      this.allSelected[this.searchForm.page] = list
      this.currentSelected = this.getSelection()
    },

    selectable(row) {
      // 如果已经选中了 就取消禁用
      if (row.checked) {
        return row.checked
      }
      // 如果选中超出 number 则禁用
      return this.currentSelected.length < this.selectNumber
    },

    // checkbox 选中
    initSelected(row) {
      return row.checked
    },

    // 选中之前选中的数据
    toggleSelection() {
      let currentSelected = this.selection
      this.list.forEach(row => {
        let selection = currentSelected.get(row.sku) || {}
        row.checked = selection.checked || false
        if (this.$refs.table) {
          this.$refs.table.toggleRowSelection(row, row.checked)
        }
      })
    },

    initLen() {
      this.len = this.selection.size
    }

  }
}
