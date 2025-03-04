import request from '@/utils/request';
import { parseStrEmpty } from "@/utils/ruoyi";

// 查询用户列表
export function listPlayer(data) {
  return request({
    url: '/admin/player/page',
    method: 'post',
    data: data
  });
}

// 禁用或启用玩家
export function banPlayer(playerId) {
  return request({
    url: '/admin/player/ban/' + parseStrEmpty(userId),
    method: 'post'
  });
}
