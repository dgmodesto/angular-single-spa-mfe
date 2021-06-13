import { Component } from '@angular/core';

@Component({
  selector: 'app-empty-route',
  template: `
  <div class="container vh-100 d-flex justify-content-center align-items-center">
    <div class="row">
        <div class="col-md-12">
            <div class="error-template">
                <h1>
                    Oops!</h1>
                <h2>
                    404 Not Found</h2>
                <div class="error-details">
                    Desculpe, mas essa página não foi encontrada!
                </div>
                
            </div>
        </div>
    </div>
</div>

  `,
})
export class EmptyRouteComponent {}
