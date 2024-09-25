import { Routes } from '@angular/router';
import { DashboardComponentB } from './dashboard-b/dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IconsComponent } from './icons/icons.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { TableListComponentA } from './table-list-a/table-list.component';
import { TableListComponentB } from './table-list-b/table-list.component';
import { TradeSettlementComponent } from './trade-settlement/trade-settlement.component';
import { TypographyComponent } from './typography/typography.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'dashboard-b', component: DashboardComponentB },
      { path: 'user-profile', component: UserProfileComponent },
      { path: 'table-list-a', component: TableListComponentA },
      { path: 'table-list-b', component: TableListComponentB },
      { path: 'trade-settle', loadComponent: () => import('./trade-settlement/trade-settlement.component').then(c => c.TradeSettlementComponent) },
      { path: 'manage-trades', loadComponent: () => import('./components/manage-trades/manage-trades.component').then(c => c.ManageTradesComponent) },
      { path: 'trade-settle/:id', component: TradeSettlementComponent },
      { path: 'typography', component: TypographyComponent },
      { path: 'icons', component: IconsComponent },
      { path: 'maps', component: MapsComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'upgrade', component: UpgradeComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' } // Wildcard route at the end
    ]
  }
];
