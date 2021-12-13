import { environment } from './../../environments/environment';
import { MenuEntities, SubMenuEntities } from '../Model/Menu/Entities/MenuEntities.model';
import { MenuResponse } from '../Model/Menu/Response/MenuResponse.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//Entities
import { LoginRequest } from '../Model/User/Request/LoginRequest.model';
import { LoginResponse } from '../Model/User/Response/LoginResponse.model';
import { ResponseEntities } from '../Model/ResponseEntities.model';
import { BehaviorSubject } from 'rxjs';
import { UserEntities } from '../Model/User/Entities/UserEntities.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public _TokenBehaviorSubject = new BehaviorSubject('');
  public _MenuBehaviorSubject = new BehaviorSubject('');


  constructor(private _HttpClient: HttpClient) {

  }

  public Login(Request: LoginRequest): Promise<ResponseEntities<LoginResponse>> {

    return this._HttpClient.post<any>(`${environment.apiIdentity}Login`, Request)
      .toPromise()
      .then(data => <ResponseEntities<LoginResponse>>data)
      .then(data => { return data; })
      .catch(error => { return error; });

  }

  public SetToken(Token: string): void {

    localStorage.setItem(environment.tokenKey, Token);
    this._TokenBehaviorSubject.next(Token);

  }

  public RemoveToken(): void {

    localStorage.removeItem(environment.tokenKey);
    this._TokenBehaviorSubject.next('');

  }

  private Menu(): Promise<ResponseEntities<MenuResponse[]>> {

    return this._HttpClient.post<any>(`${environment.apiIdentity}GetMenu`, '')
      .toPromise()
      .then(data => <ResponseEntities<MenuResponse[]>>data)
      .then(data => { return data; })
      .catch(error => { return error; });

  }

  private SetMenu(Menu: MenuResponse[]): MenuEntities[] {

    //Lista de menu a retornar
    let _MenuResult: MenuEntities[] = [];

    //Lista Menu Padres
    let _FatherList: MenuResponse[] = [];

    //Lista Menu Hijos
    let _ChildrenList: MenuResponse[] = [];

    //Obteniendo los menus padres
    _FatherList = Menu.filter(x => x.menuFatherId === null);

    _FatherList.forEach(Father => {

      let _NewMenu: MenuEntities = {};

      if (Father.menuUrl !== '#') { //si el padre no tiene hijos

        _NewMenu.label = Father.menuName;
        _NewMenu.routerLink = Father.menuUrl;
        _NewMenu.iconType = 'fi';
        _NewMenu.iconName = Father.menuIcon;

      } else { // si el padre tiene hijos

        _NewMenu.label = Father.menuName;
        _NewMenu.iconType = 'fi';
        _NewMenu.iconName = Father.menuIcon;
        _NewMenu.toggle = 'close';
        _NewMenu.submenu = [];
        //Obteniendo Hijos
        _ChildrenList = Menu.filter(x => x.menuFatherId === Father.menuId)

        _ChildrenList.forEach(Children => {

          let newSubMenu: SubMenuEntities = {}

          newSubMenu.label = Children.menuName;
          newSubMenu.routerLink = Children.menuUrl;
          newSubMenu.iconType = 'fi';
          newSubMenu.iconName = Children.menuIcon;

          _NewMenu.submenu.push(newSubMenu);

        });


      }

      _MenuResult.push(_NewMenu);


    });

    return _MenuResult;

  }

  public GetMenu(): Promise<MenuEntities[]> {


    return new Promise((resolve, reject) => {

      let Response: MenuEntities[] = [];

      try {

        if (localStorage.getItem(environment.menuKey) === null) {

          this.Menu().then(_Response => {

            if (_Response.statusCode == "00") {

              Response = this.SetMenu(_Response.result);

              localStorage.setItem(environment.menuKey, JSON.stringify(Response));
              this._MenuBehaviorSubject.next(JSON.stringify(Response));

            }

            return resolve(Response);

          }).catch(_log => {

            return reject(_log);

          });

        } else {


          Response = <MenuEntities[]>JSON.parse(localStorage.getItem(environment.menuKey));

          return resolve(Response);

        }


      } catch (error) {
        return reject(error);
      }

    });

  }

  public RemoveMenu(): void {

    localStorage.removeItem(environment.menuKey);
    this._MenuBehaviorSubject.next('');

  }

  public GetUser(): Promise<ResponseEntities<UserEntities>> {

    return this._HttpClient.post<any>(`${environment.apiIdentity}GetUser`, '')
      .toPromise()
      .then(data => <ResponseEntities<UserEntities>>data)
      .then(data => { return data; })
      .catch(error => { return error; });

  }

}
