function load(theme: string) {
    switch (theme) {
        case "necc":
            console.log("Load necc theme");
            import("./Less/necc_theme/index.less");
            break;
        case "army":
            console.log("Load army theme");
            import("./Less/necc_theme/index.less");
            break;
        default:
            console.log("Load meta theme");
            import("./Less/meta_theme/index.less");
            break;
    }
}

export default {
    load,
};
