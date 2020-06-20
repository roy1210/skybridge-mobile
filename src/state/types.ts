import { ISwapState } from "./swap/types";
import { IExplorerState } from "./explorer/types";
export interface IApplicationState {
  swap: ISwapState;
  explorer: IExplorerState;
  // nodeList: INodeListState;
}
