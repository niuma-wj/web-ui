<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="24" :xs="24">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
          <el-form-item label="ID" prop="playerId">
            <el-input
              v-model="queryParams.playerId"
              placeholder="请输入ID"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input
              v-model="queryParams.nickname"
              placeholder="请输入昵称"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="在线状态" prop="online">
            <el-select v-model="queryParams.online" placeholder="请选择">
              <el-option label="在线" value="1"> </el-option>
              <el-option label="离线" value="0"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>

        <el-table v-loading="loading" :data="playerList">
          <el-table-column label="ID" align="center" prop="playerId" />
          <el-table-column label="账号" align="center" prop="account" />
          <el-table-column label="昵称" align="center" prop="nickname" />
          <el-table-column label="头像" align="center" prop="headUrl" width="100">
            <template slot-scope="scope">
              <img :src="scope.row.headUrl" :width="50" :height="50"/>
            </template>
          </el-table-column>
          <el-table-column label="电话" align="center" prop="phone" />
          <el-table-column label="性别" align="center" width="100">
            <template slot-scope="scope">
              <span>{{ getSex(scope.row.sex) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="上级代理" align="center" prop="agency" />
          <el-table-column label="当前游戏" align="center" prop="gameRoom" />
          <el-table-column label="登录IP" align="center" prop="loginIp" />
          <el-table-column label="登录时间" align="center" prop="loginDate" />
          <el-table-column label="在线状态" align="center" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.online === 1 ? "在线" : "离线" }}</span>
            </template>
          </el-table-column>
          <el-table-column label="禁用" align="center" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.banned === 1 ? "是" : "否" }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="handleBan(scope.row)"
                v-hasPermi="['niuma:player']"
              >{{ scope.row.banned === 1 ? "启用" : "禁用" }}</el-button>
            </template>
          </el-table-column>
        </el-table>
        
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { listPlayer, banPlayer } from "@/api/niuma/player";
export default {
  name: "Player",
  data() {
    return {
      // 遮罩层
      loading: false,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 玩家表格数据
      playerList: [],
      queryParams: {
        playerId: null,
        nickname: null,
        online: null,
        pageNum: 1,
        pageSize: 10
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询玩家列表 */
    getList() {
      this.loading = true;
      let vm = this;
      listPlayer(this.queryParams).then((response) => {
        vm.playerList = response.records;
        vm.total = response.total;
        vm.loading = false;
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        vm.loading = false;
      });
    },
    getSex(sex) {
      if (sex === 1)
        return "男";
      else if (sex === 2)
        return "女";
        return "未知";
    },
    getHeadImageUrl(url) {
      console.log(url);
      return `https://img2.baidu.com/it/u=1824345149,1911120526&fm=253&fmt=auto?w=560&h=560`;
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 禁用或启用玩家账号
    handleBan(row) {
      let msg = '';
      if (row.banned) {
        msg = "启用玩家成功";
      } else {
        msg = "禁用玩家成功";
      }
      banPlayer(row.playerId).then((response) => {
        this.$modal.msgSuccess(msg);
      });
    }
  }
};
</script>
