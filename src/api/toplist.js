import { post } from "./http";

// 获取排行榜
export function getTopList() {
    return post("/toplist");
}