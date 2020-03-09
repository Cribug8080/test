<template>
  <Modal
    :value="showModal"
    :closable="false"
    :width="700"
    :loading="loading"
    :mask-closable="false"
  >
    <div slot="header" style="text-align: center;font-size: 16px">请选择回退节点</div>
    <div style="text-align: center;font-size: 14px"><Icon type="ios-alert" style="color:orange"/><span style="color:#2d8cf0">选中的节点状态会清空。</span></div>
    <chart :options='option' @click="selectRollBackNode" :autoresize='true' :initOptions='option' style='width:100%;height:170px'></chart>
    <div style="display: flex">
      <Checkbox v-model="selectAll" style="margin-left:40px" @on-change="selectAllNodes">全选</Checkbox>
      <div class="can-select-status"></div>
      <div>可选状态</div>
      <div class="be-selected-status"></div>
      <div>已选状态</div>
      <div class="cannot-select-status"></div>
      <div>不可选状态</div>
    </div>
    <div class="back-text" v-if="firstNodesTitle.length">状态将回退至<span style="color:#2d8cf0">{{ firstNodesTitle.join('、') }}</span><label v-if="otherNodesTitle.length">，且</label><span style="color:#2d8cf0">{{ otherNodesTitle.join('、') }}</span><label v-if="otherNodesTitle.length">状态会被清空</label></div>
    <div v-else class="back-text">暂无回退节点</div>
    <Form :model="formData" :rules="rules" ref="rollbackForm" :label-width="120">
      <FormItem label="回退原因" prop="reason">
        <Input placeholder="请填写流程回退原因" v-model="formData.reason" style="width:520px"></Input>
      </FormItem>
      <FormItem>
        <div slot="label">消息通知</div>
        <Checkbox v-model="formData.inform" @on-change="showOwners">流程负责人</Checkbox>
        <div v-if="informedNames.length">{{ `${informedNames}将收到lark消息提醒` }}</div>
      </FormItem>
      <FormItem label="新增通知人">
        <searchFilterUser placeholder="搜索用户名，新增通知人" style="width:520px;" multiple :searchDemandName="user" :updateUser="updateSearchName"></searchFilterUser>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="default" @click="cancelRemove">取消</Button>
      <Button type="primary" @click="rollback">确定</Button>
    </div>
  </Modal>
</template>

<script>
  import ECharts from 'vue-echarts';
  import searchFilterUser from '../common/selectFilterUser';

  const MAX_HEIGHT = 1500;
  const X_GAP = 800;
  const X_START = -50;
  const Y_START = 20;

  export default {
    components: {
      chart: ECharts,
      searchFilterUser,
    },
    props: ['showModal', 'hideModal'],
    mounted() {
      this.setOption();
    },
    data() {
      return {
        option: {},
        nodes: [],
        edges: [],
        list: [],
        formData: {
          reason: '',
          inform: false,
          informedPeople: [],
        },
        rules: {
          reason: { required: true, message: '请填写流程回退原因！' },
        },
        user: '',
        rollBackNodes: [],
        selectAll: false,
        finishedNodes: [],
        firstNode: [],
        otherNodes: [],
        firstNodesTitle: [],
        otherNodesTitle: [],
        loading: true,
        informedNames: '',
      };
    },
    computed: {
      appId() {
        return this.$store.state.rocket.common.currentAppInfo.aid;
      },
      demandData() {
        return this.$store.state.rocket.projectManage.demandData;
      },
      workflow() {
        return this.demandData.workflows.nodes;
      },
    },
    methods: {
      selectAllNodes() {
        if (this.selectAll) {
          this.rollBackNodes = this.finishedNodes.slice();
          this.setOption();
        } else {
          this.rollBackNodes = [];
          this.setOption();
        }
        this.showOwners();
      },
      showOwners() {
        let informList = [];
        const informObj = {};
        if (this.formData.inform) {
          this.rollBackNodes.forEach((item) => {
            if (item.workflow_owner_name && !informObj[item.workflow_owner_name]) {
              informList.push(item.workflow_owner_name);
              informObj[item.workflow_owner_name] = true;
            }
          });
        } else {
          informList = [];
        }
        this.informedNames = informList.join('、');
      },
      selectRollBackNode(data) {
        if (data.data.Confirm_time) {
          if (this.rollBackNodes.some(item => item.Id === data.data.Id)) {
            this.rollBackNodes.splice(this.rollBackNodes.findIndex(item => item.Id === data.data.Id), 1);
          } else {
            this.rollBackNodes.push(data.data);
          }
          this.setOption();
        }
        if (this.rollBackNodes.length === this.finishedNodes.length) {
          this.selectAll = true;
        } else {
          this.selectAll = false;
        }
        if (this.formData.inform) {
          this.showOwners();
        }
      },
      updateSearchName(res) {
        this.formData.informedPeople = res;
      },
      cancelRemove() {
        this.hideModal();
      },
      fail() {
        this.loading = false;
        this.$nextTick(() => {
          this.loading = true;
        });
      },
      rollback() {
        if (!this.firstNode.length) {
          this.$Message.warning('你还未选中回退的节点！');
          this.fail();
          return;
        }
        this.$refs.rollbackForm.validate(async (valid) => {
          if (valid) {
            let informList = [];
            if (this.formData.inform) {
              this.rollBackNodes.forEach((item) => {
                if (item.workflow_owner_name) {
                  informList.push(item.workflow_owner_name);
                }
              });
            }
            informList = informList.concat(this.formData.informedPeople);
            const informObj = {};
            const noDuplicateInformList = [];
            informList.forEach((item) => {
              if (!informObj[item]) {
                informObj[item] = true;
                noDuplicateInformList.push(item);
              }
            });
            const params = {
              frontNodes: this.firstNode.map(item => item.Id),
              rollBackNodes: this.otherNodes.map(item => item.Id),
              reason: this.formData.reason,
              informedList: noDuplicateInformList,
            };
            this.$emit('rollback', params);
          }
        });
      },
      getColor(param) {
        const confirmTime = param.data.Confirm_time;
        if (this.rollBackNodes.some(item => item.Id === param.data.Id)) {
          return '#2d8cf0';
        }
        if (confirmTime) {
          return 'white';
        }
        return '#A9A9A9';
      },
      formatData(data) {
        (data || []).forEach((item) => {
          if (!item.Parent_tmpl) item.Parent_tmpl = [0];
          if (item.Attached_tmpl_id) {
            data.forEach((workflow) => {
              if (item.Attached_tmpl_id === (workflow.ID || workflow.Id) && this.deleteFlag === 0) {
                if (workflow.children) {
                  workflow.children.push(item);
                } else if (item.Attached_tmpl_id === (workflow.ID || workflow.Id) && this.deleteFlag === 1) {
                  if (workflow.children) {
                    workflow.children.pop(item);
                  }
                } else {
                  workflow.children = [item];
                }
              }
            });
          }
        });
        this.list = data.filter(item => item.Attached_tmpl_id === 0);
        this.finishedNodes = [];
        this.list.forEach((item) => {
          if (item.Confirm_time) {
            this.finishedNodes.push(item);
          }
        });
      },
      findFirstNode(edges, nodes) {
        const first_node = [];
        nodes.forEach((item) => {
          if (edges.filter(it => it.end_node === item.Id).length === 0) {
            first_node.push(item);
          }
        });
        return first_node;
      },
      sortNodes(firstNode, edges, nodes, allNodes) {
        const newNodes = [];
        firstNode.forEach((item) => {
          edges.forEach((ite) => {
            if (ite.start_node === item.Id) {
              const node = allNodes.filter(it => it.Id === ite.end_node)[0];
              if (!nodes.some(i => i.Id === node.Id)) {
                this.nodes.push(node);
                newNodes.push(node);
              }
            }
          });
        });
        if (newNodes.length) {
          this.sortNodes(newNodes, edges, this.nodes, allNodes);
        }
      },
      checkNode(firstNode, edges, nodes) {
        const newNodes = [];
        firstNode.forEach((item) => {
          edges.forEach((ite) => {
            if (ite.start_node === item.Id) {
              const newNode = nodes.filter(it => it.Id === ite.end_node)[0];
              newNodes.push(newNode);
            }
          });
        });
        if (newNodes.length) {
          newNodes.forEach((item) => {
            if (this.firstNode.some(ite => ite.Id === item.Id)) {
              this.firstNode.splice(this.firstNode.findIndex(it => it.Id === item.Id), 1);
            }
          });
          this.checkNode(newNodes, edges, nodes);
        }
      },
      setOption() {
        if (!this.demandData.workflows.nodes) return;
        this.formatData(this.demandData.workflows.nodes);
        const edges = this.demandData.workflows.edges || [];
        const nodes = this.list || [];
        const first_node = this.findFirstNode(edges, nodes);
        this.edges = [];
        this.nodes = [];
        this.nodes = first_node;
        this.sortNodes(first_node, edges, this.nodes, nodes);
        edges.forEach((item) => {
          this.edges.push({ source: item.start_node.toString(), target: item.end_node.toString() });
        });
        this.nodes.forEach((item) => {
          item.name = item.Id.toString();
          item.value = item.Title;
          item.id = item.Id.toString();
        });
        nodes.forEach((item) => {
          if (!this.nodes.some(it => Number(it.name) === item.Id)) {
            this.nodes.push({ ...item, name: item.Id.toString(), value: item.Title, id: item.Id.toString() });
          }
        });
        this.firstNode = this.rollBackNodes.slice();
        this.checkNode(this.rollBackNodes, edges, nodes);
        this.otherNodes = this.rollBackNodes.filter(item => !this.firstNode.includes(item));
        this.firstNodesTitle = this.firstNode.map(item => item.Title);
        this.otherNodesTitle = this.otherNodes.map(item => item.Title);
        const obj = { startIdObj: {}, endIdObj: {} };
        // 每个节点作为start 和end 的次数
        this.edges.forEach(({ source, target }) => {
          if (obj.startIdObj[source]) {
            obj.startIdObj[source] += 1;
          } else {
            obj.startIdObj[source] = 1;
          }
          if (obj.endIdObj[target]) {
            obj.endIdObj[target] += 1;
          } else {
            obj.endIdObj[target] = 1;
          }
        });
        const nodeStates = [];
        this.nodes.forEach((item) => {
          const currentId = item.id || '';
          // 在图标中的坐标依赖于node节点的顺序
          let indexNO = 0; // x横轴上的位置
          // 以当前节点作为end节点的 连接关系数组
          // eslint-disable-next-line no-shadow
          const itemConnection = this.edges.filter((item) => {
            return item.target === currentId;
          });
          // 当前节点的所有的父节点
          const sourceIdList = itemConnection.map(({ source }) => {
            return source;
          });
          const parentIndexNo = [];
          // 有父节点,则找到所有父节点的indexNO
          if (sourceIdList.length > 0) {
            // eslint-disable-next-line no-shadow
            nodeStates.forEach(({ id, indexNO }) => {
              if (sourceIdList.includes(id)) {
                parentIndexNo.push(indexNO);
              }
            });
            parentIndexNo.push(indexNO);
            indexNO = Math.max(...parentIndexNo, indexNO) + 1;
          }
          const newItem = {
            ...item,
            indexNO,
          };
          nodeStates.push(newItem);
        });

        nodeStates.forEach((item) => {
          const itemConnection = this.edges.filter((ite) => {
            return ite.target === item.ID;
          });
          const sourceIdList = itemConnection.map(({ source }) => {
            return source;
          });
          const parentIndexNo = [];
          if (sourceIdList.length > 0) {
            nodeStates.forEach((it) => {
              if (sourceIdList.includes(`${it.ID}`)) {
                parentIndexNo.push(it.indexNO);
              }
            });
          }
          if (parentIndexNo.length) {
            item.indexNO = Math.max(...parentIndexNo) + 1;
          }
          if (parentIndexNo.length === 2 && parentIndexNo[0] !== parentIndexNo[1] && (this.edges.filter(it => it.target === sourceIdList[0] && it.source === sourceIdList[1]) || this.edges.filter(it => it.target === sourceIdList[1] && it.source === sourceIdList[0]))) {
            item.indexNO -= 1;
          }
        });

        const dataList = nodeStates.map((item) => {
          const currentIndexNo = item.indexNO;
          const currentId = item.id;
          const brothers = nodeStates.filter((_item) => {
            return _item.indexNO === currentIndexNo;
          });
          const brothersLen = brothers.length;
          const Y_index = brothers.findIndex((brotherItem) => {
            return brotherItem.id === currentId;
          });

          const x = X_START + item.indexNO * X_GAP;
          const y = Y_START + Math.floor(MAX_HEIGHT * (Y_index + 1)) / (brothersLen + 1);
          return {
            ...item,
            x,
            y,
          };
        });

        const linkConnections = this.edges
          .map(({ source, target }) => {
            const startItem = nodeStates.find(({ id }) => id === source);
            const endItem = nodeStates.find(({ id }) => id === target);
            return (
              endItem &&
              startItem && {
                source: startItem.name,
                target: endItem.name,
              }
            );
          })
          .filter(o => o);
        const dataListF = dataList.map(({ id, ...rest }) => {
          return {
            ...rest,
            stateId: id,
            label: {
              color: '#515a6e',
              fontSize: 11,
              fontWeight: 'bold',
            },
          };
        });
        this.nodes = dataListF;
        this.edges = linkConnections;
        if (!this.nodes.length) {
          this.option = {};
          return;
        }
        this.option = {
          animationDurationUpdate: 1500,
          animationEasingUpdate: 'quinticInOut',
          series: [
            {
              nodeClick: true,
              type: 'graph',
              layout: 'none',
              symbolSize: 12,
              roam: false,
              force: {
                repulsion: 750,
                edgeLength: [150, 200],
                layoutAnimation: true,
              },
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    color: 'black',
                  },
                  distance: 1,
                  position: 'bottom',
                  formatter: (params) => {
                    return params.data.value;
                  },
                },
              },
              draggable: false,
              edgeSymbol: ['none', 'arrow'],
              edgeSymbolSize: [3, 5],
              data: this.nodes,
              links: this.edges,
              itemStyle: {
                normal: {
                  color: this.getColor,
                  borderColor: '#DCDCDC',
                },
              },
              lineStyle: {
                normal: {
                  color: '#DCDCDC',
                  shadowColor: '#000',
                  opacity: 0.9,
                  width: 1,
                  curveness: 0,
                },
              },
            },
          ],
        };
      },
    },
  };
</script>

<style scoped>
.back-text{
  margin: 30px 0 20px 40px;
  padding-right: 25px;
}
  .can-select-status{
    width:12px;
    height:12px;
    border-radius: 12px;
    background-color: white;
    border:1px solid #DCDCDC;
    margin:3px 0 0 315px;
  }
  .be-selected-status{
    width:12px;
    height:12px;
    border-radius: 12px;
    background-color: #2d8cf0;
    margin:3px 0 0 20px;
  }
  .cannot-select-status{
    width:12px;
    height:12px;
    border-radius: 12px;
    background-color: #A9A9A9;
    margin:3px 0 0 20px;
  }
</style>
