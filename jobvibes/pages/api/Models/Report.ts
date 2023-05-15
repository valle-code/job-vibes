import IReport from "./IReport";

class Report implements IReport {
   id: number;
    idPost: number;
    title: string;
    description: string;
    thumbnail: string;
    creationDate: Date;


    constructor(id: number, idPost: number, title: string, description: string, thumbnail: string, creationDate: Date) {
        this.id = id;
        this.idPost = idPost;
        this.title = title;
        this.description = description;
        this.thumbnail = thumbnail;
        this.creationDate = creationDate;
    }
}

export default Report;