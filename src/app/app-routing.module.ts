import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
    // loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tabs',
    // loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'dictionary-inner',
    loadChildren: () => import('./dictionary-inner/dictionary-inner.module').then( m => m.DictionaryInnerPageModule)
  },
  {
    path: 'header-more',
    loadChildren: () => import('./header-more/header-more.module').then( m => m.HeaderMorePageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'media-view',
    loadChildren: () => import('./media-view/media-view.module').then( m => m.MediaViewPageModule)
  },
  {
    path: 'payment-modal',
    loadChildren: () => import('./payment-modal/payment-modal.module').then( m => m.PaymentModalPageModule)
  },
  {
    path: 'intro-gif',
    loadChildren: () => import('./intro-gif/intro-gif.module').then( m => m.IntroGifPageModule)
  },
  {
    path: 'otp',
    loadChildren: () => import('./otp/otp.module').then( m => m.OtpPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
