export interface MenuEntities {

    label?: string;
    details?: string;
    routerLink?: string;
    toggle?: string;
    iconType?: string;
    iconName?: string;
    submenu?: SubMenuEntities[]

}


export interface SubMenuEntities {

    label?: string;
    routerLink?: string;
    iconType?: string;
    iconName?: string;
}