<template>
  <div class="custom-datepicker-container">
    <span v-show="showOptions">类型:</span>
    <el-select
      v-show="showOptions"
      v-model="localValueType"
      size="mini"
      v-bind="elementSelectProps"
    >
      <el-option
        v-for="item in datepickerOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-date-picker
      v-model="localDate"
      v-bind="elementPickerProps"
      :type="localValueType"
      size="mini"
      :value-format="pickerValueFormat"
      :clearable="false"
    />
  </div>
</template>

<script>
import { format } from 'date-fns'

export default {
  name: 'CustomDatepicker',
  props: {
    showOptions: {
      type: Boolean,
      default: true
    },
    elementPickerProps: {
      type: Object,
      default: () => {}
    },
    elementSelectProps: {
      type: Object,
      default: () => {}
    },
    datepickerOptions: {
      type: Array,
      default: () => [{ label: '日', value: 'date', valueFormat: 'yyyy-MM-dd' }]
    },
    valueType: {
      type: String,
      default: 'date'
    },
    date: {
      type: [String, Array],
      default: undefined
    }
  },
  data() {
    return {
      localDate: this.date,
      localValueType: this.valueType
    }
  },
  computed: {
    pickerValueFormat() {
      return this.datepickerOptions.find(e => e.value === this.localValueType).valueFormat
    }
  },
  watch: {
    date(d) {
      this.localDate = d
    },
    localDate(value) {
      this.$emit('update:date', value)
    },
    localValueType(value) {
      this.$emit('update:valueType', value)
      if (Array.isArray(this.localDate)) {
        this.$emit('update:date', this.localDate.map(d => format(new Date(d), this.pickerValueFormat)))
      } else {
        this.$emit('update:date', format(new Date(this.localDate), this.pickerValueFormat))
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.custom-datepicker-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  color: white;
  font-size: 1.6vh;
  //background: linear-gradient(0deg,#b5f5ff 0%, #ffffff 100%);
  //-webkit-background-clip: text;
  //-webkit-text-fill-color: transparent;
  font-family: Microsoft YaHei, Microsoft YaHei-Bold;
  ::v-deep .el-select {
    background: inherit;
    .el-input {
      background: inherit;
      .el-input__inner {
        color: white;
        width: 4vh;
        font-size: 1.6vh;
        padding: 0;
        border: none;
        background: transparent;
      }
    }
  }
  ::v-deep .el-date-editor {
    width: fit-content;
    background: inherit;
    border: none;
    padding: 0 0 0 0.25vw;
    margin: 0;
    display: flex;
    align-items: center;
    font-size: 1.8vh;
    -webkit-background-clip: text;
    .el-input__inner {
      background: transparent;
      border: none;
      width: 12vh;
      padding: 0 0 0 3vh;
      color: white;
      font-size: 1.6vh;
      font-weight: 700;
    }
    //&.el-range-editor {
    //}
    .el-range-input {
      background: transparent;
      width: 9vh;
      padding-right: 0.5vh;
      font-size: 1.5vh;
      font-weight: 700;
      color: white;
      //-webkit-text-fill-color: #d1f8ff;
    }
    .el-input__prefix {
      color: white;
      //-webkit-text-fill-color: #d1f8ff;
    }
    .el-input__icon, .el-range__icon {
      font-size: 1.6vh;
      width: 2vh;
    }
    .el-range-separator {
      color: white;
      padding: 0;
    }
    .el-range__close-icon {
      display: none;
    }
  }
}
</style>
