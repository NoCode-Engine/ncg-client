declare const NCGCore: {
    config: {
        load: () => Promise<any>;
    };
    starwarsAPI: () => Promise<any>;
};
export default NCGCore;
