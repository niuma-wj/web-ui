import request from '@/utils/request';
import { parseStrEmpty } from "@/utils/ruoyi";

// 查询麻将房间列表
export function listMahjong(data) {
  return request({
    url: '/admin/mahjong/page',
    method: 'post',
    data: data
  });
}

// 查询比鸡房间列表
export function listBiJi(data) {
  return request({
    url: '/admin/bi-ji/page',
    method: 'post',
    data: data
  });
}

// 查询逮狗腿房间列表
export function listLackey(data) {
  return request({
    url: '/admin/lackey/page',
    method: 'post',
    data: data
  });
}

// 查询百人牛牛房间列表
export function listNiu100(data) {
  return request({
    url: '/admin/niu100/page',
    method: 'post',
    data: data
  });
}