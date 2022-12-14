import Notify from 'simple-notify';

function pushSuccessNoti(title = 'Default noti title', content = 'Default noti content') {
    console.log('Push noti');

    new Notify({
        status: 'success',
        title: title,
        text: content,
        effect: 'fade',
        speed: 300,
        customClass: null,
        customIcon: null,
        showIcon: true,
        showCloseButton: true,
        autoclose: false,
        autotimeout: 10000,
        gap: 20,
        distance: 20,
        type: 1,
        position: 'x-center y-center ',
    });
}

function pushWarningNoti(title = 'Default noti title', content = 'Default noti content') {
    new Notify({
        status: 'warning',
        title: title,
        text: 'content',
        effect: 'fade',
        speed: 300,
        customClass: null,
        customIcon: null,
        showIcon: true,
        showCloseButton: true,
        autoclose: false,
        autotimeout: 3000,
        gap: 20,
        distance: 20,
        type: 1,
        position: 'right bottom',
    });
}
function pushErrorNoti(title = 'Default noti title', content = 'Default error content') {
    console.log('Push noti');
    new Notify({
        status: 'error',
        title: title,
        text: 'content',
        effect: 'fade',
        speed: 300,
        customClass: 'noti',
        customIcon: null,
        showIcon: true,
        showCloseButton: true,
        autoclose: false,
        autotimeout: 3000,
        gap: 20,
        distance: 20,
        type: 1,
        position: 'right bottom',
    });
}
pushSuccessNoti('Hello', 'ashfdk');
export { pushErrorNoti, pushSuccessNoti, pushWarningNoti };
