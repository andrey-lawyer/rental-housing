
import type ICurrentUser from './userType';
export interface IState {
  userCurrent: null | ICurrentUser
  isLoading: boolean,
  }