import { ElMessage } from 'element-plus';

export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    console.log("复制成功");
    ElMessage.success("已复制到剪贴板");
  } catch (err) {
    console.error("复制失败", err);
    ElMessage.error("复制失败，请手动复制");
  }
}
