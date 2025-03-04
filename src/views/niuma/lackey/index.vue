<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="24" :xs="24">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
          <el-form-item label="房间ID" prop="venueId">
            <el-input
              v-model="queryParams.venueId"
              placeholder="请输入房间ID"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="房主ID" prop="ownerId">
            <el-input
              v-model="queryParams.ownerId"
              placeholder="请输入房主ID"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="房间编号" prop="number">
            <el-input
              v-model="queryParams.number"
              placeholder="请输入房间编号"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="dateRange"
              style="width: 240px"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>

        <el-table v-loading="loading" :data="roomList">
          <el-table-column label="房间ID" align="center" prop="venueId" />
          <el-table-column label="房主ID" align="center" prop="ownerId" />
          <el-table-column label="房主昵称" align="center" prop="ownerName" />
          <el-table-column label="房间编号" align="center" prop="number" />
          <el-table-column label="房间等级" align="center" width="100">
            <template slot-scope="scope">
              <span>{{ getLevel(scope.row.level) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="模式" align="center" width="100">
            <template slot-scope="scope">
              <span>{{ getMode(scope.row.mode) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="底注" align="center" prop="diZhu" />
          <el-table-column label="状态" align="center" width="100">
            <template slot-scope="scope">
              <span>{{ getStatus(scope.row.status) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" align="center" prop="createTime" />
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="handleRecord(scope.row)"
                v-hasPermi="['niuma:player']"
              >游戏记录</el-button>
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
import { listLackey } from "@/api/niuma/game";
export default {
  name: "Lackey",
  data() {
    return {
      // 遮罩层
      loading: false,
      // 显示搜索条件
      showSearch: true,
      // 日期范围
      dateRange: [],
      // 总条数
      total: 0,
      // 房间表格数据
      roomList: [],
      queryParams: {
        venueId: null,
        ownerId: null,
        number: null,
        createTimeStart: null,
        createTimeEnd: null,
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
      console.log();
      if (this.dateRange) {
        this.queryParams.createTimeStart = this.dateRange[0];
        this.queryParams.createTimeEnd = this.dateRange[1];
      }
      listLackey(this.queryParams).then((response) => {
        vm.roomList = response.records;
        vm.total = response.total;
        vm.loading = false;
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        vm.loading = false;
      });
    },
    getLevel(level) {
      if (level === 1) {
        return "好友房";
      } else if (level === 2) {
        return "新手房";
      } else if (level === 3) {
        return "初级房";
      } else if (level === 4) {
        return "高级房";
      } else if (level === 5) {
        return "大师房";
      } 
      return "";
    },
    getMode(mode) {
      if (mode === 0)
        return "扣钻";
      return "抽佣";
    },
    getStatus(status) {
      if (status < 2) {
        return "进行中";
      }
      return "已结束";
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
    handleRecord(row) {
      this.$modal.msg("尚未实现");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
