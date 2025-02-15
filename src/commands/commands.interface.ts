// インターフェースを定義する理由は、他の機能などを持たせる時に、Typeよりも柔軟に抽象的に扱うため
// インターフェースを使う際には、はじめにIをつけることと、
// 1対1の関係になる際には、ファイル名に~.interface.tsとする

import { Action } from "../shared/types";

export interface ICommand {
  name: string;
  description: string;
  action: Action;
}
