import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentTabPage } from './parent-tab.page';

const routes: Routes = [
    {
        path: '',
        component: ParentTabPage,
        children: [
            {
                path: 'routmap',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../rout-map/rout-map.module').then(m => m.RoutMapPageModule)
                    }
                ]
            },
            {
                path: 'studentlivetrack',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../student-livetrack/student-livetrack.module').then(m => m.StudentLivetrackPageModule)
                    }
                ]
            },{
                path:'Alerts',
                loadChildren: ()=> import('../../alerts-tab/alerts-tab.module').then(m=>m.AlertsTabPageModule)
                
            },
            {
                path: 'studentoverview',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../student-overview/student-overview.module').then(m => m.StudentOverviewPageModule)
                    }
                ]
            },
            {
                path: 'about',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../about/about.module').then(m=>{
                            m.AboutPageModule
                        })
                    }
                ]
            },
            {
                path: 'parent-tab',
                redirectTo: '/parent-tab/routmap',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: 'parent-tab',
        redirectTo: '/parent-tab/routmap',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class ParentTabPageRoutingModule { }
