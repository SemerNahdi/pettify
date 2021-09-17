// @flow
export {Theme} from "./Theme";
export {AnimatedView} from "./Animations";
export {TextField} from "./Fields";

export {default as Text} from "./Text";
export {default as Button} from "./Button";
export {default as Container} from "./Container";
export {default as Switch} from "./Switch";
export {default as Logo} from "./Logo";
export {default as Avatar} from "./Avatar";
export {default as SmartImage} from "./SmartImage";
export {default as CacheManager} from "./CacheManager";
export {default as RefreshIndicator} from "./RefreshIndicator";
export {default as NavHeader} from "./NavHeader";
export {default as NavHeaderWithButton} from "./NavHeaderWithButton";
export {default as Firebase} from "./Firebase";
export {default as ImageUpload} from "./ImageUpload";

export const serializeException = (e: string | {}): string => {
    if (typeof e === "string") {
        return e;
    } else if (e.message) {
        // $FlowFixMe
        return e.message;
    }
    return JSON.stringify(e);
};
