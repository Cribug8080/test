// 给定一个无重复元素的数组 candidates 和一个目标数 target ，
// 找出 candidates 中所有可以使数字和为 target 的组合。

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    let res = [];
    for (let i = 0; i < candidates.length; i++) {
        const element = candidates[i];
        let temp = target - element
        if(temp > 0) {
            let ll = combinationSum(candidates, temp)
                .filter(v => v[v.length - 1] - element >= 0)
                .map(v => {
                    v.push(element)
                    return v;
                })
            if(ll) {
                res = res.concat(ll)
            }
        } else if(temp === 0) {
            res.push([element])
        }
    }
    return res;
};
let ss = combinationSum([2,3,5], 8)
console.log(ss)


applicationId { id: 42 cluster_timestamp: 1568688835720 } 
user: "hdfs" 
queue: "root.users.hdfs" 
name: "kyuubi|hdfs|172.19.133.123|10009|62f091a1-1024-445c-85ed-924ca68d6709" 
host: "172.19.133.128" 
rpc_port: -1 
yarn_application_state: RUNNING 
trackingUrl: "http://test6.hadoop.testdc.finupgroup.com:8088/proxy/application_1568688835720_0042/"
 diagnostics: "" 
 startTime: 1569312751531 
 finishTime: 0 
 final_application_status: APP_UNDEFINED 
 app_resource_Usage { 
     num_used_containers: 1 
     num_reserved_containers: 1 
     used_resources { 
         memory: 9216 virtual_cores: 2 
        } 
    reserved_resources { 
        memory: 9216 virtual_cores: 2 
    } 
    needed_resources { 
        memory: 18432 virtual_cores: 4 
    } 
    memory_seconds: 71586662 
    vcore_seconds: 15535 
} 
originalTrackingUrl: "http://test3.hadoop.testdc.finupgroup.com:39707" 
currentApplicationAttemptId { 
    application_id { 
        id: 42 
        cluster_timestamp: 1568688835720 
    } attemptId: 1 
} 
progress: 0.1 
applicationType: "SPARK" 
21: 2

<th scope="col">ID</th>
<th scope="col">User</th>
<th scope="col">Name</th>
<th scope="col">ApplicationType</th>
<th scope="col">Queue</th>
<th scope="col">StartTime</th>
<th scope="col">FinishTime</th>
<th scope="col">state</th>
<th scope="col">FinalStatus</th>
<th scope="col">Running Containers</th>
<th scope="col">Allocated VCores</th>
<th scope="col">Allocated Memory</th>
<th scope="col">Reserved VCores</th>
<th scope="col">Reserved Memory</th>
<th scope="col">progress</th>
<th scope="col">Tracking UI</th>
map.put("id", ele.getApplicationId());
map.put("user", ele.getUser());
map.put("name", ele.getName());
map.put("applicationType", ele.getApplicationType());
map.put("queue", ele.getQueue());
map.put("startTime", ele.getStartTime());
map.put("finishTime", ele.getFinishTime());
map.put("state", ele.getYarnApplicationState());
map.put("finalStatus", ele.getFinalApplicationStatus());
map.put("runningContainers", ele.getApplicationResourceUsageReport().getNumUsedContainers());
map.put("allocatedVCores", ele.getApplicationResourceUsageReport().getNeededResources().getVirtualCores());
map.put("allocatedMemory", ele.getApplicationResourceUsageReport().getNeededResources().getMemory());
map.put("reservedVCores", ele.getApplicationResourceUsageReport().getReservedResources().getVirtualCores());
map.put("reservedMemory", ele.getApplicationResourceUsageReport().getReservedResources().getMemory());
map.put("progress", ele.getProgress());
map.put("trackingUI", ele.getTrackingUrl());