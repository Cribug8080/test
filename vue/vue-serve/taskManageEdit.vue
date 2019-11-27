<template>
  <div>
    <div class="bread-nav clearfix">
      <Breadcrumb class="bread-nav-route">
        <BreadcrumbItem to="/">
          <Icon type="ios-home-outline"></Icon>首页
        </BreadcrumbItem>
        <BreadcrumbItem to="/taskManage">
          任务管理
        </BreadcrumbItem>
        <BreadcrumbItem>
          编辑任务
        </BreadcrumbItem>
      </Breadcrumb>
      <!--<div style="float:right;">-->
      <!--<Button type="text" @click="jobResultModal = true">-->
      <!--<Icon type="md-create" />-->
      <!--任务输出-->
      <!--</Button>-->
      <!--</div>-->
    </div>
    <div class="container jobManage-edit">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120" inline>
        <Card style="margin-top:10px;">
          <p slot="title">
            基本信息
          </p>
          <div class="task-mess">
            <FormItem label="任务名称" prop="jobName" class="form-item-30">
              <Input v-model="formValidate.jobName" placeholder="请输入任务名称"></Input>
            </FormItem>

            <FormItem label="任务类型" prop="jobType" class="form-item-30">
              <Select v-model="formValidate.jobType" placeholder="选择任务类型" label-in-value @on-change="showEditor">
                <Option v-for="(type,index) in jobTypeList" :key="index" :value="type.id">{{type.typeName}}</Option>
              </Select>
            </FormItem>
            <FormItem label="任务标签" prop="jobLabel" class="form-item-30">
              <Select v-model="formValidate.jobLabel" placeholder="选择任务标签" filterable>
                <Option v-for="(label,index) in jobLabelList" :key="index" :value="label.id">{{label.labelName}}</Option>
              </Select>
            </FormItem>
            <FormItem label="任务优先级" prop="priorityLevel" class="form-item-30">
              <Input v-model="formValidate.priorityLevel" placeholder=""></Input>
            </FormItem>
            <!--<FormItem label="执行服务器" prop="machineId" class="form-item-30">-->
              <!--<Select v-model="formValidate.machineId" placeholder="请选择执行服务器">-->
                <!--<Option v-for="(machine,index) in machineList" :key="index" :value="machine.id">{{machine.hostName}}&nbsp;&nbsp;&nbsp;&nbsp;{{machine.remark}}</Option>-->
              <!--</Select>-->
            <!--</FormItem>-->
            <FormItem label="执行服务器" prop="tagType" class="form-item-30" v-if="Number(formValidate.jobType) === 1 || Number(formValidate.jobType) === 2 || Number(formValidate.jobType) === 3 || Number(formValidate.jobType) === 5 || Number(formValidate.jobType) === 6 || Number(formValidate.jobType) === 7 ">
              <Select v-model="formValidate.tagType" placeholder="请选择执行服务器" filterable>
                <Option v-for="(tagType,index) in tagTypeList" :key="index" :value="tagType">{{tagType}}</Option>
              </Select>
            </FormItem>
            <FormItem label="执行命令" prop="exeCmd" class="form-item-30 form-item-exeCmd exeCmd" v-if="Number(formValidate.jobType) === 1 || Number(formValidate.jobType) === 7">
              <Input v-model="formValidate.exeCmd" placeholder=""></Input>
            </FormItem>
            <FormItem label="并发类型" prop="ccrId" class="form-item-30">
              <Select v-model="formValidate.ccrId" placeholder="选择并发类型" filterable>
                <Option v-for="(type,index) in concurrentTypeList" :key="index" :value="type.id" :label="type.ccrName">
                  <div>
                    <span>{{type.ccrName}}</span>
                    <span style="color:#ccc;margin-left:20px;">{{type.concurrency}}</span>
                  </div>
                </Option>
              </Select>
            </FormItem>
            <!--<FormItem label="用户工作组" prop="groupId" class="form-item-30">-->
              <!--<Select v-model="formValidate.groupId" placeholder="选择用户工作组">-->
                <!--<Option v-for="(item,index) in userGroupList" :key="index" :value="item.id">{{item.groupName}}</Option>-->
              <!--</Select>-->
            <!--</FormItem>-->
            <FormItem label="是否有效" prop="isValid" class="form-item-30">
              <Select v-model="formValidate.isValid" placeholder="">
                <Option value="0">有效</Option>
                <Option value="1">无效</Option>
                <Option value="10" v-if="Number(isValidDraft) === 10">草稿</Option>
              </Select>
            </FormItem>
            <FormItem label="超时时长" prop="timeOut" class="form-item-30">
              <Input v-model="formValidate.timeOut" placeholder="">
                <span slot="append">秒</span>
              </Input>
            </FormItem>
            <FormItem label="数据源" prop="dataSourceId" class="form-item-30" v-if="Number(formValidate.jobType) === 5">
              <Select v-model="formValidate.dataSourceId" placeholder="请选择数据源" filterable>
                <Option v-for="(target,index) in targetIdList" :key="index" :value="target.id" v-if="Number(target.isValid) === 0">{{target.targetName}}</Option>
              </Select>
            </FormItem>
            <FormItem label="是否支持并发" prop="isMutex" class="form-item-30 type">
              <Select v-model="formValidate.isMutex" placeholder="">
                <Option value="0">支持</Option>
                <Option value="1">不支持——排队</Option>
                <Option value="2">不支持——失败</Option>
              </Select>
            </FormItem>
            <FormItem label="重试次数" prop="retryTimes" class="form-item-30">
              <Input v-model="formValidate.retryTimes" type="text" placeholder=""></Input>
            </FormItem>
            <FormItem label="重试间隔" prop="retryInterval" class="form-item-30">
              <Input v-model="formValidate.retryInterval"  placeholder="">
                <span slot="append">秒</span>
              </Input>
            </FormItem>
            <FormItem label="告警模板" prop="alarmActionId" class="form-item-30">
              <Select v-model="formValidate.alarmActionId" placeholder="" clearable filterable @on-clear="clearAlarmAction">
                <Option v-for="(item, alarm_index) in alarmActionList" :value="item.id" :key="item.id">{{item.actionName}}</Option>
              </Select>
            </FormItem>
            <FormItem label="最迟开始时间" prop="lateStartTime" class="form-item-30">
              <Row>
                <Col span="24">
                  <FormItem prop="lateStartTime">
                    <!--<DatePicker type="datetime" format="yyyy-MM-dd HH:mm" v-model="formValidate.lateStartTime" placeholder="选择时间" style="width: 200px"></DatePicker>-->
                    <TimePicker
                      format="HH:mm"
                      :value="formValidate.lateStartTime"
                      @on-change="startTimeChange"
                    >
                    </TimePicker>
                  </FormItem>
                </Col>
              </Row>
            </FormItem>

            <FormItem label="最迟结束时间" prop="lateFinishTime" class="form-item-30">
              <Row>
                <Col span="24">
                  <FormItem prop="lateFinishTime">
                    <TimePicker
                      format="HH:mm"
                      :value="formValidate.lateFinishTime"
                      @on-change="finishTimeChange"
                    >
                    </TimePicker>
                    <!--<DatePicker type="datetime" format="yyyy-MM-dd HH:mm" v-model="formValidate.lateFinishTime" placeholder="选择时间" style="width: 200px"></DatePicker>-->
                  </FormItem>
                </Col>
              </Row>
            </FormItem>

            <FormItem v-if="fileItemStatus && Number(formValidate.jobType) !== 4" label="上传脚本" prop="fileToUpload" class="upload-script">
              <!--<input type="upload" v-on:change="uploading($event)">-->
              <div>
                <span v-if="formValidate.fileName !== null" style="float:left;margin-right:10px;">{{ formValidate.fileName }}
                </span>
                <Upload
                  :before-upload="handleUpload"
                  action=""
                  style="float:left;margin-right:10px;">
                  <Button icon="ios-cloud-upload-outline">选择文件</Button>
                </Upload>
                <Button type="info" @click="updateJobFile">更新文件</Button>
                <Button type="warning" @click="deleteJobFileTip">删除文件</Button>
                <Dropdown @on-click="fileDownLoad" style="margin-left: 5px;" >
                  <Button type="default">
                    脚本下载
                    <Icon type="ios-arrow-down"></Icon>
                  </Button>
                  <DropdownMenu slot="list">
                    <DropdownItem name="currentFile">
                      当前脚本
                      <!--<a v-if="downLoadMess.code === 1" :href="downLoadMess.url">当前脚本</a>-->
                      <!--<a v-if="downLoadMess.code === -1" href="javascript:void(0)" @click="downLoadWarn">当前脚本</a>-->
                    </DropdownItem>
                    <Dropdown placement="right-start">
                      <DropdownItem>
                        历史脚本
                        <Icon type="ios-arrow-forward"></Icon>
                      </DropdownItem>
                      <DropdownMenu slot="list" v-if="fileList.length>0">
                        <DropdownItem class="ellipsis" v-for="(file, file_index) in fileList" :key="file_index" :name="file.timestamp" :title="file.title">{{file.name}}</DropdownItem>
                      </DropdownMenu>
                      <DropdownMenu slot="list" v-else>
                        <DropdownItem name="nonFile">暂无脚本文件</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </FormItem>
            <FormItem label="sql语句" prop="sqlScript" :style="{width:'100%'}" v-if="sqlItemStatus">
              <div style="border: 1px solid #ccc;position: relative;">
                <div class="ace-action">
                  <Dropdown @on-click="sqlOperate">
                    <Button type="primary" class="flat-btn">
                      <!--sql操作-->
                      <Icon type="ios-arrow-down"></Icon>
                    </Button>
                    <DropdownMenu slot="list">
                      <DropdownItem name="bloodAnalysis">血缘分析</DropdownItem>
                      <!--<DropdownItem name="sqlFormate">sql格式化</DropdownItem>-->
                      <Dropdown placement="right-start">
                        <DropdownItem>
                          sql历史列表
                          <Icon type="ios-arrow-forward"></Icon>
                        </DropdownItem>
                        <DropdownMenu slot="list" v-if="sqlList.length>0">
                          <DropdownItem class="ellipsis" v-for="(sql, sql_index) in sqlList" :key="sql_index" :name="sql.timestamp" :title="sql.title">{{sql.title}}</DropdownItem>
                        </DropdownMenu>
                        <DropdownMenu slot="list" v-else>
                          <DropdownItem name="nonSql">暂无历史sql</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </DropdownMenu>
                  </Dropdown>
                </div>
                <!--<Button type="primary" class="flat-btn" style="position:absolute;right: 0;top: 0;z-index:20;">血缘分析</Button>-->
                <!--<ace-editor :val="sqlValue" ref="aceEditor" @bloodData="bloodResult" @completeAnalysis="showBloodModal"></ace-editor>-->
                <ace-editor :val="sqlValue" ref="aceEditor" @bloodData="bloodResult" @sqlValue="sqlValueChange"></ace-editor>
              </div>
            </FormItem>
            <!--pythonScript-->
            <FormItem label="在线脚本" :style="{width:'100%'}" v-if="sqlItemStatus === false">
              <!--<div>-->
                <!---->
              <!--</div>-->
              <div>
                <Input v-model="formValidate.olScriptFileName" placeholder="请输入脚本名称" style="width:23%;margin-bottom: 5px;"></Input>
              </div>
              <div style="border: 1px solid #ccc;position: relative;">
                <div class="ace-action">
                  <Dropdown @on-click="pythonOperate">
                    <Button type="primary" class="flat-btn">
                      <!--在线脚本操作-->
                      <Icon type="ios-arrow-down"></Icon>
                    </Button>
                    <DropdownMenu slot="list" class="python-list">
                      <Dropdown placement="right-start">
                        <DropdownItem>
                          历史列表
                          <Icon type="ios-arrow-forward"></Icon>
                        </DropdownItem>
                        <!--<DropdownMenu slot="list" v-if="pythonList.length>0" style="width:180px;">-->
                        <DropdownMenu slot="list" v-if="pythonList.length>0">
                          <DropdownItem class="ellipsis" v-for="(python, pathon_index) in pythonList" :key="pathon_index" :name="python.timestamp" :title="python.title">{{python.name}}&nbsp;&nbsp;&nbsp;{{python.updateTime}}</DropdownItem>
                        </DropdownMenu>
                        <DropdownMenu slot="list" v-else>
                          <DropdownItem name="nonPython">暂无历史</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </DropdownMenu>
                  </Dropdown>
                </div>
                <ace-python :valPython="pythonValue" ref="acePython"></ace-python>
              </div>
            </FormItem>

            <div class="data-export" v-show="Number(formValidate.jobType) === 4">
              <FormItem label="导出类型" prop="exportType" class="form-item-30">
                <Select v-model="formValidate.exportType" placeholder="请选择导出类型" filterable @on-change="handleExportTypeChange">
<!--                  <Option :key="'exportType-' + 0" :value="0">hive->mysql</Option>-->
<!--                  <Option :key="'exportType-' + 1" :value="1">mysql->mongodb</Option>-->
                  <Option :key="index" :value="item.key" v-for="(item, index) in exportTypeList">{{item.val}}</Option>
                </Select>
              </FormItem>
              <FormItem label="数据源" prop="sourceId" class="form-item-30" v-show="Number(formValidate.exportType) === 1">
                <Select v-model="formValidate.sourceId" placeholder="请选择数据源" filterable @on-change="handleChangeSourceId">
                  <Option v-for="(target,index) in targetIdList" :key="index" :value="target.id" v-if="Number(target.isValid) === 0">{{target.targetName}}</Option>
                  <Option :key="-1" :value="-1" class="target-item-tidb">tidb</Option>
                </Select>
              </FormItem>
              <FormItem label="源库名" prop="sourceDb" class="form-item-30">
                <Input v-model="formValidate.sourceDb" placeholder="请输入源库名"></Input>
              </FormItem>
              <FormItem label="源表名" prop="sourceTb" class="form-item-30">
                <Input v-model="formValidate.sourceTb" placeholder="请输入源表名"></Input>
              </FormItem>
              <FormItem label="源表过滤条件" prop="sourceWhere" class="form-item-30">
                <Input v-model="formValidate.sourceWhere" placeholder="源表过滤条件"></Input>
              </FormItem>
              <FormItem label="目标库" prop="targetDb" class="form-item-30">
                <Input v-model="formValidate.targetDb" placeholder="请输入目标库"></Input>
              </FormItem>
              <FormItem label="目标表" prop="targetTb" class="form-item-30">
                <Input v-model="formValidate.targetTb" placeholder=""></Input>
              </FormItem>
              <FormItem label="目标源" prop="targetId" class="form-item-30">
                <Select v-model="formValidate.targetId" placeholder="请选择目标源" filterable>
                  <Option v-for="(target,index) in targetIdList" :key="index" :value="target.id"  v-if="Number(target.isValid) === 0">{{target.targetName}}</Option>
                  <Option :key="-1" :value="-1" class="target-item-tidb">tidb</Option>
                </Select>
              </FormItem>
              <FormItem label="导出源字段" prop="sourceColumns" class="form-item-30" v-show="Number(formValidate.exportType) === 0">
                <Input v-model="formValidate.sourceColumns" placeholder="导出字段"></Input>
              </FormItem>

              <FormItem label="导出并发数" prop="current" class="form-item-30 exeCmd" v-show="Number(formValidate.exportType) === 0">
                <Input v-model="formValidate.current" placeholder="导出的并发数"></Input>
              </FormItem>
              <FormItem label="导出前目标源操作" prop="targetPresql" class="form-item-30">
                <Input v-model="formValidate.targetPresql" placeholder="">
                </Input>
              </FormItem>
              <FormItem label="导出目标字段" prop="targetColumns" class="form-item-30" v-show="Number(formValidate.exportType) === 0">
                <Input v-model="formValidate.targetColumns" placeholder="">
                </Input>
              </FormItem>
              <FormItem label="更新列" prop="updateKey" class="form-item-30" v-show="Number(formValidate.exportType) === 0">
                <Input v-model="formValidate.updateKey" placeholder="">
                </Input>
              </FormItem>
              <FormItem label="更新模式" prop="updateMode" class="form-item-30" v-show="Number(formValidate.exportType) === 0">
                <Select v-model="formValidate.updateMode" placeholder="请选择更新模式" filterable clearable>
                  <Option key="updateonly" value="updateonly">updateonly</Option>
                  <Option key="allowinsert" value="allowinsert">allowinsert</Option>
                </Select>
              </FormItem>
              <FormItem label="sql语句" prop="sourceQuery" :style="{width:'100%'}" v-show="Number(formValidate.exportType) === 0">
                <div style="border: 1px solid #ccc;position: relative;">
                  <ace-editor :val="sqlValueExport" ref="aceEditorExport"></ace-editor>
                </div>
              </FormItem>

              <!--<div class="data-title">-->
              <!--<label>Hbase参数</label>-->
              <!--</div>-->
              <!--<FormItem label="是否已预建hbase表" prop="targetExisted" class="form-item-30">-->
              <!--<Select v-model="formValidate.targetExisted" placeholder="">-->
              <!--<Option value="0">是</Option>-->
              <!--<Option value="1">否</Option>-->
              <!--</Select>-->
              <!--</FormItem>-->
              <!--<FormItem label="字段映射关系" prop="columnMapping" class="form-item-30">-->
              <!--<Input v-model="formValidate.columnMapping" type="text" placeholder=""></Input>-->
              <!--</FormItem>-->
              <!--<FormItem label="rowkey字段" prop="rowkey" class="form-item-30">-->
              <!--<Input v-model="formValidate.rowkey"  placeholder="">-->
              <!--</Input>-->
              <!--</FormItem>-->
            </div>
            <FormItem label="备注" prop="remark" :style="{width:'100%'}">
              <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
            </FormItem>
          </div>
        </Card>
        <Card style="margin-top:10px;">
          <p slot="title">
            依赖信息
          </p>
          <div class="task-mess">
            <FormItem label="依赖类型" prop="type" class=" type" style="width:40%;">
              <RadioGroup v-model="typeId">
                <Radio label="0">时间依赖</Radio>
                <Radio label="1">任务依赖</Radio>
              </RadioGroup>
              <Button v-if="Number(typeId) === 1" type="primary" @click="jobOptionList">job列表</Button>
            </FormItem>
            <FormItem v-if="Number(typeId) === 0" label="时间表达式" prop="crontabExpression" class="form-item-30">
              <Input v-model="formValidate.crontabExpression" type="text" placeholder="请输入表达式"></Input>
            </FormItem>
            <br>
            <FormItem label="依赖任务" :label-width="100" v-if="typeId == 1 && jobListConfirmInfo.length>0">
              <div>
                <!--<Tag v-for="(item,index) in jobListConfirm" color="success" :key="index">{{item}}</Tag>-->
                <Tooltip max-width="300" v-for="(item,index) in jobListConfirmInfo" :key="index" :content="item.jobName">
                  <Tag class="ellipsis" color="success">
                    {{item.jobName}}
                  </Tag>
                </Tooltip>
              </div>
            </FormItem>
          </div>
        </Card>
        <!--前置检测:附加条件-->
        <Card style="margin-top:10px;" v-if="Number(typeId) === 1">
          <p slot="title">
            扩展条件检测
          </p>
          <div class="task-mess">
            <FormItem label="执行条件" class="form-item-25">
              <Select v-model="extendCondition.preType" clearable placeholder="选择执行条件">
                <Option  value="1" key="1">每月</Option>
                <Option  value="2" key="2">每周</Option>
                <Option  value="3" key="3">每日</Option>
              </Select>
            </FormItem>
            <FormItem label="" :label-width="0" v-if="Number(extendCondition.preType) === 1" class="form-item-25">
              <Select v-model="extendCondition.dayList" clearable multiple>
                <Option  v-for="item in dayList" :value="item.id" :key="item.id">{{item.val}}日</Option>
              </Select>
            </FormItem>
            <FormItem label="" :label-width="0" v-if="Number(extendCondition.preType) === 2" class="form-item-25">
              <Select v-model="extendCondition.weekDay" clearable >
                <Option  value="1" key="1">周一</Option>
                <Option  value="2" key="2">周二</Option>
                <Option  value="3" key="3">周三</Option>
                <Option  value="4" key="4">周四</Option>
                <Option  value="5" key="5">周五</Option>
                <Option  value="6" key="6">周六</Option>
                <Option  value="7" key="7">周日</Option>
              </Select>
            </FormItem>
            <FormItem label="" :label-width="0" v-if="Number(extendCondition.preType) === 3" class="form-item-20">
              <TimePicker format="HH:mm" placeholder="选择时分" style="width: 112px" v-model="extendCondition.time"></TimePicker>
            </FormItem>
          </div>
        </Card>
        <!-- 多组任务输出 -->
        <Card style="margin-top:10px;" v-if="Number(formValidate.jobType) !== 4">
          <p slot="title">
            血缘信息
          </p>
          <div slot="extra">
            <Button type="info" size="small" :loading="bloodBtnLoading" @click="bloodAnalysisOutput" v-if="Number(formValidate.jobType) === 2||Number(formValidate.jobType) === 3||Number(formValidate.jobType) === 5||Number(formValidate.jobType) === 6">
              血缘分析
            </Button>
          </div>
          <div class="task-mess">
            <FormItem label="任务输出库表" style="width: 100%;">
              <!--command类型-->
              <div v-if="Number(formValidate.jobType) === 1 || Number(formValidate.jobType) === 7">
                <Button icon="ios-add" type="dashed"  @click="outputAdd" class="virtual-head-before">添加库表</Button>
                <Checkbox class="blood-check-btn-command" v-model="virtualHeadCommand" @on-change="changeVirtualCommand" key="blood-check-0">无任务输出</Checkbox>
                <div v-for="(item,index1) in bloodResultData_outputs.outputs" style="margin-top:5px;" class="inputs-form-item" :key="'auto'+index1">
                  <Input v-model="item.dbName" class="prepend-input-inline" readonly>
                    <span slot="prepend">库名</span>
                  </Input>
                  <Input v-model="item.tableName" class="prepend-input-inline" readonly>
                    <span slot="prepend">表名</span>
                  </Input>
                  <label @click="delOutput(index,'blood_output')" style="color:#999;cursor:pointer;">
                    <Icon type="ios-close" size="22"/>
                  </label>
                </div>
                <div v-for="(item,index) in re_outputs" style="margin-top:5px;" :key="index">
                  <Input placeholder="数据库名称 .db" v-model="item.dbName" class="prepend-input-inline">
                    <span slot="prepend">库名</span>
                  </Input>
                  <Input placeholder="表名称 .table"  v-model="item.tableName" class="prepend-input-inline">
                    <span slot="prepend">表名</span>
                  </Input>
                  <label @click="delOutput(index,'re_output')" style="color:#999;cursor:pointer;">
                    <Icon type="ios-close" size="22"/>
                  </label>
                </div>
                <div v-for="(item,index) in outputs" style="margin-top:5px;" :key="'auto_output'+index">
                  <Input placeholder="数据库名称 .db" v-model="item.dbName" class="prepend-input-inline">
                    <span slot="prepend">库名</span>
                  </Input>
                  <Input placeholder="表名称 .table"  v-model="item.tableName" class="prepend-input-inline">
                    <span slot="prepend">表名</span>
                  </Input>
                  <label @click="delOutput(index,'output')" style="color:#999;cursor:pointer;">
                    <Icon type="ios-close" size="22"/>
                  </label>
                </div>
              </div>
              <!--sql类型-->
              <div v-else>
                <span v-if="bloodResultData_outputs.outputs.length === 0 && re_outputs.length === 0" class="virtual-head-before">暂无</span>
                <Checkbox v-model="virtualHead" class="virtual-head blood-check-btn" @on-change="changeVirtualSql" :disabled="bloodBtnDisabled" key="blood-check-1">无任务输出</Checkbox>
                <div v-for="(item,index1) in bloodResultData_outputs.outputs" style="margin-top:5px;" class="inputs-form-item" :key="'auto'+index1">
                  <div class="blood-job-item">
                    <Input v-model="item.dbName" class="prepend-input-inline" readonly>
                      <span slot="prepend">库名</span>
                    </Input>
                    <Input v-model="item.tableName" class="prepend-input-inline" readonly>
                      <span slot="prepend">表名</span>
                    </Input>
                  </div>
                  <label @click="delOutput(index1,'blood_output')" style="color:#999;cursor:pointer;">
                    <Icon type="ios-close" size="22"/>
                  </label>
                </div>
                <div v-for="(item,index) in re_outputs" style="margin-top:5px;" :key="index">
                  <div class="blood-job-item">
                    <Input placeholder="数据库名称 .db" v-model="item.dbName" class="prepend-input-inline" readonly>
                      <span slot="prepend">库名</span>
                    </Input>
                    <Input placeholder="表名称 .table"  v-model="item.tableName" class="prepend-input-inline" readonly>
                      <span slot="prepend">表名</span>
                    </Input>
                  </div>
                  <label @click="delOutput(index,'re_output')" style="color:#999;cursor:pointer;">
                    <Icon type="ios-close" size="22"/>
                  </label>
                </div>
              </div>
            </FormItem>
            <!--<FormItem label="任务输入库表" v-if="blood_analysis_type_outputs && blood_render_is_complete" style="width: 100%;">-->
            <FormItem label="任务输入库表" style="width: 100%;" v-if="Number(formValidate.jobType) === 2 || Number(formValidate.jobType) === 3 || Number(formValidate.jobType) === 6">
              <div v-if="bloodResultData_outputs.inputs.length === 0 && re_inputs.length === 0">暂无</div>
              <div v-else style="position:relative;top:-25px;">
                <!--数据库结果-->
                <div v-for="(item,index) in re_inputs" style="margin-top:5px;" :key="index" class="inputs-form-item clearfix">
                  <div class="blood-job-item">
                    <Input v-model="item.dbName" class="prepend-input-inline" readonly>
                      <span slot="prepend">库名</span>
                    </Input>
                    <Input v-model="item.tableName" class="prepend-input-inline" readonly>
                      <span slot="prepend">表名</span>
                    </Input>
                  </div>
                  <div class="blood-job-item">
                    <div v-for="(jobItem,i) in item.jobArr" :key="'jobReInput'+i">
                      <Input v-model="jobItem.jobId" class="prepend-input-inline blood-job-item-detail" readonly>
                        <span slot="prepend">任务Id</span>
                      </Input>
                      <Input v-model="jobItem.jobName" class="prepend-input-inline blood-job-item-detail" readonly>
                        <span slot="prepend">任务名称</span>
                      </Input>
<!--                      <Tag class="ivu-tag-group" style="width: 30%;" color="success">任务Id:{{jobItem.jobId}}</Tag>-->
<!--                      <Tag class="ivu-tag-group" style="width: 60%;" color="success">任务名称:{{jobItem.jobName}}</Tag>-->
                    </div>
                  </div>
                  <label @click="delOutput(index,'re_input')" style="color:#999;cursor:pointer;">
                    <Icon type="ios-close" size="22"/>
                  </label>
                </div>
                <!--血缘分析结果-->
                <div v-for="(item,index) in bloodResultData_outputs.inputs" style="margin-top:5px;" :key="'auto'+index" class="inputs-form-item clearfix">
                  <div class="blood-job-item">
                    <Input v-model="item.dbName" class="prepend-input-inline" readonly>
                      <span slot="prepend">库名</span>
                    </Input>
                    <Input v-model="item.tableName" class="prepend-input-inline" readonly>
                      <span slot="prepend">表名</span>
                    </Input>
                  </div>
                  <div class="blood-job-item">
                    <div v-for="(jobItem,i) in item.jobArr" :key="'job'+i">
                      <Input v-model="jobItem.jobId" class="prepend-input-inline blood-job-item-detail" readonly>
                        <span slot="prepend">任务Id</span>
                      </Input>
                      <Input v-model="jobItem.jobName" class="prepend-input-inline blood-job-item-detail" readonly>
                        <span slot="prepend">任务名称</span>
                      </Input>
<!--                      <Tag class="ivu-tag-group" style="width: 30%;" color="success">任务Id:{{jobItem.jobId}}</Tag>-->
<!--                      <Tag class="ivu-tag-group" style="width: 60%;" color="success">任务名称:{{jobItem.jobName}}</Tag>-->
                    </div>
                  </div>
                  <label @click="delOutput(index,'blood_input')" style="color:#999;cursor:pointer;">
                    <Icon type="ios-close" size="22"/>
                  </label>
                </div>
              </div>
            </FormItem>
          </div>
        </Card>

      </Form>

      <br>

      <Form>
        <FormItem class="btn-group" style="width: 100%;">
          <Button type="info" @click="saveDraft" v-if="Number(formValidate.isValid) === 10">保存草稿</Button>
          <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px" v-else-if="Number(formValidate.isValid) !== 10">提交</Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
        </FormItem>
      </Form>

      <Drawer
        title="job列表复选框"
        v-model="jobModal"
        width="76"
        :mask-closable="false"
        :styles="jobModalStyles" >
        <Form :label-width="60" inline class="clearfix" >
          <FormItem :label-width="85" label="头部任务名称" :style="{width:'20%'}">
            <Select
              v-model="headIdModal"
              filterable clearable
              @on-clear="clearHeadId">
              <Option v-for="(option, index) in headJobList.data" :value="option.id" :key="index">{{option.jobName}}</Option>
            </Select>
          </FormItem>
          <FormItem label="任务标签" :style="{width:'18%'}">
            <Select v-model="jobLabelVal" placeholder="任务标签" clearable filterable @on-clear="clearJobLabel">
              <Option value="">请选择</Option>
              <Option v-for="(label,index) in jobLabelList" :key="index" :value="label.id">{{label.labelName}}</Option>
            </Select>
          </FormItem>
          <FormItem label="任务Id" :label-width="48" :style="{width:'13%'}">
            <Input v-model="searchJobId"></Input>
          </FormItem>
          <FormItem label="任务名称" :style="{width:'23%'}">
            <Input v-model="jobName">
              <Select v-model="accurate" slot="append" style="width: 60px">
                <Option value="0">模糊</Option>
                <Option value="1">精确</Option>
              </Select>
            </Input>
          </FormItem>
          <FormItem label="是否有效" :style="{width:'16%'}">
            <Select v-model="isValidOptionJob" placeholder="是否有效" clearable filterable>
              <Option value="0">有效</Option>
              <Option value="1">无效</Option>
            </Select>
          </FormItem>
          <Button type="primary" @click="jobSearch">查询</Button>
        </Form>
        <div>
          <!--<div v-if="jobListIsSelect" >-->
          <!--<Table border :columns="columns" :data="listAll.rows" class="task-list"></Table>-->
          <!--<Page :total="listAll.total"-->
          <!--:page-size="page.pageSize"-->
          <!--:current="page.current"-->
          <!--show-total-->
          <!--prev-text="上一页" next-text="下一页"-->
          <!--@on-change="changePage"-->
          <!--@on-page-size-change="changePageSize">-->
          <!--</Page>-->
          <!--</div>-->
          <!--<div v-else>-->
          <div>
            <Table style="" border ref="selection" class="task-list" :loading="headJob_loading"
                   :columns="columns7" :data="list.rows"
                   @on-selection-change="selectJobItems"
                   @on-select-cancel="cancelOneJob"
                   @on-select-all-cancel="cancelAllJob">
            </Table>
            <Page :total="list.total"
                  :page-size="page.pageSize"
                  :current="page.current"
                  show-total
                  prev-text="上一页" next-text="下一页"
                  @on-change="changePage"
                  @on-page-size-change="changePageSize">
            </Page>
          </div>
          <!--show-sizer-->

          <div class="jobSeletedItems">
            <Form inline style="width:100%;" :label-width="100">
              <FormItem label="已选任务">
                <div v-if="checkedItemsAll.length === 0" style="color:#2d8cf0;">暂无任务依赖</div>
                <div v-else style="border:1px solid #e8eaec; padding:0 20px;">
                  <Tooltip max-width="300" v-for="(item,index) in checkedItemsAll" :key="index" :content="item.jobName">
                    <Tag class="ellipsis"  closable  @on-close="closeJobItem(item.id,index)" color="success">
                      {{item.jobName}}
                    </Tag>
                  </Tooltip>
                </div>
              </FormItem>
            </Form>
          </div>
        </div>
        <div class="drawer-footer">
          <Button type="primary" @click="jobOk">确认</Button>
          <Button style="margin-left: 8px" @click="jobModal = false">取消</Button>
        </div>
      </Drawer>

      <Modal
        v-model="bloodModal"
        width="60"
        title="血缘分析结果">
        <div>
          <Tabs value="inputs">
            <TabPane label="任务输入" name="inputs">
              <div style="text-align:center;" v-if="bloodResultData.inputs.length === 0">暂无结果</div>
              <div v-else>
                <!--<div>-->
                <!--测试数据-->
                <!--<div style="border: 1px solid #dcdee2;margin-bottom: 5px;padding:5px;">-->
                <!--<Row >-->
                <!--<Col span="1" style="text-align: center;color: #2d8cf0;">-->
                <!--<Icon type="ios-arrow-forward" size="14"/>-->
                <!--</Col>-->
                <!--<Col span="23">-->
                <!--<Row>-->
                <!--<Col span="8">任务Id：-->
                <!--<span>无</span>-->
                <!--</Col>-->
                <!--<Col span="16">任务名称：-->
                <!--<span>无</span>-->
                <!--</Col>-->
                <!--</Row>-->
                <!--<Row style="margin-top:10px;">-->
                <!--<Col span="8">数据库名称：-->
                <!--<span>无</span>-->
                <!--</Col>-->
                <!--<Col span="16">表名称：-->
                <!--<span>无</span>-->
                <!--</Col>-->
                <!--</Row>-->
                <!--</Col>-->
                <!--</Row>-->
                <!--</div>-->
                <div v-for="(job,index1) in bloodResultData.inputs" :key="index1" style="border: 1px solid #dcdee2;margin-bottom: 5px;padding:5px;">
                  <Row >
                    <!--<Col span="1">{{index1+1}}</Col>-->
                    <Col span="1" style="text-align: center;color: #2d8cf0;">
                      <Icon type="ios-arrow-forward" size="14"/>
                    </Col>
                    <Col span="23">
                      <Row>
                        <Col span="8">任务Id：
                          <!--<span v-if="job.jobId === null">无</span>-->
                          <!--<span v-else>{{job.jobId}}</span>-->
                          <span>{{job.jobId}}</span>
                        </Col>
                        <Col span="16">任务名称：
                          <!--<span v-if="job.jobName === null">无</span>-->
                          <!--<span v-else>{{job.jobName}}</span>-->
                          <span>{{job.jobName}}</span>
                        </Col>
                      </Row>
                      <Row style="margin-top:10px;">
                        <Col span="8">数据库名称：
                          <!--<span v-if="job.dbName === null">无</span>-->
                          <!--<span v-else>{{job.dbName}}</span>-->
                          <span>{{job.dbName}}</span>
                        </Col>
                        <Col span="16">表名称：
                          <!--<span v-if="job.tableName === null">无</span>-->
                          <!--<span v-else>{{job.tableName}}</span>-->
                          <span>{{job.tableName}}</span>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </div>
            </TabPane>
            <TabPane label="任务输出" name="outputs">
              <div style="text-align:center;" v-if="bloodResultData.outputs.length === 0">暂无结果</div>
              <div v-else>
                <div v-for="(job,index1) in bloodResultData.outputs" :key="index1" style="border: 1px solid #dcdee2;margin-bottom: 5px;padding:5px;">
                  <Row >
                    <Col span="1" style="text-align: center;color: #2d8cf0;">
                      <Icon type="ios-arrow-forward" size="14"/>
                    </Col>
                    <Col span="23">
                      <Row>
                        <Col span="8">任务Id：
                          <span>{{job.jobId}}</span>
                        </Col>
                        <Col span="16">任务名称：
                          <span>{{job.jobName}}</span>
                        </Col>
                      </Row>
                      <Row style="margin-top:10px;">
                        <Col span="8">数据库名称：
                          <span>{{job.dbName}}</span>
                        </Col>
                        <Col span="16">表名称：
                          <span>{{job.tableName}}</span>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>
        <div slot="footer">
          <Button type="primary" @click="closeBloodModal">关闭</Button>
        </div>
      </Modal>

      <Modal
        v-model="jobResultModal"
        width="40"
        title="任务输出">
        <div>
          <div style="text-align:center;">
            <Row>
              <Form ref="jobResultForm" :model="jobResultForm" :rules="jobResultValidate" :label-width="100">
                <FormItem label="数据库名称" prop="dbName">
                  <Input v-model="jobResultForm.dbName" placeholder="请输入数据库名称"></Input>
                </FormItem>
                <FormItem label="表名称" prop="tableName">
                  <Input v-model="jobResultForm.tableName" placeholder="请输入表名称"></Input>
                </FormItem>
              </Form>
            </Row>
            <Row>
              <Form>

              </Form>
            </Row>
          </div>
        </div>
        <div slot="footer">
          <Button type="primary" @click="handleSubmitJobResult('jobResultForm')">保存</Button>
          <Button type="default" @click="jobResultModal = false">关闭</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
  import {formateStampToDate} from "@/assets/js/formateTime";
  import sqlFormatter from "sql-formatter";
  const AceEditor = () => import('@/components/content/test/aceEditor');
  import AcePython from '@/components/content/test/acePython'
  import dayList from '@/assets/js/day'
  // const AcePython = () => import('@/components/content/test/acePython');
    export default {
        data () {
            return {
                file1:'',
                open: false,
              jobId:'',
              //下载脚本
              downLoadMess:{
                code:0,
                url:'',
              },
              formValidate:{
              },
              extendCondition:{
                preType:'',
                day:'',
                dayList: [],
                weekDay:'',
                time:''
              },
              dayList:dayList,
              isValidDraft:'',        //判断是否为草稿任务：10
              typeId:'',
              upperJobsParent:'',     //父Id
              jobTypeName:'',
              jobTypeList:[],
              jobLabelList:[],
              // machineList:[],
              tagTypeList:[],
              alarmActionList:[],
              concurrentTypeList:[],
              userGroupList:[],
              userGroupMess:{},
              fileList:[],
              sqlList:[],
              sqlItemStatus:'',
              fileItemStatus:false,
              sqlValue:'',
              pythonValue:'',
              pythonScript:{
                name:'',
                val:''
              },
              pythonList:[],
              jobIdsStatus:false,
              bloodResultData:{
                  inputs:[],
                outputs:[]
              },
              bloodModal:false,
              jobResultModal:false,
              jobResultForm:{
                  dbName:'',
                tableName:''
              },
              bloodBtnLoading: false,
              blood_render_is_complete:false,     //是否渲染完成
              blood_analysis_type:'',             //血缘分析类型
              blood_analysis_type_outputs:false,  //是否点击任务输出中血缘分析
              bloodResultData_outputs:{           //血缘分析结果
                inputs:[],
                outputs:[]
            },
              // boold_output_btn:'',
              virtualHeadCommand:false,           //command | sparkStreaming:无任务输出值
              virtualHead:false,                  //无任务输出值
              bloodBtnDisabled:false,             //无任务输出disabled状态
              virtualDisabled:false,              //与刷新库表结合，该功能已经去掉
              refreshOutputs:false,               //与刷新库表结合，该功能已经去掉
              refreshDisabled:false,              //与刷新库表结合，该功能已经去掉
              outputs_list:[],                    //获取任务的output信息
              outputs:[],                         //手动输出列表
              curr_outputs:[],
              re_inputs:[],                       //数据库结果：输入库表
              re_outputs:[],                      //数据库结果：输出库表
              //模态框
              jobModal:false,
              checkAll:false,
              jobList:[],
              jobListConfirm:[],
              jobListConfirmInfo:[],
              //select选择框
              headJob_loading:false,
              headIdModal:'',
              headIdModalBefore:'',
              jobLabelVal:'',
              jobName:'',
              isHead:false,
              selectOptions:'',
              loadingStatus:false,
              list: '',
              listAll:'',
              jobListIsSelect:true,
              //checked选中项items
              checkedItems:[],
              checkedItemsAll:[],
              checkedItemsBeforeSearch:[],
              jobTableStatus:'',
              jobConfirmIds:[],
              accurate:"0",                 //模糊搜索
              searchJobId: '',              //任务Id
              isValidOptionJob:undefined,        //是否有效
              //上传脚本
              updateFile:'',

        jobModalStyles: {
          height: 'calc(100% - 55px)',
          overflow: 'auto',
          paddingBottom: '53px',
          position: 'static'
        },
        //分页
        page:{
          total:0,
          opts:[],
          pageSize:5,
          current:1,
          pageList:[],
          pathSubName:'',
          pathName:''
        },
        columns: [
          {
            title: '任务Id',
            width:75,
            key: 'id'
          },
          {
            title: '任务名称',
            key: 'jobName'
          },
          {
            title: '任务标签',
            width:100,
            key: 'labelName'
          },
          {
            title: '任务分组',
            width:100,
            key: 'loginPwd'
          },
          {
            title: '备注',
            key: 'remark'
          }
        ],
        columns7: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '任务Id',
            width:75,
            key: 'id'
          },
          {
            title: '任务名称',
            key: 'jobName'
          },
          {
            title: '任务标签',
            width:100,
            key: 'labelName'
          },
          {
            title: '任务分组',
            width:100,
            key: 'loginPwd'
          },
          {
            title: '备注',
            key: 'remark'
          }
        ],
        jobResultValidate:{
          dbName:[
            { required: true, message: '数据库名称不能为空', trigger: 'blur' }
          ],
          tableName:[
            { required: true, message: '表名称不能为空', trigger: 'blur' }
          ]
        },
        ruleValidate: {
          jobName: [
            { required: true, message: '任务名称不能为空', trigger: 'blur' }
          ],
          jobType: [
            { required: true, message: '任务类型不能为空', trigger: 'change' }
          ],
          jobLabel: [
            { required: true, message: '任务标签不能为空', trigger: 'change' }
          ],
          type: [
            { required: true, message: 'job类型不能为空', trigger: 'change' }
          ],
          priorityLevel: [
            { required: true, message: ' job级别不能为空', trigger: 'blur' }
          ],
          exeCmd: [
            { required: true, message: '执行命令不能为空', trigger: 'blur' }
          ],
          tagType: [
            { required: true, message: '执行服务器不能为空', trigger: 'change' }
          ],
          // retryInterval: [
          //   { required: true, message: '重试间隔不能为空', trigger: 'blur' }
          // ],
          timeOut: [
            { required: true, message: '超时时长不能为空', trigger: 'blur' }
          ],
          isMutex: [
            { required: true, message: '是否支持并发', trigger: 'change' }
          ],
          ccrId:[
            { required: true, message: '并发类型不能为空', trigger: 'change' }
          ],
          groupId:[
            { required: true, message: '用户工作组不能为空', trigger: 'blur' }
          ],
          isValid: [
            { required: true, message: '是否有效', trigger: 'change' }
          ],
          dataSourceId: [
            { required: true, type:'number', message: '数据源不能为空', trigger: 'change' }
          ],
          sourceDb: [
            { required: true, message: '源库名', trigger: 'blur' }
          ],
          sourceTb: [
            { required: true, message: '源表名', trigger: 'blur' }
          ],
          targetDb: [
            { required: true, message: '目标库', trigger: 'blur' }
          ],
          targetTb: [
            { required: true, message: '目标表', trigger: 'blur' }
          ],
          targetId: [
            { required: true, type:'number',message: '目标Id', trigger: 'change' }
          ],
          exportType: [
            { required: true, type:'number', message: '导出类型', trigger: 'change' }
          ],
          sourceId: [
            { required: true, type:'number', message: '数据源', trigger: 'change' }
          ]
        },
        targetIdList:[],
        sqlValueExport:'',
        exportTypeList: [
          {
            key: '0',
            val: 'hive->mysql'
          },
          {
            key: '1',
            val: 'mysql->mongodb'
          }
        ]
      }
    },
    components:{
      AceEditor,
      AcePython
    },
    created() {
      this.$store.state.route = this.$route;
      let id = this.$route.query.id;
      this.jobId = id;
      this.$store.dispatch('downloadScript',id);
      // this.$store.dispatch('getJobMachineList');
      this.$store.dispatch('getJobLabel',{pageSize:10000,startPage:1});

      // this.$store.dispatch('getJobType',{pageSize:10000,startPage:1});
      this.getExportTargetList();
      // //请求job信息
      // this.$store.dispatch('getJobInfo',id);       //为什么会调到darge页面
    },
    mounted() {
      this.$on('jobId-msg',function(data) {
        // console.log(data);
      })
    },
    activated() {
      // this.$store.state.route = this.$route;
      // let id = this.$route.query.id;
      // if(this.jobId !== id) {
      //   this.jobId = id;
      //   this.$store.dispatch('downloadScript',id);
      //   // jobOption.data
      //   this.$store.dispatch('getJobMachineList');
      //   //请求头部job名称
      //   this.$store.dispatch('getHeadJob');
      //
      //   this.$store.dispatch('getJobLabel',{pageSize:10000,startPage:1});
      //   this.$store.dispatch('getAlarmAction',{pageSize:10000,startPage:1});
      //   this.$store.dispatch('getConcurrentType',{pageSize:10000,startPage:1});
      //   this.$store.dispatch('getUserGroup');
      //   this.backupInfo();
      // }
    },
    updated() {

    },
    computed:{
      jobScript() {
        return this.$store.state.jobScript;
      },
      jobType() {
        return this.$store.state.getJobType;
      },
      jobLabel() {
        return this.$store.state.getJobLabel;
      },
      formValidateData() {
        return this.$store.state.jobInfo;
      },
      jobEditStatus() {
        return this.$store.state.jobEditStatus;
      },
      jobOption() {
        return this.$store.state.jobOptionList;
      },
      headJobList() {
        return this.$store.state.headJobList;
      },
      // jobMachineList() {
      //   return this.$store.state.jobMachineList;
      // },
      alarmAction() {
        return this.$store.state.alarmAction;
      },
      concurrentType() {
        return this.$store.state.concurrentType;
      },
      userGroup() {
        return this.$store.state.userGroup;
      },
      error() {
        return this.$store.state.error;
      }
    },
    watch:{
      error(obj) {
        if(obj.code === 302) {
          window.sessionStorage.removeItem('user_name');
        }
        // this.$router.push(obj.path)
      },
      jobScript(obj) {
        // console.log(obj)
        if(obj.status === 200) {
          let result = obj.data;
          if(result.code && result.code === -1) {
            this.downLoadMess.code = -1;
          }else {
            this.downLoadMess.code = 1;
            this.downLoadMess.url = this.basePath + '/job/downloadFile?jobId=' + this.$route.query.id;
          }
        }
      },
      //报警类型
      alarmAction(obj) {
        var rows = obj.rows;
        rows.forEach((item,index) => {
          // console.log(item)
          rows[index].id = item.id.toString();
        })
        this.alarmActionList = obj.rows;
        this.$store.dispatch('getUserGroup');
      },
      //并发类型
      concurrentType(obj) {
        if(obj.code === 1) {
          var rows = obj.rows;
          rows.forEach((item,index)=>{
            rows[index].id = item.id.toString();
          })
          this.concurrentTypeList = obj.rows;
          this.$store.dispatch('getAlarmAction',{pageSize:10000,startPage:1});
        }
      },
      //用户工作组
      userGroup(obj) {
        if(obj.code === 1) {
          this.userGroupMess = obj.data.curGroup;
          this.$store.dispatch('getJobType',{pageSize:10000,startPage:1});
        }
      },
      jobType(obj) {
        var rows = obj.rows;
        var list = [];
        rows.forEach((item,index)=>{
          rows[index].id = item.id.toString();
          if(item.typeName === 'data_export') {
            rows[index].typeName = '数据导出';
          }
          if(Number(item.id) === 5) {
            list.push(rows[index]);
            // if(this.userGroupMess.id === 10840 || this.userGroupMess.id === 12710 || this.userGroupMess.id === 10878) {
            //   list.push(rows[index]);
            // }else {
            // }
          }else if(Number(item.id) === 6) {
            // bde与fx_growth_da组、qz_ma组、fx_olap组、test_dc组、fanxin_dx组
            // if(this.userGroupMess.id === 12985 || this.userGroupMess.id === 10819 || this.userGroupMess.id === 12994 || this.userGroupMess.id === 12738 || this.userGroupMess.id === 3105 || this.userGroupMess.id === 10840 || this.userGroupMess.id === 12713 || this.userGroupMess.id === 12779) {
            //   list.push(rows[index]);
            // }
            list.push(rows[index]);
          } else {
            list.push(rows[index]);
          }
        })
        this.jobTypeList = list;
        this.getTagTypeList();
      },
      jobLabel(obj) {
        var rows = obj.rows;
        rows.forEach((item,index)=>{
          rows[index].id = item.id.toString();
        })
        this.jobLabelList = obj.rows;
        this.$store.dispatch('getConcurrentType',{pageSize:10000,startPage:1,isValid:0});
      },
      formValidateData(obj) {
        if(obj === null) {
          this.$Message.warning('数据加载异常，请稍后重试！')
        }else {
          let jobTypeObj = {
            label:'',
            value:''
          }
          this.typeId = obj.type;
          if(obj.sql) {
            // this.sqlValue = sqlFormatter.format(obj.sql);    //初始格式化
            this.sqlValue = obj.sql;
          }
          if(obj.olScriptContent === null || obj.olScriptContent === 'null') {
            obj.olScriptContent = '';
          }
          this.pythonValue = obj.olScriptContent;
          //1：command类型；2：hive sql类型
          // if(Number(obj.jobType) === 1) {
          //   jobTypeObj.label = obj.typeName;
          //   jobTypeObj.value = '1';
          // }else if(Number(obj.jobType) === 2){
          //   jobTypeObj.label = obj.typeName;
          //   jobTypeObj.value = '2';
          // }
          // console.log(jobTypeObj)
          this.showEditor(jobTypeObj);
          if(obj.upperJobsParent) {
            this.upperJobsParent = obj.upperJobsParent.toString();
          }
          if(obj.type == 1) {
            if(obj.upperJobs !== '') {
              var jobIds = obj.upperJobs.split(",");
              jobIds.forEach((item,index)=>{
                this.jobListConfirm.push(item);
              })
            }else {
              this.jobListConfirm = [];
            }
            if(obj.upperJobsInfo) {
              obj.upperJobsInfo.forEach((item,index) =>{
                // console.log(item)
                let jobId = item.jobId;
                let jobName = item.jobName;
                let mid_item = {
                  jobId:jobId,
                  jobName:jobName
                }
                this.jobListConfirmInfo.push(item);
              })
            }
          }
          this.formValidate = obj;
          if(obj.crontabExpression === 'null' || obj.crontabExpression === null) {
            this.formValidate.crontabExpression = '';
          }
          if(this.formValidate.dbName === null || this.formValidate.dbName === 'null') {
            this.formValidate.dbName = '';
            this.jobResultForm.dbName = '';
          }else {
            this.jobResultForm.dbName = this.formValidate.dbName;
          }
          if(this.formValidate.tableName === null ||  this.formValidate.tableName === 'null') {
            this.formValidate.tableName = '';
            this.jobResultForm.tableName = '';
          }else {
            this.jobResultForm.tableName = this.formValidate.tableName;
          }
          this.jobTypeName = this.typeName;
        }
      },
      jobSaveStatus(obj) {
        if(obj.data.code == 1) {
          this.$Message.success({
            content:'新建成功！',
            duration:3,
            closable:true
          });
          this.$router.push('taskManage');
        }else {
          this.$Message.error('修改失败!');
        }
      },
      jobEditStatus(obj) {
        if(obj.data.code === 1) {
          this.$Message.success({
            content:'修改成功！',
            duration:3,
            closable:true
          });
          if(this.sqlItemStatus) {
            this.backupInfo();
          }else {
            this.listBackupOlScript();
          }
        }else {
          this.$Modal.error({
            title:'错误提示',
            content:obj.data.message
          })
        }
      },
      jobOption(obj) {
        this.headJob_loading = false;
        var rows = obj.rows;
        let checkItems = this.checkedItems;
        for(let i in rows) {
          for(let j in checkItems) {
            if(rows[i].id === checkItems[j].id) {
              rows[i]._checked = true;
            }
          }
        }
        this.list = obj;
      },
      headJobList(obj) {
      },
    },
    mounted:function() {
    },
    methods: {
      //获取目标数据源列表
      getExportTargetList() {
        this.Request({
          method:'get',
          url:this.basePath + '/exportTarget/list',
          params:{
            startPage:1,
            pageSize:10000
          }
        }).then(res=>{
          if(res.data.code === 1) {
            this.targetIdList = res.data.rows;
          }else {
            this.$Message.error(res.data.message);
          }
        })
      },
      // 从工作组中获取执行服务器列表
      getTagTypeList() {
        this.Request({
          method:'get',
          url:`${this.basePath}/machine/tagTypeList`
        }).then(res =>{
          if(res.data.code === 1 ) {
            this.tagTypeList = res.data.data;
            this.getJobInfo();
            this.backupInfo();
            this.listBackupOlScript();
          }else {
            this.$Message.warning({
              content:res.data.message,
              closable:true
            })
          }
        })
      },
      //获取jobInfo基本信息
      getJobInfo() {
        this.jobListConfirm = []
        this.jobListConfirmInfo = [];
        this.re_outputs = [];
        let that = this;
        let id = this.$route.query.id;

        if(id !== undefined && id !== '') {
          this.Request({
            method:'get',
            url:`${this.basePath}/job/findById?id=`+id
          }).then( (res)=> {
            // console.log(res);
            if(res.status === 200) {
              if(res.data.code === 1) {
                let obj = res.data.data;
                // console.log(obj);
                if(obj.extendCondition !== null) {    //true
                  let extendCondition = JSON.parse(obj.extendCondition);
                  if(extendCondition.preType) {
                    that.extendCondition.preType = extendCondition.preType.toString();
                  }

                  /*
                  * 每日：分为day与dayList
                  * day：以前数据，返回值为字符串类型
                  * dayList：后面的数据，返回值为数组形式
                  * 判断逻辑：先判断dayList是否有值，没有值才进行day值的判断
                  * */
                  that.extendCondition.dayList = []
                  if(extendCondition.dayList) {
                    that.extendCondition.dayList = extendCondition.dayList;
                  } else {
                    if(extendCondition.day) {
                      that.extendCondition.dayList.push(extendCondition.day)
                    }
                  }
                  if(extendCondition.weekDay) {
                    that.extendCondition.weekDay = extendCondition.weekDay.toString();
                  }
                  if(extendCondition.hour || Number(extendCondition.hour) === 0) {        //extendCondition.hour为数字0时
                    if(extendCondition.hour === null || extendCondition.minute === null) {       //当时间没选时，后台会返回null
                    }else {
                      that.extendCondition.time = extendCondition.hour.toString() + ':' + extendCondition.minute.toString();
                    }
                  }
                  // console.log(that.extendCondition)
                }

                for(var i in obj) {
                  if(!obj.jobLabel) {
                    obj.jobLabel = '';
                  }
                  if(!obj.ccrId) {
                    obj.ccrId = '';
                  }
                  if(!obj.jobType) {
                    obj.jobType = '';
                  }
                  if(!obj.alarmActionId) {
                    obj.alarmActionId = '';
                  }
                  if(!obj.dataSourceId) {
                    obj.dataSourceId = ''
                  }
                  if(obj[i] !== null && i !== 'upperJobsInfo' && i!== 'outputs' && i!== 'inputs' && i!== 'exportJob' && i !== 'dataSourceId') {
                    obj[i] = obj[i].toString();
                  }
                }

                this.isValidDraft = obj.isValid;

                if(obj.typeName === 'data_export') {
                  obj.typeName = '数据导出';
                }
                let jobTypeObj = {
                  label:obj.typeName,
                  value:obj.jobType.toString()
                };
                this.typeId = obj.type;

                if(obj.sql === null || obj.sql === 'null') {
                  obj.sql = '';
                }
                this.sqlValue = obj.sql;

                if(obj.olScriptContent === null || obj.olScriptContent === 'null') {
                  obj.olScriptContent = '';
                }
                this.pythonValue = obj.olScriptContent;
                this.showEditor(jobTypeObj);
                if(obj.upperJobsParent) {
                  this.upperJobsParent = obj.upperJobsParent.toString();
                }
                this.jobListConfirmInfo = []
                if(obj.type == 1) {
                  if(obj.upperJobs !== '') {
                    var jobIds = obj.upperJobs.split(",");
                    jobIds.forEach((item,index)=>{
                      this.jobListConfirm.push(item);
                    })
                  }else {
                    this.jobListConfirm = [];
                  }
                  if(obj.upperJobsInfo) {
                    obj.upperJobsInfo.forEach((item,index) =>{
                      let jobId = item.jobId;
                      let jobName = item.jobName;
                      let mid_item = {
                        jobId:jobId,
                        jobName:jobName
                      }
                      this.jobListConfirmInfo.push(item);
                    })
                  }
                }
                this.formValidate = obj;

                if(obj.exportJob && JSON.stringify(obj.exportJob) !== '{}') {
                  this.formValidate.sourceId = obj.exportJob.sourceId;
                  this.formValidate.sourceDb = obj.exportJob.sourceDb;
                  this.formValidate.sourceTb = obj.exportJob.sourceTb;
                  this.formValidate.targetDb = obj.exportJob.targetDb;
                  this.formValidate.targetTb = obj.exportJob.targetTb;
                  this.formValidate.targetId = obj.exportJob.targetId;
                  this.formValidate.sourceWhere = obj.exportJob.sourceWhere;
                  this.formValidate.sourceColumns = obj.exportJob.sourceColumns;
                  this.formValidate.current = obj.exportJob.current;
                  this.formValidate.targetPresql = obj.exportJob.targetPresql;
                  this.formValidate.targetColumns = obj.exportJob.targetColumns;
                  this.formValidate.updateKey = obj.exportJob.updateKey;
                  this.formValidate.updateMode = obj.exportJob.updateMode;
                  if(obj.exportJob.sourceQuery === null || obj.exportJob.sourceQuery === 'null' || obj.exportJob.sourceQuery === undefined) {
                    obj.exportJob.sourceQuery = '';
                  }
                  this.sqlValueExport = obj.exportJob.sourceQuery;
                  this.formValidate.exportType = obj.exportJob.exportType.toString();
                }

                //输jo出库表
                this.outputs_list =  obj.outputs;
                obj.outputs.forEach((output,i) =>{
                    if(output.dbName === 'blank' || output.tableName === 'blank') {
                    // console.log(typeof obj.jobType)  => 'string'
                    if (Number(obj.jobType) === 1 || Number(obj.jobType) === 7) {
                      this.virtualHeadCommand = true;
                    } else {
                      this.virtualHead = true;
                    }
                    that.outputs_list = [];
                    this.refreshDisabled = true;
                  }
                });
                // this.outputs_list.forEach((item,i) =>{
                  //数据库结果：不区分自动与手动
                  // this.re_outputs.push(item);
                  // if(item.type === 1) {     //自动
                  //   this.bloodResultData_outputs.outputs.push(item);
                  // }else if(item.type === 2) {   //手动
                  //   this.outputs.push(item);
                  // }
                // });

                obj.inputs.forEach((input,i) =>{
                  if(!input.jobId) {
                    input.jobId = '无';
                  }
                  if(!input.jobName) {
                    input.jobName = '无';
                  }
                });

                this.re_outputs = this.distinctArrBloodFull(that.outputs_list.concat([]));
                //输入库表
                this.re_inputs = this.distinctArrBloodFull(obj.inputs.concat([]));

                if(obj.crontabExpression === 'null' || obj.crontabExpression === null) {
                  this.formValidate.crontabExpression = '';
                }
                if(obj.olScriptFileName === 'null' || obj.olScriptFileName === null) {
                  this.formValidate.olScriptFileName = '';
                }
                if(obj.olScriptContent === 'null' || obj.olScriptContent === null) {
                  this.formValidate.olScriptContent = '';
                }
                if(this.formValidate.dbName === null || this.formValidate.dbName === 'null') {
                  this.formValidate.dbName = '';
                  this.jobResultForm.dbName = '';
                }else {
                  this.jobResultForm.dbName = this.formValidate.dbName;
                }
                if(this.formValidate.tableName === null ||  this.formValidate.tableName === 'null') {
                  this.formValidate.tableName = '';
                  this.jobResultForm.tableName = '';
                }else {
                  this.jobResultForm.tableName = this.formValidate.tableName;
                }
                this.jobTypeName = this.typeName;

              }
            }
          }).catch( (err) => {
          })
        }else {
          this.$Message.error('请求地址不正确');
        }
      },
      //多组任务输出添加、删除
      outputAdd() {
        if(this.virtualHeadCommand) {
          this.$Message.warning({
            content:'已选择无任务输出',
            duration:3,
            closable:true
          })
        }else {
          this.outputs.push({dbName:'',tableName:''});
        }
        // console.log(this.outputs)
      },
      //前端操作：删除库表
      delOutput(index,type,autoType) {
        let inputs = this.re_inputs.concat(this.bloodResultData_outputs.inputs);
        let len = inputs.length;
        if(type === 'blood_input') {
          if(len === 1 && (Number(this.formValidate.jobType) === 2 || Number(this.formValidate.jobType) === 3)) {
            this.$Message.warning({
              content:'sql类型任务的输入库表不能为空',
              duration:3,
              closable:true
            })
            return ;
          }else {
            this.bloodResultData_outputs.inputs.splice(index,1);
          }
        }else if(type === 're_input') {
          if(len === 1 && (Number(this.formValidate.jobType) === 2 || Number(this.formValidate.jobType) === 3)) {
              this.$Message.warning({
              content:'sql类型任务的输入库表不能为空',
              duration:3,
              closable:true
            })
            return ;
          }else {
            this.re_inputs.splice(index,1);
          }
        }else if(type === 'blood_output') {
          let output_len = this.bloodResultData_outputs.outputs.length;
          if(output_len === 1) {
            this.$Message.warning({
              content:'sql类型任务的输出库表不能为空',
              duration:3,
              closable:true
            })
            return ;
          }else {
            this.bloodResultData_outputs.outputs.splice(index,1);
          }
        }else if(type === 're_output') {
          this.re_outputs.splice(index,1);
        }else if(type === 'output') {
          this.outputs.splice(index,1);
        }
      },
      //虚拟头部
      changeVirtualCommand(status) {
        if(status) {
          this.curr_outputs = this.outputs.concat([]);    //赋值新数组，记住原outputs
          this.outputs = [];
        }else {
          this.outputs = this.curr_outputs;
        }
      },
      changeVirtualSql(status) {
        if(status) {
          this.curr_outputs = this.outputs.concat([]);    //赋值新数组，记住原outputs
          this.outputs = [];
        }else {
          this.outputs = this.curr_outputs;
        }
        let sqlValue = this.$refs.aceEditor.editor.getValue();
        if(sqlValue) {
          if(this.blood_analysis_type === '') {
            this.$Message.warning('请先点击血缘分析')
            this.virtualHeadCommand = false;
            this.$nextTick( ()=>{
              this.virtualHead = false;
              this.bloodBtnDisabled = true;
            })
          }
        }
      },
      sqlValueChange(sql) {
        this.initBloodAnalysis();
      },
      initBloodAnalysis() {
        this.virtualHead = false;
        this.virtualHeadCommand = false;
        this.bloodBtnDisabled = false;
        this.blood_analysis_type = '';
        this.re_inputs = [];
        this.re_outputs = [];
        this.bloodResultData_outputs = {
          inputs:[],
          outputs:[]
        };
        // this.$nextTick( ()=>{
        //   let bloodCheckBtn = document.getElementsByClassName('blood-check-btn')[0].getElementsByClassName('ivu-checkbox')[0];
        //   bloodCheckBtn.classList.remove('ivu-checkbox-checked');
        // })
      },
      //是否刷新库表
      changeRefresh(status) {
        if(status) {
          this.virtualDisabled = true;
        }else {
          this.virtualDisabled = false;
        }
      },
      //sql操作
      sqlOperate(name) {
        if(name!== undefined) {
          if(name === 'bloodAnalysis') {
            this.blood_analysis_type = 'sql';
            this.$refs.aceEditor.getAnalysisBlood('sql');
          }else if(name === 'sqlFormate') {
            let sqlValue = sqlFormatter.format(this.$refs.aceEditor.editor.getValue());
            this.$refs.aceEditor.editor.setValue(sqlValue);
          }else if(name === 'nonSql') {
            this.$Message.info({
              content:'暂无历史sql',
              duration:2,
              closable:true
            });
          }else{
            this.backupInfoFile('sql',name);
          }
        }
      },
      //脚本操作
      pythonOperate(name){
        if(name!== undefined) {
          if(name === 'nonPython') {
            this.$Message.info({
              content:'暂无在线脚本',
              duration:2,
              closable:true
            });
          }else{
            this.downloadBackupFileOlScript(name);
          }
        }
      },
      //脚本下载
      fileDownLoad(name) {
        if(name !== undefined) {
          if(name === 'currentFile') {
            if(this.downLoadMess.url === '') {
              this.downLoadWarn();
            }else {
              window.location.href = this.downLoadMess.url;
            }
          }else if(name === 'nonFile') {
            this.$Message.info({
              content:'暂无脚本文件',
              duration:2,
              closable:true
            })
          }else {
            let jobId = this.$route.query.id;
            let href = this.basePath + '/job/downloadBackupFile?jobId='+jobId+'&timestamp='+name;
            window.location.href = href;
          }
        }
      },
      //获取sql或file具体信息
      backupInfoFile(type,timestamp) {
        let jobId = this.$route.query.id;
        this.Request({
          url:this.basePath + '/job/downloadBackupFile',
          method: 'get',
          params:{
            jobId:jobId,
            timestamp:timestamp
          }
        }).then(res=>{
          if(res.data.code === 1) {
            let result = res.data.data
            if(type === 'sql') {
              this.$refs.aceEditor.editor.setValue(result);
            }else if(type === 'file') {
              // window.location.href = result;
            }
          }
        })
      },
      //备份文件
      backupInfo() {
        let jobId = this.$route.query.id;
        this.Request({
          url:this.basePath + '/job/listBackupInfo?jobId='+jobId,
          method:'get'
        }).then( res => {
          // console.log(res);
          if(res.data.code === 1) {
            this.fileList = [];
            this.sqlList = [];
            let result = res.data.data;
            if(result) {
              result.forEach((item,index)=>{
                let bItem;
                let timestamp = item.updateTime;
                result[index].updateTime = formateStampToDate(item.updateTime);
                if(item.fileName === null || item.fileName === '') {
                  bItem = {
                    name:'版本v'+ (index+1),
                    updateTime:result[index].updateTime,
                    title:'版本v'+ (index+1)+'  '+result[index].updateTime,
                    timestamp:timestamp
                  }
                  if(index === 0) {
                    bItem.name = '版本v'+ (index+1);
                  }
                  this.sqlList.push(bItem);
                }else {
                  bItem = {
                    name:item.fileName,
                    updateTime:result[index].updateTime,
                    title:item.fileName+'  '+result[index].updateTime,
                    timestamp:timestamp
                  }
                  this.fileList.push(bItem);
                }
              })
            }
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      //在线脚本历史列表
      listBackupOlScript() {
        let jobId = this.$route.query.id;
        this.Request({
          url:this.basePath + '/job/listBackupOlScript?jobId='+jobId,
          method:'get'
        }).then( res => {
          // console.log(res);
          if(res.data.code === 1) {
            let result = res.data.data;
            if(result) {
              this.pythonList = [];
              result.forEach((item,index)=>{
                let bItem;
                let timestamp = item.updateTime;
                result[index].updateTime = formateStampToDate(item.updateTime);     //列表显示作用
                bItem = {
                  name:item.fileName,
                  updateTime:result[index].updateTime,
                  title:item.fileName+'  '+result[index].updateTime,
                  timestamp:timestamp
                }
                this.pythonList.push(bItem);
              })
            }
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      //在线脚本详情
      downloadBackupFileOlScript(timestamp) {
        let jobId = this.$route.query.id;
        this.Request({
          url:this.basePath + '/job/downloadBackupFileOlScript?jobId='+jobId+'&timestamp='+timestamp,
          method:'get'
        }).then( res => {
          // console.log(res);
          if (res.data.code === 1) {
            let result = res.data.data;
            this.$refs.acePython.setValue(result);
          }
        }).catch(err=>{
        })
      },
      //血缘分析结果:sql类型
      bloodResult(obj) {
        this.bloodBtnLoading = false;
        if (obj === 'error') {
          return false;
        }
        // console.log(obj)
        // console.log(this.blood_analysis_type)
        let result_in = [];
        let result_out = [];
        if(obj !== null && obj.inputs) {
          result_in = obj.inputs;
        }
        if(obj !== null && obj.outputs) {
          result_out = obj.outputs;
        }
        let bloodResultData_in = [];
        let bloodResultData_out = [];
        this.bloodResultData = {
          inputs:[],
          outputs:[]
        };
        if(result_in === null || result_in.length === 0) {
          bloodResultData_in = [];
        }else {
          //jobId  jobName  dbName  tableName
          result_in.forEach((item,index) => {
            if(item) {
              if(item.jobId === null) {
                item.jobId = '无';
              }
              if(item.jobName === null) {
                item.jobName = '无';
              }
              if(item.dbName === null) {
                item.dbName = '无';
              }
              if(item.tableName === null) {
                item.tableName = '无';
              }
              bloodResultData_in.push(item);
            }
          })
        }
        if(result_out === null || result_out.length === 0) {
          bloodResultData_out = [];
        }else {
          //jobId  jobName  dbName  tableName
          result_out.forEach((item,index) => {
            if(item) {
              if(item.jobId === null) {
                item.jobId = '无';
              }
              if(item.jobName === null) {
                item.jobName = '无';
              }
              if(item.dbName === null) {
                item.dbName = '无';
              }
              if(item.tableName === null) {
                item.tableName = '无';
              }
              bloodResultData_out.push(item);
            }
          })
        }
        if(this.blood_analysis_type === 'sql') {                 //sql操作：血缘分析
          this.bloodResultData.inputs = bloodResultData_in.concat([]);
          this.bloodResultData.outputs = bloodResultData_out.concat([]);
          this.jobIdsStatus = true;
          this.bloodModal = true;
        }else if(this.blood_analysis_type === 'outputs') {       //任务输出：血缘分析，this.outputs为[]
          //点击血缘分析：此时为自动输出结果，手动输出结果无效
          this.re_inputs = [];
          this.re_outputs = [];

          this.bloodResultData_outputs = {
            inputs:[],
            outputs:[]
          };

          bloodResultData_in = this.distinctArrBloodFull(bloodResultData_in);
          bloodResultData_out = this.distinctArrBloodFull(bloodResultData_out);
          let re_inputs = this.re_inputs.concat([]);
          let re_outputs = this.re_outputs.concat([]);
          this.bloodResultData_outputs.inputs = this.distinctArr(bloodResultData_in,re_inputs);
          this.bloodResultData_outputs.outputs = this.distinctArr(bloodResultData_out,re_outputs);

          this.blood_render_is_complete = true;
          if( this.bloodResultData_outputs.outputs.length === 0 ) {
            this.bloodBtnDisabled = false;
          }else {
            this.bloodBtnDisabled = true;
          }
          // this.$nextTick(()=>{
          //   let bloodCheckBtn = document.getElementsByClassName('blood-check-btn')[0].getElementsByClassName('ivu-checkbox')[0];
          //   bloodCheckBtn.classList.remove('ivu-checkbox-checked');
          // })
        }
      },
      //血缘分析结果与数据库结果对比：数组去重
      distinctArr(arr1,arr2) {
        let len1 = arr1.length;
        let len2 = arr2.length;
        let newArr = [];
        let flag = true;
        for(let i = 0 ; i < len1; i++) {
          flag = true;
          for(let j = 0 ; j < len2 ; j++ ) {
            if(arr1[i].dbName === arr2[j].dbName && arr1[i].tableName === arr2[j].tableName) {
              flag = false;
              break;
            }
          }
          if(flag) {
            newArr.push(arr1[i]);
          }
        }
        return newArr;
      },
      //血缘分析结果去重
      distinctArrBlood(a) {
        let len1 = a.length;
        let newArr = [];
        let flag = true;
        for(let i=0;i<a.length;i++) {
          flag = true;
          for(let j=i+1;j<a.length;j++) {
            if(a[i].dbName === a[j].dbName && a[i].tableName === a[j].tableName) {
              flag = false;
            }
          }
          if(flag) {
            newArr.push(a[i]);
          }
        }
        return newArr;
      },
      //完整去重，合并去重后的job信息
      distinctArrBloodFull(a) {
        for(let i=0;i<a.length;i++) {
          a[i].jobArr = [];
          let jobObj1 = {
            jobId:a[i].jobId,
            jobName:a[i].jobName
          };
          a[i].jobArr.push(jobObj1);
          for(let j=i+1;j<a.length;j++) {
            let jobObj2 = {
              jobId:a[j].jobId,
              jobName:a[j].jobName
            }
            if(a[i].dbName === a[j].dbName && a[i].tableName === a[j].tableName) {
              // a[i].jobArr.push(jobObj2);
              if(a[i].jobId !== a[j].jobId) {
                a[i].jobArr.push(jobObj2);
              }
              a.splice(j,1);
              j--;
            }
          }
        }
        return a;
      },
      showBloodModal(obj) {
        if(obj) {
          this.bloodModal = true;
        }
      },
      closeBloodModal() {
        // alert('关闭');
        this.bloodModal = false;
      },
      //任务输出：血缘分析
      bloodAnalysisOutput() {
        this.blood_analysis_type = 'outputs';
        this.blood_analysis_type_outputs = true;
        this.bloodBtnLoading = true;
        this.$refs.aceEditor.getAnalysisBlood('outputs');
      },
      //下载脚本
      downLoadWarn() {
        this.$Message.info({
          content:'job'+this.jobId+'没有脚本文件',
          duration:2
        })
      },
      //显示sql编辑器
      showEditor(option) {
        // console.log(option)
        this.ruleValidate.exportType = [];
        this.ruleValidate.sourceId = [];
        this.ruleValidate.sourceDb = [];
        this.ruleValidate.sourceTb = [];
        this.ruleValidate.targetDb = [];
        this.ruleValidate.targetTb = [];
        this.ruleValidate.targetId = [];
        this.ruleValidate.tagType = [
          { required: true, message: '执行服务器不能为空', trigger: 'change' }
        ];

        var label = option.label;
        var value = option.value;
        this.jobTypeName = label;
        // var exeCmd = document.getElementsByClassName("form-item-exeCmd")[0];
        //包含sql的类型
        if( Number(value) === 2 || Number(value) === 3 || Number(value) === 6 ) {
          this.sqlItemStatus = true;
          this.fileItemStatus = false;
          this.ruleValidate.exeCmd = [];
          this.ruleValidate.dataSourceId = []
          // this.$nextTick( ()=>{
          //   exeCmd = document.getElementsByClassName("form-item-exeCmd")[0];
          //   exeCmd.className += ' exeCmd-before';
          // })
        }
        else if( Number(value) === 5 ) {
          this.sqlItemStatus = true;
          this.fileItemStatus = false;
          this.ruleValidate.tagType = [];
          this.ruleValidate.exeCmd = [
            { required: true, message: '执行命令不能为空', trigger: 'blur' }
          ]
          this.ruleValidate.dataSourceId = [
            { required: true, type:'number', message: '数据源不能为空', trigger: 'change' }
          ]
          // this.$nextTick( ()=>{
          //   exeCmd = document.getElementsByClassName("form-item-exeCmd")[0];
          //   exeCmd.className += ' exeCmd-before';
          // })
        }
        else if( Number(value) === 4) {
          this.sqlItemStatus = '';
          //执行服务器|执行命令
          this.ruleValidate.tagType = [];
          this.ruleValidate.exeCmd = [];
          this.ruleValidate.dataSourceId = []

          this.ruleValidate.sourceDb = [
            { required: true, message: '源库名', trigger: 'blur' }
          ];
          this.ruleValidate.sourceTb = [
            { required: true, message: '源表名', trigger: 'blur' }
          ];
          this.ruleValidate.targetDb = [
            { required: true, message: '目标库', trigger: 'blur' }
          ];
          this.ruleValidate.targetTb = [
            { required: true, message: '目标表', trigger: 'blur' }
          ];
          this.ruleValidate.targetId = [
            { required: true, type:'number',message: '目标Id', trigger: 'change' }
          ];
          this.ruleValidate.exportType = [
            { required: true, type:'number', message: '导出类型', trigger: 'change' }
          ]
          this.ruleValidate.sourceId = [
            { required: true, type:'number', message: '数据源', trigger: 'change' }
          ]
        }
        else {     //command类型 | spark streaming
          this.sqlItemStatus = false;
          this.fileItemStatus = true;
          this.ruleValidate.exeCmd = [
            { required: true, message: '执行命令不能为空', trigger: 'blur' }
          ]
          this.ruleValidate.dataSourceId = []
          // this.$nextTick( ()=>{
          //   exeCmd = document.getElementsByClassName("form-item-exeCmd")[0];
          //   if(exeCmd.className.indexOf("exeCmd-before")>-1) {
          //     var index = exeCmd.className.indexOf("exeCmd-before");
          //     exeCmd.className = exeCmd.className.slice(0,index);
          //   }
          // })

          // -- 切换command类型：血缘分析相关
          this.bloodResultData_outputs.inputs = [];
          this.bloodResultData_outputs.outputs = [];
          this.blood_analysis_type = '';
          // 切换command类型：血缘分析相关 --
        }

        // this.$nextTick(() =>{
        //   let error = document.getElementsByClassName('ivu-form-item-error');
        //   let errorTip = document.getElementsByClassName('ivu-form-item-error-tip');
        //   for( let i = 0;i<error.length ; i++ ) {
        //     error[i].classList.remove('ivu-form-item-error');
        //   }
        //   for( let i = 0;i<errorTip.length ; i++ ) {
        //     errorTip[i].parentNode.removeChild(errorTip[i]);
        //   }
        // })
      },
      handleExportTypeChange (option) {
        console.log(option)
        console.log(Number(this.formValidate.exportType))
        this.ruleValidate.sourceId = []
        if (option === 1) {
          this.ruleValidate.sourceId = [
            { required: true, type:'number', message: '导出类型', trigger: 'change' }
          ]
        }
      },
      handleChangeSourceId (id) {
        console.log(id)
      },
      //checked选项改变时
      selectJobItems(options) {
        var checkedItems = this.checkedItems;
        options.forEach((option,i)=>{
          let id = option.id;
          let exist = 0;
          checkedItems.forEach((item,j) =>{
            if(id === item.id) {
              exist = 1;
            }
          })
          if(exist === 0) {
            checkedItems.push(option);
          }
        });
        this.checkedItemsAll = [];
        checkedItems.forEach((item,i) =>{
          this.checkedItemsAll.push(item);
        });
      },
      cancelOneJob(options,row) {
        this.checkedItems.forEach((item,i) =>{
          if(item.id === row.id) {
            this.checkedItems.splice(i,1);
          }
        })
        this.checkedItemsAll = this.checkedItems.concat([]);
      },
      cancelAllJob(options) {
        let lists = this.list.rows.concat([]);
        let checkItems = this.checkedItems;
        lists.forEach((list,i) =>{
          checkItems.forEach((item,j) =>{
            if(list.id === item.id) {
              checkItems.splice(j,1);
            }
          })
        })
      },
      //头部job名称搜索
      remoteMethod (query) {
        // console.log(query)
        // this.loadingStatus = true;
        // setTimeout(() => {
        //   this.loadingStatus = false;
        //   const list = this.list.map(item => {
        //     return {
        //       value: item,
        //       label: item
        //     };
        //   });
        //   if(query !== '') {
        //     this.selectOptions = list.filter(item =>
        //       item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
        //     );
        //   }else {
        //     this.selectOptions = list;
        //   }
        // }, 200);
      },
      //打开job列表：headIdModal不存在则不查询
      jobOptionList(item) {
        this.$store.dispatch('getHeadJob');
        this.list = {};
        var data = {
          jobId:'',
          jobName:this.jobName,
          startPage:this.page.current,
          pageSize:this.page.pageSize,
          headId:this.headIdModal,
          isHead:this.isHead
        }

        // -- 新增头部parent
        if(this.upperJobsParent !== 0 && this.upperJobsParent !== '0' && this.upperJobsParent !== '') {
          this.headIdModal = Number(this.upperJobsParent);
          // this.headIdModalBefore = Number(this.upperJobsParent);
        }
        // 新增头部parent --
        this.checkedItemsAll = this.jobListConfirmInfo.concat([]);  //checkedItemsAll初始赋值
        this.checkedItems = this.jobListConfirmInfo.concat([]);

        if(this.headIdModal !== undefined && this.headIdModal !== '') {
          this.jobSearch();
        }
        this.jobModal = true;
      },
      //获取所有已选的table选项
      getCheckedList() {
        var jobCheckedAll = [];
        this.jobConfirmIds = [];
        let thisCheckedIds = [];
        for(var i in this.checkedItems) {
          if(this.checkedItems[i].items) {
            for(var j in this.checkedItems[i].items) {
              jobCheckedAll.push(this.checkedItems[i].items[j]);
              thisCheckedIds.push(this.checkedItems[i].items[j].id);
              this.jobConfirmIds.push(this.checkedItems[i].items[j].id);
            }
          }
        }
        return thisCheckedIds;
      },
      clearHeadId() {

      },
      clearJobLabel() {

      },
      //搜索job
      jobSearch() {
        let jobId = this.$route.query.id;
        let accurate;
        this.page = {
          total:0,
          opts:[],
          pageSize:5,
          current:'',
          pageList:[],
          pathSubName:'',
          pathName:''
        };

        // this.page
        // --start 判断是否与外层头部job一致
        if(this.headIdModal === Number(this.upperJobsParent)) {
        }else if(this.headIdModal === this.headIdModalBefore){
        }else {
          // this.checkedItemsAll = [];
          // this.checkedItems = [];
        }
        //  判断是否与外层头部job一致  --stop

        this.jobTableStatus = 'search';
        if(this.headIdModal === undefined) {
          this.headIdModal = '';
        }
        if(this.headIdModal !== '') {
          this.isHead = true;
        }else {
          this.isHead = false;
        }
        if(this.jobLabelVal === undefined) {
          this.jobLabelVal = '';
        }
        if(this.accurate === '0') {
          accurate = false;
        }else {
          accurate = true;
        }
        this.page.current = 1;
        var data = {
          jobId:jobId,
          jobName:this.jobName.toString().trim(),
          jobLabel:this.jobLabelVal,
          startPage:1,
          pageSize:this.page.pageSize,
          headId:this.headIdModal,
          isHead:this.isHead,
          accurate: accurate,
          isValid:this.isValidOptionJob
        }
        if (this.searchJobId) {
          data.searchJobId = this.searchJobId.trim()
        }
        this.headJob_loading = true;
        this.$store.dispatch('getJobOptionList',data);
        // this.headIdModalBefore = this.headIdModal;
      },
      //关闭job
      closeJobItem (id, index) {
        let jobId = this.$route.query.id;
        this.checkedItemsAll.splice(index,1);
        this.checkedItems.forEach((item,i)=>{
          if(id === item.id) {
            this.checkedItems.splice(i,1);
          }
        });
        let data = {
          jobId:jobId,
          jobName:this.jobName,
          jobLabel:this.jobLabelVal,
          startPage:this.page.current,
          pageSize:this.page.pageSize,
          headId:this.headIdModal,
          isHead:this.isHead
        };
        this.headJob_loading = true;
        this.$store.dispatch('getJobOptionList',data);
      },
      //确认job
      jobOk () {
        let list = [];
        let id = this.$route.query.id;
        this.checkedItemsAll.forEach((item,index)=>{
          list.push(item.id);
        });
        this.Request({
          method:'post',
          url:this.basePath + '/job/checkUpper',
          contentType:'json',
          params:{
            job_id:id
          },
          data:list
        }).then(res=>{
          if(res.data.code === 1) {
            // --start 新增
            this.upperJobsParent = this.headIdModal;
            if(this.checkedItemsAll.length === 0) {
              this.upperJobsParent = '';
            }
            // 新增 --stop

            this.jobListConfirmInfo = this.checkedItemsAll;
            this.jobModal = false;
            // this.typeId = '1';      //确认后让依赖默认为'任务依赖'
          }else {
            let error = res.data.message;
            if(error) {
              error = error.split('\n');
              let content = '';
              error.forEach((item,index) =>{
                content += '<p class="word-break">'+item+'</p>';
              })
              this.$Modal.error({
                width:'520',
                title: '头部任务检测',
                content: content
              });
            }else {
              this.$Modal.error({
                width:'520',
                title: '头部任务检测',
                content: '冲突'
              });
            }
          }
        });

      },
      //取消job
      jobCancel () {
      },
      //全选
      handleCheckAll() {
        if(this.checkAll) {
          this.jobList = [];
        }else {
          this.jobList = this.jobOption.data;
        }
        this.checkAll = !this.checkAll;
      },
      //job选项改变
      jobItemChange (obj) {
        var len = this.jobList.length;
        if(len<this.jobOption.data.length) {
          this.checkAll = false;
        }else {
          this.checkAll = true;
        }
      },
      uploading(event) {
        this.file1 = event.target.files[0];
        this.formValidate.fileToUpload = event.target.files[0];
      },
      starthandleClick () {
        // this.open = !this.open;
      },
      startTimeChange (time) {
        this.formValidate.lateStartTime = time;
      },
      startTimeClear () {
        // this.open = false;
      },
      startTimeOk () {

        // this.open = false;
      },
      finishTimeChange(time) {
        this.formValidate.lateFinishTime = time;
      },
      //清除告警动作
      clearAlarmAction() {
        this.formValidate.alarmActionId = 0;
      },
      handleSubmitJobResult(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.jobResultModal = false;
            this.formValidate.dbName = this.jobResultForm.dbName;
            this.formValidate.tableName = this.jobResultForm.tableName;
          }
        })
      },
      handleSubmit (name) {
        // console.log(this.sqlItemStatus);
        // console.log(this.$refs);
        if(this.sqlItemStatus) {
          this.formValidate.sql = this.$refs.aceEditor.editor.getValue();
        }else if(this.sqlItemStatus === false){
          this.formValidate.olScriptContent = this.$refs.acePython.editor.getValue();
          if(this.formValidate.olScriptContent) {
            if(this.formValidate.olScriptFileName === '') {
              this.$Message.warning({
                content:'请填写在线脚本名称',
                closable:true
              });
              return ;
            }
          }
        }

        if(!this.formValidate.alarmActionId) {
          this.formValidate.alarmActionId = 0;
        }
        // 由于之前删除的功能造成typeId问题
        this.formValidate.type = this.typeId
        if(this.formValidate.type === '1' && this.jobListConfirmInfo.length === 0) {
          this.$Message.warning({
            content:'任务依赖类型的任务必须有上游任务',
            duration:3,
            closable:true
          })
          return ;
        }
        // -- outputs验证：非export类型
        let fullOutput = true;

        if(Number(this.formValidate.jobType) !== 4) {
          if(Number(this.formValidate.jobType) === 1 || Number(this.formValidate.jobType) === 7) {   //command | sparkStreaming类型
            if (this.outputs.length > 0) {
              this.outputs.forEach((item, index) => {
                if (item.dbName === '' || item.tableName === '') {
                  fullOutput = false;
                }
              })
            } else {           //outputs为空
              if (this.virtualHeadCommand === false) {      //虚拟头部：false
                if (this.bloodResultData_outputs.outputs.length === 0 && this.re_outputs.length === 0) {
                  this.$Message.warning({
                    content: '任务输出信息不能为空',
                    duration: 3,
                    closable: true
                  });
                  return;
                }
              }
            }
          } else {        // 非command类型
            if (this.virtualHead === false) {      //虚拟头部：false
              if (this.bloodResultData_outputs.outputs.length === 0 && this.re_outputs.length === 0) {
                this.$Message.warning({
                  content: '任务输出信息不能为空',
                  duration: 3,
                  closable: true
                });
                return;
              }
            }
          }
          if(fullOutput === false) {
            this.$Message.warning({
              content:'任务输出信息不完整',
              duration:3,
              closable:true
            })
            return false;
          }
        }

        // outputs验证 --

        // -- 频次验证
        let preType = Number(this.extendCondition.preType);
        let extendCondition = {};
        if(this.typeId === '1') {
          if(preType === null || preType === 0 || this.extendCondition.preType === undefined) {
          }else {
            extendCondition.preType = preType;
            if(preType === 1){
              if(this.extendCondition.dayList.length === 0 || !this.extendCondition.dayList) {
                this.$Message.warning('请选择每月频次');
                return ;
              }
              extendCondition.dayList = this.extendCondition.dayList;
            }else if(preType === 2) {
              if(this.extendCondition.weekDay === '' || this.extendCondition.weekDay === undefined) {
                this.$Message.warning('请选择每周频次');
                return ;
              }
              extendCondition.weekDay = this.extendCondition.weekDay;
            }else if(preType === 3) {
              if(this.extendCondition.time === '' || this.extendCondition.time === undefined) {
                this.$Message.warning('请选择每日频次');
                return ;
              }
              let time = this.extendCondition.time.split(':');
              extendCondition.hour = Number(time[0]);
              extendCondition.minute = Number(time[1]);
            }
          }
        }
        //频次验证 --

        this.$refs[name].validate((valid) => {
          if (valid) {
            this.jobFormData(preType,extendCondition);
          } else {
            this.$Message.error('信息不完整!');
          }
        })
      },
      //保存为草稿
      saveDraft() {
        if(this.sqlItemStatus) {
          //获取sql值
          this.formValidate.sql = this.$refs.aceEditor.editor.getValue();
        }else if(this.sqlItemStatus === false) {
          this.formValidate.olScriptContent = this.$refs.acePython.editor.getValue();
        }

        let preType = Number(this.extendCondition.preType);
        let extendCondition = {};
        if(this.formValidate.type === '1') {
          if(preType === null || preType === 0 || this.extendCondition.preType === undefined) {
          }else {
            extendCondition.preType = preType;
            if(preType === 1){
              extendCondition.dayList = this.extendCondition.dayList;
            }else if(preType === 2) {
              extendCondition.weekDay = this.extendCondition.weekDay;
            }else if(preType === 3) {
              let time = this.extendCondition.time.split(':');
              extendCondition.hour = Number(time[0]);
              extendCondition.minute = Number(time[1]);
            }
          }
        }
        this.jobFormData(preType,extendCondition);
      },
      //任务提交
      jobFormData(preType,extendCondition) {
        console.log(this.formValidate.exportType)
        let formData = new FormData();
        // console.log(this.formValidate)
        this.jobListConfirm = [];
        this.jobListConfirmInfo.forEach((item,index) => {
          this.jobListConfirm.push(item.id);
        })
        this.formValidate.upperJobs = this.jobListConfirm;
        formData.append('id',this.formValidate.id);
        // console.log(this.jobConfirmIds)
        // formData.append('fileToUpload',this.formValidate.fileToUpload);
        formData.append('jobName',this.formValidate.jobName);
        if(this.formValidate.jobType !== '') {
          formData.append('jobType', this.formValidate.jobType);
        }
        formData.append('jobLabel',this.formValidate.jobLabel);
        formData.append('type',this.typeId);
        if(this.formValidate.priorityLevel !== '') {
          formData.append('priorityLevel', this.formValidate.priorityLevel);
        }

        //执行服务器
        if(Number(this.formValidate.jobType) !== 4) {
          formData.append('tagType',this.formValidate.tagType);
        }

        // tidb的数据源
        if(Number(this.formValidate.jobType) === 5) {
          formData.append('dataSourceId',this.formValidate.dataSourceId);
        }

        formData.append('retryTimes',this.formValidate.retryTimes);
        formData.append('retryInterval',this.formValidate.retryInterval);
        formData.append('timeOut',this.formValidate.timeOut);
        formData.append('isValid',this.formValidate.isValid);
        formData.append('ccrId',this.formValidate.ccrId);
        formData.append('isMutex',this.formValidate.isMutex);
        // this.outputs = JSON.stringify(this.outputs);

        // -- 单组任务输出
        // formData.append('dbName',this.formValidate.dbName);
        // formData.append('tableName',this.formValidate.tableName);
        // 单组任务输出 --
        let that = this;

        if(this.typeId === '0') {
          formData.append('crontabExpression',this.formValidate.crontabExpression);
        }else {
          formData.append('crontabExpression',this.formValidate.crontabExpression);
          formData.append('upperJobs',this.formValidate.upperJobs);
          if(preType === null || preType === 0 || this.extendCondition.preType === undefined) {
          }else {
            formData.append('extendCondition',JSON.stringify(extendCondition));
          }
        }

        //区分sql与command类型
        if(this.sqlItemStatus) {
          formData.append('sql',this.formValidate.sql);
          let all_inputs = this.re_inputs.concat(that.bloodResultData_outputs.inputs);
          all_inputs.forEach((item,index) =>{
            formData.append('inputs['+index+'].dbName',item.dbName);
            formData.append('inputs['+index+'].tableName',item.tableName);
          });
          // --- 多组任务输出
          if(this.virtualHead === false) {
            let all_outputs = this.outputs.concat(that.re_outputs,that.bloodResultData_outputs.outputs);
            all_outputs = this.distinctArrBlood(all_outputs);
            all_outputs.forEach((item,index) =>{
              formData.append('outputs['+index+'].dbName',item.dbName);
              formData.append('outputs['+index+'].tableName',item.tableName);
            });
          }
          formData.append('dummyJob',this.virtualHead);
          // 多组任务输出 ---
        }else if(this.sqlItemStatus === false) {
          formData.append('exeCmd',this.formValidate.exeCmd);
          formData.append('olScriptContent',this.formValidate.olScriptContent);
          formData.append('olScriptFileName',this.formValidate.olScriptFileName);

          // --- 多组任务输出
          if(this.virtualHeadCommand === false) {
            let all_outputs = this.outputs.concat(that.re_outputs,that.bloodResultData_outputs.outputs);
            all_outputs = this.distinctArrBlood(all_outputs);
            all_outputs.forEach((item,index) =>{
              formData.append('outputs['+index+'].dbName',item.dbName);
              formData.append('outputs['+index+'].tableName',item.tableName);
            });
          }
          formData.append('dummyJob',this.virtualHeadCommand);
          // 多组任务输出 ---
        }
        if(this.formValidate.lateStartTime) {
          formData.append('lateStartTime',this.formValidate.lateStartTime);
        }
        if(this.formValidate.lateFinishTime) {
          formData.append('lateFinishTime',this.formValidate.lateFinishTime);
        }
        if(this.formValidate.alarmActionId) {
          formData.append('alarmActionId',this.formValidate.alarmActionId);
        }
        if(this.formValidate.remark) {
          formData.append('remark',this.formValidate.remark);
        }

        //    data-export类型
        if(this.formValidate.jobType === '4') {
          if(this.formValidate.exportType) {
            formData.append('exportType',this.formValidate.exportType);
          }
          if(this.formValidate.sourceDb) {
            formData.append('sourceDb',this.formValidate.sourceDb);
          }
          if(this.formValidate.sourceTb) {
            formData.append('sourceTb',this.formValidate.sourceTb);
          }
          if(this.formValidate.targetId !== null && this.formValidate.targetId !== undefined) {
            formData.append('targetId',this.formValidate.targetId);
          }
          if(this.formValidate.targetDb) {
            formData.append('targetDb',this.formValidate.targetDb);
          }
          if(this.formValidate.targetTb) {
            formData.append('targetTb',this.formValidate.targetTb);
          }
          if(this.formValidate.sourceWhere) {
            formData.append('sourceWhere',this.formValidate.sourceWhere);
          }
          if (this.formValidate.exportType === 0) {
            if(this.formValidate.sourceColumns) {
              formData.append('sourceColumns',this.formValidate.sourceColumns);
            }
            if(this.$refs.aceEditorExport.editor.getValue()) {
              formData.append('sourceQuery',this.$refs.aceEditorExport.editor.getValue());
            }
            if(this.formValidate.current !== undefined  && this.formValidate.current !== null) {
              if(this.formValidate.current === '') {
                formData.append('current',0);
              }else {
                formData.append('current',this.formValidate.current);
              }
            }
            if(this.formValidate.targetPresql) {
              formData.append('targetPresql',this.formValidate.targetPresql);
            }
            if(this.formValidate.targetColumns) {
              formData.append('targetColumns',this.formValidate.targetColumns);
            }
            if(this.formValidate.updateMode) {
              formData.append('updateMode',this.formValidate.updateMode);
            }
            if(this.formValidate.updateKey) {
              formData.append('updateKey',this.formValidate.updateKey);
            }
          } else if (this.formValidate.exportType === 1) {
            if(this.formValidate.sourceId !== null && this.formValidate.sourceId !== undefined) {
              formData.append('sourceId',this.formValidate.sourceId);
            }
          }
          // formData.append('targetExisted',this.formValidate.targetExisted);
          // formData.append('columnMapping',this.formValidate.columnMapping);
          // formData.append('rowkey',this.formValidate.exportJob.rowkey);
          this.$store.dispatch("editJob",formData);
        }else {
          this.$store.dispatch("editJob",formData);
        }
      },
      handleReset (name) {
        this.$router.push('/taskManage')
      },
      handleUpload (file) {
        // console.log(upload)
        // upload.size
        if(file.size > 4194304) {
          this.$Message.warning({
            content:'文件不能超过4M',
            duration:3,
            closable:true
          })
        }else {
          this.formValidate.fileName = file.name;
          this.formValidate.fileToUpload = file;
          this.updateFile = file;
        }
        return false;
      },
      updateJobFile() {
        // console.log(this.updateFile)
        var id = this.$route.query.id;
        if(!this.updateFile) {
          this.$Message.warning({
            content:'未选择文件'
          })
        }else {
          let formData = new FormData();
          formData.append('id',id);
          formData.append('fileToUpload',this.updateFile);
          this.$axios.post(`${this.basePath}/job/updateJobFile`,formData).then( res=>{
            // console.log(res)
            var result = res.data;
            if(res.status === 208) {
              this.$redirect(res);
            }
            if(result.code === 1) {
              this.$Message.success({
                content:'文件更新成功',
                duration:3,
                closable:true
              });
              this.backupInfo();
            }
          }).catch(err=>{
            console.log(err)
            this.$error(err);
          })
        }

      },
      deleteJobFileTip () {
        var id = this.$route.query.id;
        this.$Modal.confirm({
          title:'删除文件',
          content: `确认删除id=${id}任务的文件吗？`,
          onOk: () => {
            this.deleteJobFile(id)
          },
          onCancel: () => {
          }
        })
      },
      deleteJobFile(id) {
        let formData = new FormData();
        formData.append('id',id);
        this.$axios.post(`${this.basePath}/job/deleteJobFile`,formData).then( res=>{
            var result = res.data;
            if(result.code === 1) {
              this.$Message.success({
                content:'文件删除成功',
                duration:3,
                closable:true
              });
              this.formValidate.fileName = null;
              this.backupInfo();
            }else {
              this.$Message.error({
                content:obj.data.message,
                duration:10,
                closable: true
              })
            }
          }).catch(err=>{
            this.$error(err);
          })
      },
      //切换页数
      changePage(page) {
        let accurate = false;
        if(this.accurate === '0') {
          accurate = false;
        }else {
          accurate = true;
        }
        let jobId = this.$route.query.id;
          this.jobTableStatus = 'page';
          this.page.current = page;
          var data = {
            jobId:jobId,
            jobName:this.jobName.trim(),
            jobLabel:this.jobLabelVal,
            startPage:this.page.current,
            pageSize:this.page.pageSize,
            headId:this.headIdModal,
            isHead:this.isHead,
            accurate:accurate
          }
          this.headJob_loading = true;
          this.$store.dispatch('getJobOptionList',data);
      },
      //切换每页显示个数
      changePageSize(pagesize) {
        let accurate = false;
        if(this.accurate === '0') {
          accurate = false;
        }else {
          accurate = true;
        }
        let jobId = this.$route.query.id;
        this.jobTableStatus = 'pageSize';
        this.page.pageSize = pagesize;
        var data = {
          jobId:jobId,
          jobLabel:this.jobLabelVal,
          jobName:this.jobName,
          startPage:this.page.current,
          pageSize:this.page.pageSize,
          headId:this.headIdModal,
          isHead:this.isHead,
          accurate:accurate
        }
        this.headJob_loading = true;
        this.$store.dispatch('getJobOptionList',data);
      }

    }
  }
</script>
<style>
  .drawer-footer{
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    background: #fff;
    z-index:3;
  }
  .task-output {
    width:100px;
    text-align: right;
    padding:0 12px;
    cursor:pointer;
  }
  .blood-job-item {
    float: left;
    width: 40%;
  }
  .blood-job-item .prepend-input-inline.ivu-input-group {
    width: 50%;
    margin-right: 0;
    padding-right: 15px;
  }
  .blood-job-item .ivu-tag-group {
    float: left;
    margin-right: 5%;
    height: 32px;
    line-height: 32px;
  }
  .target-item-tidb.ivu-select-item {
    /*background-color: aliceblue;*/
    color: #ed4014;
  }
  .target-item-tidb.ivu-select-item:hover {
    background: #f3f3f3;
  }
  .prepend-input-inline.blood-job-item-detail .ivu-input-group-prepend {
    background: #19be6b;
    color: #fff;
    border-color: #19be6b;
  }
  .prepend-input-inline.blood-job-item-detail .ivu-input {
    border-color: #19be6b;
  }
</style>
