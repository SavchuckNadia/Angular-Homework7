export interface IBlogRequest {
    title: string;
    text: string;
    date: Date;
    author: string;
}
export interface IBlogResponse {
    id: number
    title: string;
    text: string;
    date: Date;
    author: string;
    imagePath:'https://www.askcga.com/wp-content/uploads/2020/09/Untitled-design-7.png'
}