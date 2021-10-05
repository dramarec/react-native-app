import { NavigatorScreenParams } from '@react-navigation/native'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export interface RootStackParamList {
  MainScreen: NavigatorScreenParams<RootTabParamList> | undefined;
  LoginScreen: NavigatorScreenParams<RootTabParamList> | undefined;
  UserScreen: NavigatorScreenParams<RootTabParamList> | undefined;
  SplashScreen: NavigatorScreenParams<RootTabParamList> | undefined;
}

export interface RootTabParamList {
  MainScreen: undefined;
  LoginScreen: undefined;
  UserScreen: undefined;
  SplashScreen: undefined;
}
