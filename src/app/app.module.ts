import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

import { StoreProvider } from '../providers/store/store';
import { ProductProvider } from '../providers/Store/product';
import { Api } from '../providers/api/api';
import { HttpClientExt } from '../providers/http-client/http-client';

@NgModule({
	declarations: [
		MyApp,
		HomePage,
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		IonicModule.forRoot(MyApp, {
			backButtonText: '',
		}),
		IonicStorageModule.forRoot(),
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage,
	],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		StoreProvider,
		ProductProvider,
		Api,
		HttpClientExt
	]
})
export class AppModule { }
