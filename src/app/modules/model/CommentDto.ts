export class CommentDto {
    constructor(
        public id: number,
        public userId: number,
        public comment: string,
        public createdDate: Date) { }
}