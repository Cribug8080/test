import React, {
  ReactElement, useState, useRef,
} from 'react';
import ReactEcharts from 'echarts-for-react';
import { cloneDeep, differenceBy } from 'lodash';
import { useTranslation } from 'react-i18next';
import {
  Checkbox, Grid, Form, Input,
} from '@bytedesign/web-react';
import SelectUser from '../../../../components/selectUser';
import StatusList from './statusList';

// @ts-ignore
import styles from './index.scss';

const { Row } = Grid;
const { Item: FormItem, Control: FormControl } = Form;

interface Props {
  nodeList?: Node[],
  edgeList?: Edge[],
}

const MAX_HEIGHT = 1000;
const X_GAP = 550;
const X_START = -50;
const Y_START = 20;

interface Node {
  id: number;
  name: string;
  tags?: string[];
  task_status: number;
  scheduled_start_time: string;
  scheduled_end_time: string;
  pre_nodes: string[];
  can_delete: number;
  task_confirm_permission: string;
  third_party_status: any;
  task_confirm_info: any;
  task_checklist: any;
}

interface Edge {
  from_node: string;
  to_node: string;
}

enum statusType {
  ALLOW,
  CHECKED,
  DISABLE,
}

const nodeStyle = ['white', 'blue', 'gray'];

const examNode: Node[] = new Array(4).fill(1).map((v, i) => ({
  id: i,
  name: `node${i}`,
  task_status: i > 2 ? 2 : 0,
  scheduled_start_time: '',
  scheduled_end_time: '',
  pre_nodes: ['1'],
  can_delete: 1,
  task_confirm_permission: '1',
  third_party_status: '',
  task_confirm_info: '',
  task_checklist: '',
}));

const examEdge = new Array(2).fill(1).map((v, i) => ({
  from_node: `node${i}`,
  to_node: `node${i + 1}`,
}));
examEdge.push({
  from_node: 'node2',
  to_node: 'node3',
});

const sortNodes = (firstNode:Node[], edges:Edge[], nodes:Node[], allNodes:Node[]) => {
  const newNodes:Node[] = [];
  firstNode.forEach((item) => {
    edges.forEach((ite) => {
      if (ite.from_node === item.name) {
        const node = allNodes.filter((it) => it.name === ite.to_node)[0];
        if (!nodes.some((i) => i.name === node.name)) {
          nodes.push(node);
          newNodes.push(node);
        }
      }
    });
  });
  if (newNodes.length) {
    sortNodes(newNodes, edges, nodes, allNodes);
  } else {
    return nodes;
  }
  return nodes;
};

const findFirstNode = (edges:Edge[], nodes:Node[]) => {
  const first_node:Node[] = [];
  nodes.forEach((item:Node) => {
    if (edges.filter((it:Edge) => it.to_node === item.name).length === 0) {
      first_node.push(item);
    }
  });
  return first_node;
};

const findFirstBackNode = (edges: Edge[], checked: Node[]) => {
  const firstNode: Node[] = [];
  let otherNode: Node[] = [];
  checked.forEach((item:Node) => {
    const line = edges.find((itemEdge:Edge) => itemEdge.to_node === item.name);
    if (line) {
      if (checked.findIndex((itemNode: Node) => itemNode.name === line.from_node) === -1) {
        firstNode.push(item);
      }
    } else {
      firstNode.push(item);
    }
  });
  otherNode = differenceBy(
    checked,
    firstNode,
    (item: Node) => item.name,
  );
  return [firstNode, otherNode];
};

export default function index({ nodeList = examNode, edgeList = examEdge }: Props): ReactElement {
  const { t } = useTranslation();
  const [showLark, setShowLark] = useState(false);
  const [selected, setSelected] = useState<Node[]>([]);
  const [firstNode, setFirstNode] = useState<Node[]>([]);
  const [othersNode, setOthersNode] = useState<Node[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const canClick = useRef(nodeList.filter((v: Node) => v.task_status === statusType.ALLOW));

  const nodeStatus = (
    { data }: any,
  ): string => {
    const idx = selected.find((v: Node) => v.name === data.name);
    let res: statusType = statusType.DISABLE;
    if (idx === undefined) {
      if (data.task_status === statusType.DISABLE) {
        res = statusType.DISABLE;
      } else res = statusType.ALLOW;
    } else {
      res = statusType.CHECKED;
    }
    return nodeStyle[res];
  };

  const getOptions = () => {
    const oldEdges = edgeList.slice() || [];
    const nodes = nodeList.slice() || [];
    const first_node = findFirstNode(oldEdges, nodes);
    let edges:any[] = [];
    let newNodes:any[] = [];
    newNodes = first_node;
    newNodes = sortNodes(first_node, oldEdges, newNodes, nodes);
    oldEdges.forEach((item:Edge) => {
      edges.push({ source: item.from_node, target: item.to_node });
    });
    newNodes.forEach((oriItem) => {
      const item = cloneDeep(oriItem);
      item.value = item.name;
    });
    nodes.forEach((item: any) => {
      if (!newNodes.some((it) => it.name === item.name)) {
        newNodes.push({
          ...item, value: item.name,
        });
      }
    });
    const obj:any = { startIdObj: {}, endIdObj: {} };
    // 每个节点作为start 和end 的次数
    edges.forEach((eachEdge) => {
      const { source, target } = eachEdge;
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
    const nodeStates:any[] = [];
    newNodes.forEach((item) => {
      const currentId = item.name || '';
      // 在图标中的坐标依赖于node节点的顺序
      let indexNO = 0; // x横轴上的位置
      // 以当前节点作为end节点的 连接关系数组
      // eslint-disable-next-line no-shadow
      const itemConnection = edges.filter((item) => item.target === currentId);
      // 当前节点的所有的父节点
      const sourceIdList = itemConnection.map(({ source }) => source);
      const parentIndexNo:any[] = [];
      // 有父节点,则找到所有父节点的indexNO
      if (sourceIdList.length > 0) {
        // eslint-disable-next-line no-shadow
        nodeStates.forEach(({ name, indexNO }) => {
          if (sourceIdList.includes(name)) {
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
    nodeStates.forEach((oriItem) => {
      const item = cloneDeep(oriItem);
      const itemConnection = edges.filter((ite) => ite.target === item.name);
      const sourceIdList = itemConnection.map(({ source }) => source);
      const parentIndexNo:any = [];
      if (sourceIdList.length > 0) {
        nodeStates.forEach((it) => {
          if (sourceIdList.includes(it.name)) {
            parentIndexNo.push(it.indexNO);
          }
        });
      }
      if (parentIndexNo.length) {
        item.indexNO = Math.max(...parentIndexNo) + 1;
      }
      if (parentIndexNo.length === 2
        && parentIndexNo[0] !== parentIndexNo[1]
        && (edges.filter((it) => it.target === sourceIdList[0] && it.source === sourceIdList[1])
          || edges.filter((it) => it.target === sourceIdList[1]
            && it.source === sourceIdList[0]))) {
        item.indexNO -= 1;
      }
    });

    const dataList = nodeStates.map((item) => {
      const currentIndexNo = item.indexNO;
      const currentId = item.name;
      const brothers = nodeStates.filter((_item) => _item.indexNO === currentIndexNo);
      const brothersLen = brothers.length;
      const Y_index = brothers.findIndex((brotherItem) => brotherItem.name === currentId);

      const x = X_START + item.indexNO * X_GAP;
      const y = Y_START + Math.floor(MAX_HEIGHT * (Y_index + 1)) / (brothersLen + 1);
      return {
        ...item,
        x,
        y,
      };
    });

    const linkConnections = edges
      .map(({ source, target }) => {
        const startItem = nodeStates.find(({ name }) => name === source);
        const endItem = nodeStates.find(({ name }) => name === target);
        return (
          endItem
          && startItem && {
            source: startItem.name,
            target: endItem.name,
          }
        );
      })
      .filter((o) => o);
    const dataListF = dataList.map(({ id, ...rest }) => ({
      ...rest,
      stateId: id,
      label: {
        color: '#515a6e',
        fontSize: 11,
        fontWeight: 'bold',
      },
    }));
    newNodes = dataListF;
    edges = linkConnections;
    if (!newNodes.length) {
      return {};
    }
    return {
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
            },
          },
          draggable: false,
          edgeSymbol: ['none', 'arrow'],
          edgeSymbolSize: [3, 5],
          data: dataListF,
          links: linkConnections,
          itemStyle: {
            normal: {
              borderColor: '#000',
              color: nodeStatus,
            },
          },
          lineStyle: {
            normal: {
              color: '#dddee1',
              shadowColor: '#000',
              opacity: 0.9,
              width: 1,
              curveness: 0,
            },
          },
        },
      ],
    };
  };

  const handleEvents = {
    click: ({ data }: any) => {
      const idx = selected.findIndex((v: Node) => v.name === data.name);
      if (data.task_status !== statusType.DISABLE) {
        if (idx > -1) {
          selected.splice(idx, 1);
        } else selected.push(data);
        const [first, other] = findFirstBackNode(edgeList, selected);
        setFirstNode(first);
        setOthersNode(other);
        setSelectAll(canClick.current.length === selected.length);
        setSelected([...selected]);
        getOptions();
      }
    },
  };

  const handleSelect = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      const [first, other] = findFirstBackNode(edgeList, canClick.current);
      setSelected(canClick.current.slice());
      setFirstNode(first);
      setOthersNode(other);
    } else {
      setSelected([]);
      setFirstNode([]);
      setOthersNode([]);
    }
    getOptions();
  };

  const renderSelected = (data: Node[]) => data.map((item: Node, idx: number) => (
    <span key={item.name}>
      <span className={styles['selected-node']}>{item.name}</span>
      {idx === data.length - 1 ? '' : '、'}
    </span>
  ));

  return (
    <div>
      <ReactEcharts
        key={Math.random() + new Date().getTime()}
        option={getOptions()}
        onEvents={handleEvents}
        notMerge
        lazyUpdate
        style={{ height: '230px', left: '12px', top: '-8px' }}
      />
      <Row>
        <Checkbox
          checked={selectAll}
          onChange={handleSelect}
          style={{ verticalAlign: 'bottom' }}
        >全选
        </Checkbox>
        <StatusList style={{ float: 'right' }} />
      </Row>
      <Row>
        <Form>
          <FormItem label={<span />}>
            {
              firstNode.length > 0 ? (
                <>
                  {t('demandDetail.taskSchedule.backFlow.info.single')}
                  {renderSelected(firstNode)}
                  {
                    othersNode.length > 0 ? (
                      <>
                        {t('demandDetail.taskSchedule.backFlow.info.middle')}
                        {renderSelected(othersNode)}
                        {t('demandDetail.taskSchedule.backFlow.info.end')}
                      </>
                    ) : null
                  }
                </>
              ) : t('demandDetail.taskSchedule.backFlow.info.empty')
            }
          </FormItem>
          <FormItem label={t('demandDetail.taskSchedule.backFlow.form.reason')} required>
            <FormControl
              field="reason"
              rules={[
                { required: true, message: t('demandDetail.taskSchedule.backFlow.form.reasonPlaceholder') },
              ]}
            >
              <Input placeholder={t('demandDetail.taskSchedule.backFlow.form.reasonPlaceholder')} />
            </FormControl>
          </FormItem>
          <FormItem label={t('demandDetail.taskSchedule.backFlow.form.lark')}>
            <FormControl
              field="lark"
            >
              <Row>
                <Checkbox.Group>
                  <Checkbox onChange={(checked: boolean) => { setShowLark(checked); }}>{t('demandDetail.taskSchedule.backFlow.form.owner')}</Checkbox>
                </Checkbox.Group>
              </Row>
            </FormControl>
            {
              showLark ? (
                <div>
                  {t('demandDetail.taskSchedule.backFlow.form.roger')}
                </div>
              ) : null
            }
          </FormItem>
          <FormItem label={t('demandDetail.taskSchedule.backFlow.form.others')}>
            <FormControl
              field="others"
            >
              <SelectUser mode="multiple" />
            </FormControl>
          </FormItem>
        </Form>
      </Row>
    </div>
  );
}
