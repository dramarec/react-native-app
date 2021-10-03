import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type RootStackParamList = {
  MainScreen: NavigatorScreenParams<RootTabParamList> | undefined;
  LoginScreen: NavigatorScreenParams<RootTabParamList> | undefined;
  UserScreen: NavigatorScreenParams<RootTabParamList> | undefined;
  CommunitiesScreen: NavigatorScreenParams<RootTabParamList> | undefined;
  SplashScreen: NavigatorScreenParams<RootTabParamList> | undefined;
  NotFound: undefined;
};

export type RootStackScreenProps
  <T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type RootTabParamList = {
  MainScreen: undefined;
  LoginScreen: undefined;
  UserScreen: undefined;
  CommunitiesScreen: undefined;
  SplashScreen: undefined;
};