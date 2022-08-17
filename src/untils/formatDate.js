// 格式化时间
export function localDate(dateStr) {
    const date = new Date(dateStr).toLocaleDateString();
    return date.replace(/\//g,"-");
}
export function chinaDate(dateStr) {
    const date = new Date(dateStr);
    return date.getFullYear()+"年" + (date.getMonth()+1)+"月" + date.getDate()+"日";
}