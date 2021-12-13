import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pg-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BreadcrumbComponent implements OnInit {
  public titleFather = 'HOME';
  public titleChild = 'DASHBOARD';
  public titleSub: Subscription;

  constructor(
    private router: Router
  ) {

    var reg = /(\?.*)?/g
    const url = router.url.replace(reg, "").split('/');
    this.titleFather = url[1];
    this.titleChild = url[2];
    this.titleSub = this.getDataRuta()
      .subscribe((data: any) => {
        this.titleChild = data.titulo;
        document.title = `SOP - ${data.titulo}`;
        if (data.father !== null && data.father !== undefined && data.father !== this.titleFather) {
          this.titleFather = data.father;

        }
      });

  }
  ngOnDestroy(): void {
    this.titleSub.unsubscribe();
  }

  ngOnInit() { }

  getDataRuta() {
    return this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: any) => {
          let father = event.snapshot._routerState.url;
          event.snapshot.data.father = father.split('/')[1];
          return event.snapshot.data;
        })
      );
  }
}

