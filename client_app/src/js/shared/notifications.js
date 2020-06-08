import { notification as Notification } from 'antd';

const DEFALT_STYLES = {
    maxWidth: '300px',
    right: '-50px',
    'word-break': 'break-word'
};

export function showErrorNotification({ title = 'Error', description }) {
    Notification.error({
        message: title,
        description: description,
        duration: 10,
        style: DEFALT_STYLES
    });
}

export function showSuccessNotification({ title = 'Done', description }) {
    Notification.success({
        message: title,
        description: description,
        duration: 10,
        style: DEFALT_STYLES
    });
}
