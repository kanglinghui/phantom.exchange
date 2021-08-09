import { ElNotification } from "element-plus";
const noti = (params) => {
  if (params.type === "error") {
    ElNotification.error({
      title: "通知",
      customClass: "err__info",
      message: params.msg,
    });
  } else if (params.tpye === "warning") {
    ElNotification({
      title: "通知",
      customClass: "warning__info",
      message: params.msg,
      type: "warning",
    });
  } else {
    ElNotification({
      title: "通知",
      customClass: "success__info",
      message: params.msg,
      type: "success",
    });
  }
};
export default noti;
