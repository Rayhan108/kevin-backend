import NotificationModel from "../modules/Notification/notification.model";


const getUserNotificationCount = async (receiver: string) => {
    const unseenCount = await NotificationModel.countDocuments({
        seen: false,
        receiver: receiver,
    });
    const latestNotification = await NotificationModel.findOne({
        receiver: receiver,
    })
        .sort({ createdAt: -1})
        .lean();
    return { unseenCount,latestNotification};
};

export default getUserNotificationCount;