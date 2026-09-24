export const redirectToBrainlifeLogin = () => {
    if (typeof window !== 'undefined') {
        const redirectURL = `${window.location.origin}${window.location.pathname}`;
        window.location.href = `https://brainlife.io/auth/#!/signin?app=connects&callback=${encodeURIComponent(redirectURL)}`;
    }
};

export const initialAuth = {
    jwt: undefined,
    payload: undefined,
};
