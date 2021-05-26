import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateCacheModule, TranslateCacheSettings, TranslateCacheService } from 'ngx-translate-cache';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoaderFactory,
        deps: [HttpClient]
      }
    }),
    TranslateCacheModule.forRoot({
      cacheService: {
        provide: TranslateCacheService,
        useFactory: translateCacheFactory,
        deps: [TranslateService, TranslateCacheSettings]
      },
      cacheMechanism: 'Cookie'
    })
  ],
  exports: [TranslateModule]
})

export class I18nModule {
  constructor(
    translate: TranslateService,
    translateCacheService: TranslateCacheService
    ) {
      translateCacheService.init();
      translate.addLangs(['nl', 'fr']);
      const browserLang = translateCacheService.getCachedLanguage() || translate.getBrowserLang();
      translate.use(browserLang.match(/nl|fr/) ? browserLang : 'nl');
      console.log(translate.currentLang);
  }
  // get GetLanguage(){
  //   translate: TranslateService;
  //   translateCacheService: TranslateCacheService;
  //   const browserLang = translateCacheService.getCachedLanguage() || translate.getBrowserLang()
  //   return this.browserLang;
  // }
 }

 export function translateLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

export function translateCacheFactory(
  translateService: TranslateService,
  translateCacheSettings: TranslateCacheSettings
) {
  return new TranslateCacheService(translateService, translateCacheSettings);
}
