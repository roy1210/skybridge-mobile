import { ISwapState } from "./swap/types";
import { IExplorerState } from "./explorer/types";
export interface IApplicationState {
  swap: ISwapState;
  explorer: IExplorerState;
  settings;
  // nodeList: INodeListState;
}
