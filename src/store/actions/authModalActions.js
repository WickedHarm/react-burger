export const AUTH_MODAL_SHOW = "AUTH_MODAL_SHOW";
export const BACKDROP_HIDE = "BACKDROP_SHOW";

export const authModalShow = () => {
    return {
        type: AUTH_MODAL_SHOW
    }
}

export const backdropShow = () => {
    return {
        type: BACKDROP_HIDE
    }
}
