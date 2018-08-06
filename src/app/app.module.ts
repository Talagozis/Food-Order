import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

import { HttpClientExt } from '../providers/http-client/http-client';
import { Api } from '../providers/api/api';
import { Rpc } from '../providers/rpc/rpc';
import { StoreProvider } from '../providers/store/store';
import { ProductProvider } from '../providers/Product/product';
import { OrderProvider } from '../providers/Order/order';
import { CartProvider } from '../providers/Cart/cart';
import { HubUserProvider } from '../providers/HubUser/hubUser';
import { AnalyticsProvider } from '../providers/analytics/analytics';


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
		IonicStorageModule.forRoot({
			name: '__mydb',
			driverOrder: ['sqlite', 'websql', 'indexeddb']
		}),
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
		AnalyticsProvider,
		StoreProvider,
		ProductProvider,
		OrderProvider,
		CartProvider,
		HubUserProvider,
		Api,
		Rpc,
		HttpClientExt
	]
})
export class AppModule { }
