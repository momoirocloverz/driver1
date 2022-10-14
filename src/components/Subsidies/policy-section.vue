<template>
  <div class="container">
    <hierarchical-stat-item label="粮食类占比" :value="FoodPolicyPercentage" unit="%">
      <stat-item title="政策清单" :value="policyData.length" unit="项" style="cursor:pointer;" @click.native="isPolicyModalVisible = true">
        <template #interactive-elem>
          <img class="icon" :src="require('@/assets/subsidies/modal-icon.webp')">
        </template>
      </stat-item>
      <stat-item title="粮食类" :value="foodPolicyData.length" unit="项" style="cursor:pointer;" @click.native="isFoodPolicyModalVisible = true">
        <template #interactive-elem>
          <img class="icon" :src="require('@/assets/subsidies/modal-icon.webp')">
        </template>
      </stat-item>
    </hierarchical-stat-item>
    <hierarchical-stat-item label="粮食类占比" value="29.9" unit="%">
      <stat-item title="累计金额" value="3.97" unit="亿元" />
      <stat-item title="粮食类金额" value="1.19" unit="亿元" />
    </hierarchical-stat-item>
    <policies-modal
      :visible="isPolicyModalVisible"
      title="政策清单"
      :table-data="policyData"
      @update:visible="isPolicyModalVisible = $event"
    />
    <policies-modal
      :visible="isFoodPolicyModalVisible"
      title="粮食类政策清单"
      :table-data="foodPolicyData"
      @update:visible="isFoodPolicyModalVisible = $event"
    />
  </div>
</template>

<script>
import HierarchicalStatItem from '@/components/Subsidies/hierarchical-stat-item'
import StatItem from '@/components/Subsidies/stat-item'
import PoliciesModal from '@/components/Subsidies/modals/policies-modal'
export default {
  name: 'PolicySection',
  components: { PoliciesModal, StatItem, HierarchicalStatItem },
  data() {
    return {
      isPolicyModalVisible: false,
      isFoodPolicyModalVisible: false,
      policyData: [
        {
          'id': '1',
          'source': '中央财政',
          'category': '补贴类',
          'name': '耕地地力保护补贴',
          'funding': '3896 ',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '2',
          'source': '中央财政',
          'category': '补贴类',
          'name': '省级粮食补贴发放工作补贴',
          'funding': '49 ',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '3',
          'source': '中央财政',
          'category': '补贴类',
          'name': '海洋捕捞渔船更新建造',
          'funding': '445 ',
          'table_type': '政策清单',
          'comment': '2015-2019年下达资金'
        },
        {
          'id': '4',
          'source': '中央财政、省级财政',
          'category': '补贴类',
          'name': '成品油价格改革对渔业的补贴',
          'funding': '420 ',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '5',
          'source': '中央财政、省级财政',
          'category': '补贴类',
          'name': '规模猪场贷款贴息',
          'funding': '12 ',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '6',
          'source': '中央财政、省级财政',
          'category': '补贴类',
          'name': '减船转产',
          'funding': '2308 ',
          'table_type': '政策清单',
          'comment': '2016-2019年'
        },
        {
          'id': '7',
          'source': '中央财政、省级财政、市级财政',
          'category': '补贴类',
          'name': '农机购置补贴',
          'funding': '1170 ',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '8',
          'source': '省级财政',
          'category': '补贴类',
          'name': '粮食生产贷款贴息',
          'funding': '180 ',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '9',
          'source': '省级财政',
          'category': '补贴类',
          'name': '订单良种奖励',
          'funding': '85 ',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '10',
          'source': '省级财政',
          'category': '补贴类',
          'name': '重大动物疫病强制免疫“先打后补”',
          'funding': '5 ',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '11',
          'source': '省级财政、市级财政',
          'category': '补贴类',
          'name': '规模种粮补贴（含旱粮生产补贴）',
          'funding': '4070 ',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '12',
          'source': '省级财政、市级财政',
          'category': '补贴类',
          'name': '生猪增产保供综合奖励',
          'funding': '1732 ',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '13',
          'source': '市级财政',
          'category': '补贴类',
          'name': '生猪预防性扑杀补偿资金',
          'funding': '203',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '14',
          'source': '市级财政',
          'category': '补贴类',
          'name': '粮食生产“补田亩”',
          'funding': '1300',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '15',
          'source': '市级财政',
          'category': '补贴类',
          'name': '农业政策性保险补贴',
          'funding': '885 ',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '17',
          'source': '中央财政',
          'category': '农业生产发展',
          'name': '推动优势特色主导产业发展',
          'funding': '212 ',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '18',
          'source': '中央财政',
          'category': '农业生产发展',
          'name': '农业生产社会化服务',
          'funding': '87 ',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '19',
          'source': '中央财政、省级财政',
          'category': '农业生产发展',
          'name': '产业融合绿色发展（现代农业园区、产业强镇等）',
          'funding': '100',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '20',
          'source': '省级财政',
          'category': '农业生产发展',
          'name': '稻渔综合种养项目',
          'funding': '57 ',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '21',
          'source': '省级财政',
          'category': '农业生产发展',
          'name': '芦笋标准化生产示范县',
          'funding': '130 ',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '22',
          'source': '省级财政',
          'category': '农业生产发展',
          'name': '水产健康养殖示范场创建',
          'funding': '52 ',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '23',
          'source': '省级财政',
          'category': '农业生产发展',
          'name': '粮食高产创建项目',
          'funding': '38 ',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '24',
          'source': '省级财政',
          'category': '农业生产发展',
          'name': '农业产业技术示范与推广',
          'funding': '20 ',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '26',
          'source': '省级财政',
          'category': '农业生产发展',
          'name': '新品种新技术试验示范',
          'funding': '25 ',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '27',
          'source': '市级财政',
          'category': '农业生产发展',
          'name': '省级乡村振兴产业发展示范县建设',
          'funding': '3078',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '28',
          'source': '市级财政',
          'category': '农业生产发展',
          'name': '农业产业化发展',
          'funding': '2631 ',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '29',
          'source': '中央财政',
          'category': '资源保护与利用',
          'name': '渔业增殖放流',
          'funding': '18 ',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '30',
          'source': '中央财政、市级财政',
          'category': '资源保护与利用',
          'name': '秸秆综合利用',
          'funding': '924 ',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '31',
          'source': '中央财政、省级财政、市级财政',
          'category': '农田建设',
          'name': '高标准农田建设',
          'funding': '2611 ',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '32',
          'source': '市级财政',
          'category': '强村富民',
          'name': '强村富民工程',
          'funding': '260 ',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '33',
          'source': '市级财政',
          'category': '强村富民',
          'name': '低收入农户贷款贴息',
          'funding': '1 ',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '34',
          'source': '中央财政',
          'category': '污染防治',
          'name': '统防统治与绿色防控',
          'funding': '24 ',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '35',
          'source': '中央财政',
          'category': '污染防治',
          'name': '退化耕地治理和耕地质量等级调查',
          'funding': '14 ',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '36',
          'source': '中央土壤污染防治专项资金',
          'category': '污染防治',
          'name': '土壤污染防治',
          'funding': '10 ',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '37',
          'source': '省级财政',
          'category': '污染防治',
          'name': '耕地质量保护与提升',
          'funding': '125 ',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '38',
          'source': '市级财政',
          'category': '农业人才支撑',
          'name': '农技能力提升（含丰收奖）',
          'funding': '123 ',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '39',
          'source': '中央财政',
          'category': '农业人才支撑',
          'name': '新型职业农民培育',
          'funding': '34 ',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '40',
          'source': '省级财政',
          'category': '农业人才支撑',
          'name': '千万农民素质提升',
          'funding': '101 ',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '41',
          'source': '中央财政',
          'category': '农业人才支撑',
          'name': '基层农技推广体系建设',
          'funding': '100 ',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '42',
          'source': '市级财政',
          'category': '农业人才支撑',
          'name': '乡村人才振兴',
          'funding': '-- ',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '43',
          'source': '省级财政',
          'category': '防灾减灾',
          'name': '水稻“两迁”害虫监测',
          'funding': '100 ',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '44',
          'source': '中央财政、省级财政、市级财政',
          'category': '防灾减灾',
          'name': '病死畜禽无害化处理',
          'funding': '58 ',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '45',
          'source': '省级财政、市级财政',
          'category': '防灾减灾',
          'name': '农业生物灾害监测预警与防控',
          'funding': '45 ',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '46',
          'source': '省级财政',
          'category': '防灾减灾',
          'name': '渔业安全生产',
          'funding': '40 ',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '47',
          'source': '省级财政',
          'category': '防灾减灾',
          'name': '动物疫病监测补助',
          'funding': '18 ',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '48',
          'source': '市级财政',
          'category': '防灾减灾',
          'name': '疫情监测补助',
          'funding': '9 ',
          'table_type': '政策清单',
          'comment': ''
        },
        {
          'id': '49',
          'source': '市级财政',
          'category': '其他',
          'name': '农资监管与服务信息化建设',
          'funding': '10 ',
          'table_type': '政策清单',
          'comment': ''
        }
      ],
      foodPolicyData: [
        {
          'id': '50',
          'source': '中央财政',
          'category': '补贴类',
          'name': '耕地地力保护补贴',
          'funding': '3896 ',
          'table_type': '粮食类补贴',
          'comment': null
        },
        {
          'id': '51',
          'source': '中央财政、省级财政、市级财政',
          'category': '补贴类',
          'name': '农机购置补贴',
          'funding': '1170 ',
          'table_type': '粮食类补贴',
          'comment': null
        },
        {
          'id': '52',
          'source': '省级财政',
          'category': '补贴类',
          'name': '粮食生产贷款贴息',
          'funding': '180 ',
          'table_type': '粮食类补贴',
          'comment': null
        },
        {
          'id': '53',
          'source': '省级财政',
          'category': '补贴类',
          'name': '订单良种奖励',
          'funding': '85 ',
          'table_type': '粮食类补贴',
          'comment': null
        },
        {
          'id': '54',
          'source': '省级财政、市级财政',
          'category': '补贴类',
          'name': '规模种粮补贴（含旱粮生产补贴）',
          'funding': '4070 ',
          'table_type': '粮食类补贴',
          'comment': null
        },
        {
          'id': '55',
          'source': '市级财政',
          'category': '补贴类',
          'name': '粮食生产“补田亩”',
          'funding': '1300',
          'table_type': '粮食类补贴',
          'comment': null
        },
        {
          'id': '56',
          'source': '市级财政',
          'category': '补贴类',
          'name': '农业政策性保险补贴',
          'funding': '885 ',
          'table_type': '粮食类补贴',
          'comment': null
        },
        {
          'id': '57',
          'source': '省级财政',
          'category': '农业生产发展',
          'name': '粮食高产创建项目',
          'funding': '38 ',
          'table_type': '粮食类补贴',
          'comment': null
        },
        {
          'id': '58',
          'source': '中央财政',
          'category': '污染防治',
          'name': '统防统治与绿色防控',
          'funding': '24 ',
          'table_type': '粮食类补贴',
          'comment': null
        },
        {
          'id': '59',
          'source': '省级财政',
          'category': '污染防治',
          'name': '耕地质量保护与提升',
          'funding': '125 ',
          'table_type': '粮食类补贴',
          'comment': null
        },
        {
          'id': '60',
          'source': '省级财政',
          'category': '防灾减灾',
          'name': '水稻“两迁”害虫监测',
          'funding': '100 ',
          'table_type': '粮食类补贴',
          'comment': null
        }
      ]
    }
  },
  computed: {
    FoodPolicyPercentage() {
      return (100 * this.foodPolicyData.length / Math.max(this.policyData.length, 1)).toFixed(1)
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.container {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  .icon {
    width: 1em;
    height: 1em;
    margin-left: 0.5vh;
    cursor: pointer;
  }
}
</style>
