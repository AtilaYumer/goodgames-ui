export class CommentDto {
    constructor(
        public id: number,
        public userId: number,
        public username: string,
        public comment: string,
        public createdDate: Date) { }
}