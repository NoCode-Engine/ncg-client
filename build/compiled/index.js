// @ts-ignore
// import { NODE_ENV } from 'process.env';
import axios from 'axios';
import { Config } from './config';
const NCGCore = (() => {
    const httpClient = axios.create({ timeout: 60000 });
    const ctx = {
        httpClient,
    };
    const config = Config(ctx);
    return {
        config,
        starwarsAPI: async () => {
            const { data } = await axios.get('https://swapi.dev/api/people/1');
            return data;
        },
    };
})();
export default NCGCore;
//# sourceMappingURL=index.js.map