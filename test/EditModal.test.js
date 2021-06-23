// mountメソッドをインポート
import { mount } from '@vue/test-utils'
// テストするコンポーネント
import EditModal from '@/components/EditModal'

// コンポーネントがマウントされ、ラッパが作成される
const wrapper = mount(EditModal)

// wrapper.vmを介して実際のVueインスタンスにアクセスできる。
const vm = wrapper.vm


console.log(wrapper)
