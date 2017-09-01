import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {environment} from "../environments/environment";
import {ResultVO} from "./domain/result.vo";
import {REST} from "./constant";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppService {
  private SERVER: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.SERVER = `${environment.HOST}:${environment.PORT}`;
    this.headers = new Headers({
      'Content-Type': 'application/json'
    });
  }

  addTodo(params: any): Promise<ResultVO> {
    return this.http.post(this.SERVER + REST.todo, JSON.stringify(params), {headers: this.headers})
      .toPromise().then(this.extractData).catch(this.handleError);
  }

  updateTodo(params: any): Promise<ResultVO> {
    return this.http.put(this.SERVER + REST.todo, JSON.stringify(params), {headers: this.headers})
      .toPromise().then(this.extractData).catch(this.handleError);
  }

  deleteTodo(params: any): Promise<ResultVO> {
    return this.http.delete(this.SERVER + REST.todo + "?todo_id=" + params.todo_id)
      .toPromise().then(this.extractData).catch(this.handleError);
  }

  getTodoList(): Promise<any> {
    return this.http.get(this.SERVER + REST.todo)
      .toPromise().then(this.extractData).catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    // console.log('handleError--------------------');
    // console.error(errMsg);
    return Promise.reject(errMsg);
  }
}
