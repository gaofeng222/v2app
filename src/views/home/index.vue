<template>
  <g-container>
    <div>
      <el-row :gutter="10">
        <el-col :span="6">
          <el-card>
            <div>
              <CCheckbox v-model="logVue" value="自定义复选" />
              <hr />
              <!-- html元素上的v-model -->
              <input v-model="message" placeholder="edit me" />
              <p>Message is: {{ message }}</p>
              <!-- 复选框 -->
              <input type="checkbox" id="checkbox" v-model="checked" />
              <label for="checkbox">{{ checked }}</label>
              <!-- 多个复选框 -->
              <br />
              <input
                type="checkbox"
                id="jack"
                value="Jack"
                v-model="checkedNames"
              />
              <label for="jack">Jack</label>
              <input
                type="checkbox"
                id="john"
                value="John"
                v-model="checkedNames"
              />
              <label for="john">John</label>
              <input
                type="checkbox"
                id="mike"
                value="Mike"
                v-model="checkedNames"
              />
              <label for="mike">Mike</label>
              <br />
              <span>Checked names: {{ checkedNames }}</span>
              <!-- 单选按钮 -->
              <div id="example-4">
                <input type="radio" id="one" value="One" v-model="picked" />
                <label for="one">One</label>
                <br />
                <input type="radio" id="two" value="Two" v-model="picked" />
                <label for="two">Two</label>
                <br />
                <span>Picked: {{ picked }}</span>
              </div>
              <!-- 下拉框 -->
              <div id="example-5">
                <select v-model="selected">
                  <option disabled value="">请选择</option>
                  <option>A</option>
                  <option>B</option>
                  <option>C</option>
                </select>
                <span>Selected: {{ selected }}</span>
              </div>
              <!-- 多选 -->
              <div id="example-6">
                <select v-model="selected1" multiple style="width: 50px">
                  <option
                    v-for="option in options"
                    :value="option.value"
                    :key="option.text"
                  >
                    {{ option.text }}
                  </option>
                </select>
                <br />
                <span>Selected: {{ selected1 }}</span>
              </div>
              <!-- 单选 -->
              <p>{{ picked1 }}</p>
              <input type="radio" v-model="picked1" value="a" /> 正确
              <input type="radio" v-model="picked1" value="b" /> 错误

              <br />
              <!-- `toggle` 为 true 或 false -->
              <input
                type="checkbox"
                v-model="toggle"
                true-value="yes"
                false-value="no"
              />
              {{ toggle }}

              <br />
              {{ selected2 }}
              <select v-model="selected2">
                <!-- 内联对象字面量 -->
                <option :value="{ number: 123 }">123</option>
                <option :value="{ number: 456 }">456</option>
              </select>
              <br />
              {{ msg }}
              <input v-model.lazy="msg" />
              <br />
              {{ typeof age }}
              <input v-model.number="age" type="number" />
              <br />
              {{ typeof age }}
              <el-input v-model.number="age" placeholder="请输入年龄" />
              <br />
              {{ message1 }}
              <c-input @focus="onFocus" v-model="message1" label="姓名：" />
              <br />
              {{ doc }}
              <text-document :value.sync="doc" />
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div></div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div></div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div></div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </g-container>
</template>

<script>
import CCheckbox from '@/components/c-checkbox'
import CInput from '@/components/c-input'
import TextDocument from '@/components/text-document'
export default {
  components: {
    CCheckbox,
    CInput,
    TextDocument
  },
  data() {
    return {
      logVue: true,
      message: 'hello',
      checked: true,
      checkedNames: [],
      picked: '',
      selected: '',
      selected1: [],
      options: [
        { text: 'One', value: 'A' },
        { text: 'Two', value: 'B' },
        { text: 'Three', value: 'C' }
      ],
      picked1: '',
      toggle: false,
      selected2: { number: 456 },
      age: 0,
      msg: '',
      message1: 'testing...',
      doc: {
        title: 'hello',
        content: 'world'
      }
    }
  },
  methods: {
    onFocus() {
      console.log('focus')
    }
  }
}
</script>

<style lang="scss" scoped></style>
