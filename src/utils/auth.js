export const authButtonNameHandler = (mode) => {
    switch (mode){
        case 'signup': return 'Sign up';
        case 'login': return 'Log in';
        case 'reset': return 'Reset password';
        case 'change-password': return 'Change password';
        default: return 'Log in'
    }
};

export const authBodyHandler = (mode, formData, urlObject) => {
    switch (mode){
        case 'signup': return {
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
            loginUrl: urlObject.origin + urlObject.pathname + '?mode=login',
        };
        case 'login': return {
            email: formData.get('email'),
            password: formData.get('password'),
        }
        case 'reset': return {
            email: formData.get('email'),
            resetUrl: urlObject.origin + urlObject.pathname + '?mode=change-password',
        };
        case 'change-password': return {
            password: formData.get('password'),
            passwordToken: urlObject.search.split('/')[1],
            loginUrl: urlObject.origin + urlObject.pathname + '?mode=login',

        };
        default: return null
    }
};