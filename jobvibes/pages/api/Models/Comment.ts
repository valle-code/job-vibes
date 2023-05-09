import IComment from "./IComment";

class CommentData implements IComment {
    comment: string;
    user: string;
    role: number;
    creationDate: Date;

    constructor(comment: string, user: string, role: number, creationDate: Date) {
        this.comment = comment;
        this.user = user;
        this.role = role;
        this.creationDate = creationDate;
    }
}

export default CommentData;