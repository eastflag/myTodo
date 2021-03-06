import {Injectable} from "@angular/core";
import {Http, Headers, Response, RequestOptions} from "@angular/http";
import {environment} from "../../environments/environment";
import {NewsVO} from "../domain/news.vo";

@Injectable()
export class AdminService {
  private SERVER: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.SERVER = `${environment.HOST}`;
    this.headers = new Headers({
      'Content-Type': 'application/json'
    });
  }

  // 뉴스 관리 ---------------------------------------------------------------------------------------------------------
  findNews(params: any): Promise<any> {
    return this.http.post(this.SERVER + '/api/newsList', JSON.stringify(params), {headers: this.headers})
      .toPromise().then(this.extractData).catch(this.handleError);
  }

  findOneNews(params: any): Promise<NewsVO> {
    return this.http.get(this.SERVER + '/api/news?news_id=' + params)
      .toPromise().then(this.extractData).catch(this.handleError);
  }

  addNews(params: any): Promise<any> {
    return this.http.post(this.SERVER + '/api/news', JSON.stringify(params), {headers: this.headers})
      .toPromise().then(this.extractData).catch(this.handleError);
  }

  modifyNews(params: any): Promise<any> {
    return this.http.put(this.SERVER + '/api/news', JSON.stringify(params), {headers: this.headers})
      .toPromise().then(this.extractData).catch(this.handleError);
  }

  removeNews(params: any): Promise<any> {
    return this.http.delete(this.SERVER + '/api/news?news_id=' + params)
      .toPromise().then(this.extractData).catch(this.handleError);
  }

  imageUpload(formData: FormData): Promise<any> {
    let headers = new Headers();
    // headers.append('Content-Type', 'multipart/form-data'); //브라우저가 자동 생성함.
    // headers.append("Authorization", "Bearer " + sessionStorage.getItem("admin_token"));
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });

    return this.http.post('http://www.javabrain.kr:8080/api/imageUpload', formData, options)
      .toPromise().then(this.extractData).catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
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
