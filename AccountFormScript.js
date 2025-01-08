AccountFormScript = {
    showAccountName: function (executionContext) {
        'use strict';
        var formContext = executionContext.getFormContext();

        // 获取 Account Name 属性
        var accountNameAttribute = formContext.getAttribute('name');

        // 检查 accountNameAttribute 是否存在以及其值是否不为 null
        if (accountNameAttribute != null) {
            var accountName = accountNameAttribute.getValue();
            if (accountName !== null) {
                // 显示包含当前 Account Name 的通知
                AccountFormScript.showNameNotification(
                    formContext,
                    accountName
                );
            } else {
                // 如果 Account Name 为 null，则清除可能存在的通知
                formContext.ui.clearFormNotification(
                    'account_name_notification'
                );
            }
        }
    },

    showNameNotification: function (formContext, accountName) {
        var notificationStrings = {
            text: `The Account Name is: ${accountName}`,
            title: 'Account Name Notification',
        };
        var notificationOptions = {
            showCloseButton: true,
            level: 'INFO',
        };

        formContext.ui.setFormNotification(
            notificationStrings.text,
            notificationOptions.level,
            'account_name_notification' // 使用唯一的 ID
        );
    },

    // 如果 telephone1 字段为空，则设置默认值 "1234567890"
    OnLoad: function (executionContext) {
        'use strict';
        var formContext = executionContext.getFormContext();

        // 获取 new_phone_x 字段的值
        var phoneXValue = formContext.getAttribute('telephone1').getValue();

        // 如果为空，则设置默认值
        if (phoneXValue === null) {
            formContext.getAttribute('telephone1').setValue('1234567890');
        }
    },

    OnSave: function (executionContext) {
        ('use strict');
        var formContext = executionContext.getFormContext();
        var saveEvent = executionContext.getEventArgs();

        // 获取 new_phone_x 字段的值
        var phoneXValue = formContext.getAttribute('telephone1').getValue();

        // 2. 如果 telephone1 字段的值不为空且不以 "+86-" 开头，则添加前缀 "+86-"
        if (phoneXValue !== null && !phoneXValue.startsWith('+86-')) {
            formContext
                .getAttribute('telephone1')
                .setValue('+86-' + phoneXValue);
            formContext.ui.setFormNotification(
                '已为 telephone1 添加国家代码前缀 +86-。',
                'INFO',
                'phone_x_prefix_added'
            );
        } else {
            formContext.ui.clearFormNotification('phone_x_prefix_added');
        }
    },

    accountNameOnChange: function (executionContext) {
        'use strict';
        var formContext = executionContext.getFormContext();
        var accountName = formContext.getAttribute('name').getValue();
        // 警告消息内容
        var alertStrings = {
            text:
                '您正在更改客户的名称为：' +
                accountName +
                '。\n请确认此更改，并注意更改名称可能会影响相关的业务。\n是否继续？',
            title: '更改名字警告',
        };
        var alertOptions = { height: 500, width: 450 };
        // 打开警告提示框
        Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(
            function (success) {
                console.log('警告对话框已关闭');
            },
            function (error) {
                console.log(error.message);
            }
        );
    },
};