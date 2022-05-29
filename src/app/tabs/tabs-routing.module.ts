import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
            // loadChildren: () => import('../listening/listening.module').then(m => m.ListeningPageModule)
          },
          {
            path: 'home-aspects',
            loadChildren: () => import('../home-aspects/home-aspects.module').then( m => m.HomeAspectsPageModule)
          },
          {
            path: 'listening',
            loadChildren: () => import('../listening/listening.module').then(m => m.ListeningPageModule)
          },
          {
            path: 'listening-inner',
            loadChildren: () => import('../listening-inner/listening-inner.module').then( m => m.ListeningInnerPageModule)
          },
          {
            path: 'speaking',
            loadChildren: () => import('../speaking/speaking.module').then( m => m.SpeakingPageModule)
          },
          {
            path: 'speaking-inner',
            loadChildren: () => import('../speaking-inner/speaking-inner.module').then( m => m.SpeakingInnerPageModule)
          },
          {
            path: 'vocabulary',
            loadChildren: () => import('../vocabulary/vocabulary.module').then( m => m.VocabularyPageModule)
          },
          {
            path: 'vocabulary-inner',
            loadChildren: () => import('../vocabulary-inner/vocabulary-inner.module').then( m => m.VocabularyInnerPageModule)
          },
          {
            path: 'reading',
            loadChildren: () => import('../reading/reading.module').then( m => m.ReadingPageModule)
          },
          {
            path: 'reading-inner',
            loadChildren: () => import('../reading-inner/reading-inner.module').then( m => m.ReadingInnerPageModule)
          },
          {
            path: 'reading-level1',
            loadChildren: () => import('../reading-level1/reading-level1.module').then( m => m.ReadingLevel1PageModule)
          },
          {
            path: 'reading-level1-inner',
            loadChildren: () => import('../reading-level1-inner/reading-level1-inner.module').then( m => m.ReadingLevel1InnerPageModule)
          },
          {
            path: 'reading-level2',
            loadChildren: () => import('../reading-level2/reading-level2.module').then( m => m.ReadingLevel2PageModule)
          },
          {
            path: 'reading-level3',
            loadChildren: () => import('../reading-level3/reading-level3.module').then( m => m.ReadingLevel3PageModule)
          },
          {
            path: 'reading-level4',
            loadChildren: () => import('../reading-level4/reading-level4.module').then( m => m.ReadingLevel4PageModule)
          },
          {
            path: 'reading-level5',
            loadChildren: () => import('../reading-level5/reading-level5.module').then( m => m.ReadingLevel5PageModule)
          },
          {
            path: 'reading-level6',
            loadChildren: () => import('../reading-level6/reading-level6.module').then( m => m.ReadingLevel6PageModule)
          },
          {
            path: 'reading-level6-inner',
            loadChildren: () => import('../reading-level6-inner/reading-level6-inner.module').then( m => m.ReadingLevel6InnerPageModule)
          },
          {
            path: 'grammar',
            loadChildren: () => import('../grammar/grammar.module').then( m => m.GrammarPageModule)
          },
          {
            path: 'grammar-inner',
            loadChildren: () => import('../grammar-inner/grammar-inner.module').then( m => m.GrammarInnerPageModule)
          },
          {
            path: 'dictionary',
            loadChildren: () => import('../dictionary/dictionary.module').then( m => m.DictionaryPageModule)
          },
          {
            path: 'writing',
            loadChildren: () => import('../writing/writing.module').then( m => m.WritingPageModule)
          },
          {
            path: 'writing-inner',
            loadChildren: () => import('../writing-inner/writing-inner.module').then( m => m.WritingInnerPageModule)
          },
          {
            path: 'comprehension',
            loadChildren: () => import('../comprehension/comprehension.module').then( m => m.ComprehensionPageModule)
          },
          {
            path: 'comprehension-inner',
            loadChildren: () => import('../comprehension-inner/comprehension-inner.module').then( m => m.ComprehensionInnerPageModule)
          },
          {
            path: 'conversation',
            loadChildren: () => import('../conversation/conversation.module').then( m => m.ConversationPageModule)
          },
          {
            path: 'conversation-inner',
            loadChildren: () => import('../conversation-inner/conversation-inner.module').then( m => m.ConversationInnerPageModule)
          },
          {
            path: 'conversation-inner2',
            loadChildren: () => import('../conversation-inner2/conversation-inner2.module').then( m => m.ConversationInner2PageModule)
          },
          {
            path: 'conversation-inner3',
            loadChildren: () => import('../conversation-inner3/conversation-inner3.module').then( m => m.ConversationInner3PageModule)
          },
          {
            path: 'fun-corner',
            loadChildren: () => import('../fun-corner/fun-corner.module').then( m => m.FunCornerPageModule)
          },
          {
            path: 'fun-corner-inner',
            loadChildren: () => import('../fun-corner-inner/fun-corner-inner.module').then( m => m.FunCornerInnerPageModule)
          },
          {
            path: 'testimonials-inner',
            loadChildren: () => import('../testimonials-inner/testimonials-inner.module').then( m => m.TestimonialsInnerPageModule)
          },
          {
            path: 'games',
            loadChildren: () => import('../games/games.module').then( m => m.GamesPageModule)
          },
          {
            path: 'games-inner',
            loadChildren: () => import('../games-inner/games-inner.module').then( m => m.GamesInnerPageModule)
          },
          {
            path: 'game1',
            loadChildren: () => import('../game1/game1.module').then( m => m.Game1PageModule)
          },
          {
            path: 'game2',
            loadChildren: () => import('../game2/game2.module').then( m => m.Game2PageModule)
          },
          {
            path: 'game3',
            loadChildren: () => import('../game3/game3.module').then( m => m.Game3PageModule)
          },
          {
            path: 'game4',
            loadChildren: () => import('../game4/game4.module').then( m => m.Game4PageModule)
          },
          {
            path: 'worksheet',
            loadChildren: () => import('../worksheet/worksheet.module').then( m => m.WorksheetPageModule)
          },
          {
            path: 'worksheet1',
            loadChildren: () => import('../worksheet1/worksheet1.module').then( m => m.Worksheet1PageModule)
          },
          {
            path: 'worksheet2',
            loadChildren: () => import('../worksheet2/worksheet2.module').then( m => m.Worksheet2PageModule)
          },
          {
            path: 'worksheet3',
            loadChildren: () => import('../worksheet3/worksheet3.module').then( m => m.Worksheet3PageModule)
          },
          {
            path: 'worksheet4',
            loadChildren: () => import('../worksheet4/worksheet4.module').then( m => m.Worksheet4PageModule)
          },
          {
            path: 'notification',
            loadChildren: () => import('../notification/notification.module').then( m => m.NotificationPageModule)
          },
          {
            path: 'contact-book',
            loadChildren: () => import('../contact-book/contact-book.module').then( m => m.ContactBookPageModule)
          },
          {
            path: 'faq',
            loadChildren: () => import('../faq/faq.module').then( m => m.FaqPageModule)
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
          },
          {
            path: 'alarm-inner',
            loadChildren: () => import('../alarm-inner/alarm-inner.module').then( m => m.AlarmInnerPageModule)
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
          }
        ]
      },
      {
        path: 'tab4',
        children: [
          {
            path: '',
            loadChildren: () => import('../tab4/tab4.module').then( m => m.Tab4PageModule)
          },
          {
            path: 'payment-history',
            loadChildren: () => import('../payment-history/payment-history.module').then( m => m.PaymentHistoryPageModule)
          },
          {
            path: 'change-password',
            loadChildren: () => import('../change-password/change-password.module').then( m => m.ChangePasswordPageModule)
          },
          {
            path: 'testimonials-add',
            loadChildren: () => import('../testimonials-add/testimonials-add.module').then( m => m.TestimonialsAddPageModule)
          }
        ]
      },
      {
        path: 'tab5',
        loadChildren: () => import('../tab5/tab5.module').then( m => m.Tab5PageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
