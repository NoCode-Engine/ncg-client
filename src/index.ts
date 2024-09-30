// @ts-ignore
import { axios } from '@bundled-es-modules/axios';
import { Ctx } from './types';
import { Config } from './config';
import { pagination } from './pagination';

interface INCGCore {
  init: any;
  config: Record<string, unknown> | null;
  pagination: { paginate: (taskId: string, payload: Record<string, any>) => any };
}

const NCGCore = (() => {
  let websiteId = '';
  const httpClient = axios.create({ timeout: 60000 });
  const ctx: Ctx = {
    httpClient,
  };

  const config = Config(ctx);

  return {
    init: async (siteId: string) => {
      websiteId = siteId;
      NCGCore.config = await config.load(siteId); // TODO - Catch, log and rethrow error if config cannot be loaded
      ctx.websiteId = siteId;
    },
    config: null,
    pagination: pagination(ctx),
  } as INCGCore;
})();

export default NCGCore;
