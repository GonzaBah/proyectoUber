
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'principal',
    redirectTo: 'pagina-principal',
    pathMatch: 'full'
  },
  {
    path: 'pagina-principal',
    loadChildren: () => import('./pages/pagina-principal/pagina-principal.module').then( m => m.PaginaPrincipalPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./pages/configuracion/configuracion.module').then( m => m.ConfiguracionPageModule)
  },
  {
    path: 'editar-cuenta',
    loadChildren: () => import('./pages/editar-cuenta/editar-cuenta.module').then( m => m.EditarCuentaPageModule)
  },
  {
    path: 'ser-afiliado',
    loadChildren: () => import('./pages/ser-afiliado/ser-afiliado.module').then( m => m.SerAfiliadoPageModule)
  },
  {
    path: 'registrarse',
    loadChildren: () => import('./pages/registrarse/registrarse.module').then( m => m.RegistrarsePageModule)
  },
  {
    path: 'reg-vehiculo',
    loadChildren: () => import('./pages/reg-vehiculo/reg-vehiculo.module').then( m => m.RegVehiculoPageModule)
  },
  {
    path: 'reservar',
    loadChildren: () => import('./pages/reservar/reservar.module').then( m => m.ReservarPageModule)
  },
  {
    path: 'reservar2',
    loadChildren: () => import('./pages/reservar2/reservar2.module').then( m => m.Reservar2PageModule)
  },
  {
    path: 'billetera',
    loadChildren: () => import('./pages/billetera/billetera.module').then( m => m.BilleteraPageModule)
  },
  {
    path: 'historial',
    loadChildren: () => import('./pages/historial/historial.module').then( m => m.HistorialPageModule)
  },
  {
    path: 'viajes',
    loadChildren: () => import('./pages/viajes/viajes.module').then( m => m.ViajesPageModule)
  },
  {
    path: 'agreg-direccion',
    loadChildren: () => import('./pages/agreg-direccion/agreg-direccion.module').then( m => m.AgregDireccionPageModule)
  },

  {
    path: 'asientos',
    loadChildren: () => import('./pages/asientos/asientos.module').then( m => m.AsientosPageModule)
  },
  {
    path: 'historial-pagos',
    loadChildren: () => import('./pages/historial-pagos/historial-pagos.module').then( m => m.HistorialPagosPageModule)
  },
  {
    path: 'vehiculo',
    loadChildren: () => import('./pages/vehiculo/vehiculo.module').then( m => m.VehiculoPageModule)
  },
  {
    path: 'api-rutas',
    loadChildren: () => import('./pages/api-rutas/api-rutas.module').then( m => m.ApiRutasPageModule)
  },
  {
    path: 'gugolmapo',
    loadChildren: () => import('./pages/gugolmapo/gugolmapo.module').then( m => m.GugolmapoPageModule)
  },
  {
    path: 'mapaqliao',
    loadChildren: () => import('./pages/mapaqliao/mapaqliao.module').then( m => m.MapaqliaoPageModule)
  },
  {
    path: 'mapaqliao2',
    loadChildren: () => import('./pages/mapaqliao2/mapaqliao2.module').then( m => m.Mapaqliao2PageModule)
  },
  {
    path: 'mapaqliao3',
    loadChildren: () => import('./pages/mapaqliao3/mapaqliao3.module').then( m => m.Mapaqliao3PageModule)
  },
  {
    path: 'rutas',
    loadChildren: () => import('./pages/rutas/rutas.module').then( m => m.RutasPageModule)
  },  {
    path: 'api-rutas2',
    loadChildren: () => import('./pages/api-rutas2/api-rutas2.module').then( m => m.ApiRutas2PageModule)
  },










];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
